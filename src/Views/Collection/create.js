import './create.scss'
import { Form, Input, message, Row, Button } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import CreateColModal from 'Components/CreateColModal';
import { createERC721Collection, setCollectionInfo } from 'Store/actions';
// import { createERC721Collection, setCollectionInfo, createERC1155Collection } from 'Store/actions';
import { uploadFileToIpfs } from 'Utils/ipfs'
import { useParams, useHistory } from 'react-router-dom';
import { getDB } from 'Utils/orbit'

export default function CreateCollection() {

    const { TextArea } = Input;

    const [files, setFiles] = useState([]);
    const [isDeploying, setIsDeploying] = useState(false);
    const { walletAddress, creativeStudio, orbitdb, chainId, collectionInfo, colError } = useSelector(
        (state) => state
    );
    const [colArr, setColArr] = useState([]); // 接收collectionInfo
    const { standard } = useParams()
    const router = useHistory()
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    useEffect(() => {
        setColArr(collectionInfo)
    }, [collectionInfo])
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

    const handleClean = useCallback(async () => {
        setFiles([]);
        form.resetFields();
    }, [form]);

    useEffect(() => {
        if (colError === '1') {
            handleClean();
        }
    }, [colError, handleClean])

    const onFinish = async (values) => {
        console.log(values);
        setIsDeploying(true);
        let image
        // console.log(attributes);
        if (files.length > 0) {
            // only upload max size 2 MB
            if (files[0].size <= 2048000) {
                // logo上传到IPFS
                let formData = new FormData();
                formData.append('file', files[0]);
                const ipfsHash = await uploadFileToIpfs(formData);
                image = 'https://gateway.pinata.cloud/ipfs/' + ipfsHash;
                // reset form and file
            } else message.warn('Logo最大为2MB');
        }
        // todo 判断标准创建对应的作品集
        console.log(standard)
        // 创建721作品集
        await dispatch(createERC721Collection(values))
            .then(async (res) => {
                if (!res.status) return
                // 调用合约获取当前地址下的作品集
                let collections = await creativeStudio.methods.getCollectionsByUser(walletAddress).call();
                const col = collections[collections.length - 1]
                // 组装数据
                let collectionData = {
                    ...values,
                    logo: image || '',
                    id: col.id,
                    contractAddress: col.contractAddress,
                    isERC1155: col.isERC1155,
                    creator: col.creator,
                }
                colArr.push(collectionData)
                // 根据环境获取orbitdb库的地址
                const address = process.env.REACT_APP_ORBIT_DB;
                // 获取数据库信息[address:数据库地址;orbitdb：orbitdb初始化信息]
                const db = await getDB(address, orbitdb)
                if (db) {
                    await db.set(`${walletAddress}_${chainId}`, colArr)
                    await db.set(`${col.contractAddress}_${chainId}`, collectionData)
                    dispatch(setCollectionInfo(colArr))
                }
                router.push(`/collection/index/${walletAddress}`)
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleOk = async () => {
        form.submit();
    };

    return (
        <>
            <div className="create-collection">
                <div>
                    <CreateColModal visible={isDeploying} handleOk={handleOk} setIsDeploying={setIsDeploying} />
                    <div>
                        <h2 className='create-collection-title'>创建作品集</h2>
                        <div className="create-collection-upload-image">
                            <div className='create-collection-area-upload'>
                                <div>
                                    <div className='create-collection-dropzone'>
                                        {/* <input {...getInputProps()} /> */}
                                        {!!files[0] ? (
                                            <div className='preview'>
                                                <img
                                                    className="collection-img"
                                                    src={files[0].preview}
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
                            <div className="create-collection-upload-desc">
                                <div className="create-collection-upLoad-title">上传LOGO</div>
                                <div>
                                    <div>支持JPG, PNG, GIF</div>
                                    <div>*推荐尺寸400*400，不超过2M</div>
                                </div>
                                <div {...getRootProps({ className: 'create-collection-dropzone' })}>
                                    <input {...getInputProps()} />
                                    <div className="create-collection-upLoad-btn">
                                        上传
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='create-collection-input-area'>
                                <Form onFinish={onFinish} form={form} colon={false}>
                                    <Form.Item
                                        label={<div className='create-collection-input-name'>作品集名称</div>}
                                        name='name'
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入作品集名称!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            className='create-collection-input-value'
                                            placeholder='请输入作品集名称'
                                            size='large'
                                            autoComplete='off'
                                            maxLength="50"
                                        />
                                    </Form.Item>
                                    <div className="mt25"></div>
                                    <Form.Item
                                        label={<div className='create-collection-input-name'>作品集代码</div>}
                                        name='symbol'
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入作品集代码!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            className='create-collection-input-value'
                                            placeholder='请输入作品集代码'
                                            size='large'
                                            autoComplete='off'
                                            maxLength="50"
                                        />
                                    </Form.Item>
                                    <div className="mt25"></div>
                                    <Form.Item className='description' name='description' label={<div className='create-collection-input-name mr11'>简介</div>}>
                                        <TextArea
                                            className='create-collection-input-value'
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
                                                shape='round'
                                                size='large'
                                                onClick={() => handleOk()}
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
