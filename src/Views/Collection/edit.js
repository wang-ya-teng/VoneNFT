import './edit.scss'

import { Form, Input, message, Row, Button } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFileToIpfs } from 'Utils/ipfs'
import LoadingModal from 'Components/LoadingModal';
import { useDispatch, useSelector } from 'react-redux';
import { getDB } from 'Utils/orbit'
import { setCollectionInfo } from 'Store/actions';
import { useParams, useHistory } from 'react-router-dom';

export default function EditCollection() {
    const { TextArea } = Input;
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [collectionDetail, setCollectionDetail] = useState(null);
    const [colArr, setColArr] = useState([]);
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const router = useHistory()
    const {collectionAddress} = useParams()
    const { walletAddress, orbitdb, chainId, collectionObj, collectionInfo } = useSelector(
        (state) => state
    );
    const formRef = useRef()
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles)
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });
    // todo取出当前作品集信息
    useEffect(()=>{
        formRef.current.setFieldsValue({
            description:collectionObj[collectionAddress]?.description
        })
        setCollectionDetail(collectionObj[collectionAddress])
    },[collectionObj,collectionAddress])
    useEffect(()=>{
        setColArr(collectionInfo)
    },[collectionInfo])
    const onFinish = async (values) => {
        collectionDetail.description = values.description;
        let logo
        // console.log(attributes);
        if (files.length > 0) {
            // only upload max size 2 MB
            if (files[0].size <= 2048000) {
                // upload image
                setIsLoading(true);
                let formData = new FormData();
                formData.append('file', files[0]);
                const ipfsHash = await uploadFileToIpfs(formData);
                logo = 'https://gateway.pinata.cloud/ipfs/' + ipfsHash;
                setIsLoading(false);
                console.log(logo);

                // reset form and file
                setFiles([]);
                form.resetFields();
            } else message.warn('Logo最大为2MB');
        };
        if (logo) {
            collectionDetail.logo = logo 
        }
        colArr.forEach(item=>{
            if(item.collectionAddress === collectionAddress) {
                item.logo = collectionDetail.logo
                item.description = collectionDetail.description
            }
        })
        // // 根据环境获取orbitdb库的地址
        const address = process.env.REACT_APP_ORBIT_DB;
        // 获取数据库信息[address:数据库地址;orbitdb：orbitdb初始化信息]
        const db = await getDB(address, orbitdb)
        if (db) {
            await db.set(`${walletAddress}_${chainId}`, colArr)
            await db.set(`${collectionAddress}_${chainId}`, collectionDetail)
            dispatch(setCollectionInfo(colArr))
        }
        router.goBack()
    };

    return (
        <>
            <div className="edit-collection">
                <div>
                    {isLoading ? <LoadingModal title={'Upload Image'} visible={true} /> : <></>}
                    <div>
                        <h2 className='edit-collection-title'>编辑作品集</h2>
                        <div className="edit-collection-upload-image">
                            <div className='edit-collection-area-upload'>
                                <div>
                                    <div {...getRootProps({ className: 'edit-collection-dropzone' })}>
                                        <input {...getInputProps()} />
                                        {!!(files[0] || collectionDetail?.logo) ? (
                                            <div className='preview'>
                                                <img
                                                    src={files[0]?.preview || collectionDetail?.logo}
                                                    alt='priview'
                                                    style={{ width: '90%', maxWidth:'208px', height: '208px', objectFit: 'contain' }}
                                                />
                                            </div>
                                        ) : (
                                            <p className='textmode' style={{ textAlign: 'center' }}>
                                                {'上传LOGO'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="edit-collection-upload-desc">
                                <div className="edit-collection-upLoad-title">修改LOGO</div>
                                <div>
                                    <div>支持JPG, PNG, GIF</div>
                                    <div>*推荐尺寸400*400，不超过2M</div>
                                </div>
                                <div {...getRootProps({ className: 'edit-collection-dropzone' })}>
                                    <input {...getInputProps()} />
                                    <div className="edit-collection-upLoad-btn">
                                        修改
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='edit-collection-input-area'>
                                <Form onFinish={onFinish} form={form} colon={false} ref={formRef}>
                                    <Form.Item
                                        label={<div className='edit-collection-input-name'>作品集名称*</div>}
                                        name='name'
                                    >
                                        <p className="edit-collection-input-value">{collectionDetail?.name}</p>
                                    </Form.Item>
                                    <div className="mt25"></div>
                                    <Form.Item
                                        label={<div className='edit-collection-input-name'>作品集代码*</div>}
                                        name='name'
                                    >
                                        <p className="edit-collection-input-value">{collectionDetail?.symbol}</p>
                                    </Form.Item>
                                    <div className="mt25"></div>
                                    <Form.Item className='description' name='description' label={<div className='edit-collection-input-name'>简介</div>}>
                                        <TextArea
                                            className='input-name-nft input-mode-bc content-description'
                                            autoSize={{ minRows: 2 }}
                                            placeholder='请输入简介'
                                            size='large'
                                            maxLength="500"
                                        />
                                    </Form.Item>
                                    <Form.Item style={{ marginTop: '40px' }}>
                                        <Row justify='center'>
                                            <Button
                                                className='btn-create-item'
                                                htmlType='submit'
                                                shape='round'
                                                size='large'
                                            >
                                                保存
                                            </Button>
                                        </Row>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
