import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Modal, message, Popover } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { createERC721Collection, setCollectionInfo } from 'Store/actions';
import ConnectWallet from 'Components/ConnectWallet';
import CreateColModal from 'Components/CreateColModal';
import { useDropzone } from 'react-dropzone';
import { uploadFileToIpfs } from 'Utils/ipfs'
import { getDB } from 'Utils/orbit'
import AddIcon from 'Assets/icons/addIcon.png'
import Logo from 'Assets/logo.png'

import '../index.scss';
import { Link } from 'react-router-dom';

const { TextArea } = Input;

const NFTinfo = ({ userCollection }) => {
  return (
    <>
      <div className='col-list'>
        <img src={userCollection.logo} alt='icon' style={{ width: '74px', height: '74px', borderRadius: '50%' }} />
        <strong className='textName pt15'>{userCollection.name}</strong>
        <span className='size14'>ERC-721</span>
      </div>
    </>
  );
};

export default function ERC721Collections({ collectionId, setCollectionId, setNftAddress }) {
  const { walletAddress, web3, creativeStudio, collectionInfo, orbitdb, chainId, colError } = useSelector(
    (state) => state);

  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [files, setFiles] = useState([]);
  const [colArr, setColArr] = useState([]);
  const [collectionData, setCollectionData] = useState([]);

  const content = (
    <div className="pop">
      <p>创建新作品集需要支付一笔链上费用。如果您没有自己的作品集，可以免费使用平台作品集。</p>
    </div>
  );

  const [form] = Form.useForm();

  const fetchDB = async (dbAddress, orbitdb) => {
    const db = await getDB(dbAddress, orbitdb)
    if (db) {
      let collectionInfo = await db.get(`${walletAddress}_${chainId}`)
      setCollectionData(collectionInfo)
    }
  }

  useEffect(() => {
    // 根据环境获取orbitdb库的地址
    const dbAddress = process.env.REACT_APP_ORBIT_DB;
    if (!!orbitdb) {
      fetchDB(dbAddress, orbitdb)
    }
  }, [orbitdb, walletAddress, chainId])// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setColArr(collectionInfo)
  }, [collectionInfo])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    let image
    if (files.length > 0) {
      if (files[0].size <= 2048000) {
        setIsDeploying(true);
        // upload image
        // logo上传到IPFS
        let formData = new FormData();
        formData.append('file', files[0]);
        const ipfsHash = await uploadFileToIpfs(formData);
        image = 'https://gateway.pinata.cloud/ipfs/' + ipfsHash;
      } else {
        message.warn('Logo最大为2MB');
        return;
      };
    }
    // todo 判断标准创建对应的作品集
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
        fetchDB(address, orbitdb);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCancel = useCallback(async () => {
    setIsModalVisible(false);
    setIsDeploying(false);
    setFiles([]);
    form.resetFields();
  }, [form]);

  useEffect(() => {
    if (colError === '1') {
      handleCancel();
    }
  }, [colError, handleCancel])

  const showModal = () => {
    setCollectionId(true);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    form.submit();
  };

  return (
    <>
      <CreateColModal visible={isDeploying} handleOk={handleOk} setIsDeploying={setIsDeploying} />
      <div className='choose'>
        <div className='box input-mode-bc create-erc721' onClick={showModal}>
          <img
            src={AddIcon}
            alt='icon'
            style={{
              width: '74px',
              height: '74px',
              padding: '6px'
            }}
          />
          <strong className='textName pt15'>创建新作品集</strong>
          <p className='textName'>ERC-721</p>
        </div>
        <div
          className={`${collectionId === -1 ? 'active' : ''} box input-mode-bc`}
          onClick={() => { setCollectionId(-1) }}
        >
          <img
            src={Logo}
            alt='icon'
            style={{ width: '74px', height: '74px' }}
          />
          <strong className='textName pt15'>Didi</strong>
          <p className='textName'>ERC-721</p>
          <div className="absolute">
            <Popover content={content} trigger="hover">
              <Button className="hiddenBtn">免费</Button>
            </Popover>
          </div>
        </div>
        {!!collectionData ? (
          collectionData.map((userCollection) =>
            userCollection.isERC1155 ? (
              <div key={userCollection.id}></div>
            ) : (
              <div
                key={userCollection.id}
                className={`${collectionId === userCollection.id ? 'active' : ''
                  } box input-mode-bc`}
                onClick={() => { setCollectionId(userCollection.id); setNftAddress(userCollection.contractAddress) }}
              >
                <Link
                  to={`/collection/detail/${userCollection.contractAddress}/${walletAddress}`}
                  className='button-edit-collection'
                >
                  <EditOutlined />
                </Link>
                <NFTinfo userCollection={userCollection} web3={web3} />
              </div>
            )
          )
        ) : (
          <></>
        )}
      </div>

      <Modal
        width={560}
        title={
          <p className='textmode' style={{ margin: 0 }}>
            创建作品集
          </p>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={
          walletAddress
            ? [
              <Button
                key='sell'
                type='primary'
                shape='round'
                size='large'
                className='btn-create-item'
                onClick={() => handleOk()}
              >
                创建作品集
              </Button>,
            ]
            : []
        }
      >
        {walletAddress ? (
          <Form onFinish={onSubmit} form={form} layout='vertical'>
            <div className='wrap-box-create-collection'>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className='wrap-columm-logo'>
                  <div className='drag-box dropzone-collection'>
                    {!!files[0] ? (
                      <div className='preview'>
                        <img
                          src={files[0].preview}
                          alt='priview'
                          style={{ width: '90%', maxWidth: '160px', height: '160px', objectFit: 'contain', marginLeft: '5%' }}
                        />
                      </div>
                    ) : (
                      <p className='textmode' style={{ textAlign: 'center', marginBottom: 0 }}>
                        {'请上传LOGO'}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <p>支持JPG, PNG, GIF</p>
                  <p>*推荐尺寸400*400，不超过2M</p>
                  <div {...getRootProps({ className: 'create-collection-dropzone' })}>
                    <input {...getInputProps()} />
                    <div className="create-collection-upLoad-btn">
                      上传
                    </div>
                  </div>
                </div>
              </div>
              <div className='wrap-box-input'>
                <div style={{ margin: '30px 0 8px 0' }}>作品集名称</div>
                <Form.Item
                  name='name'
                  rules={[
                    {
                      required: true,
                      message: '请输入作品集名称',
                    },
                  ]}
                >
                  <Input
                    className='input-name-nft input-mode-bc'
                    placeholder='请输入作品集名称'
                    size='large'
                  />
                </Form.Item>
                <div style={{ margin: '20px 0 8px 0' }}>作品集代码</div>
                <Form.Item
                  name='symbol'
                  rules={[
                    {
                      required: true,
                      message: '请输入作品集代码',
                    },
                  ]}
                >
                  <Input
                    className='input-name-nft input-mode-bc'
                    placeholder='请输入作品集代码'
                    size='large'
                  />
                </Form.Item>
                <div style={{ margin: '20px 0 8px 0' }}>简介</div>
                <Form.Item name='description'>
                  <TextArea
                    className='input-name-nft input-mode-bc content-description'
                    autoSize={{ minRows: 3 }}
                    placeholder='请输入简介'
                    size='large'
                    maxLength="500"
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        ) : (
          <div className='center'>
            <div onClick={() => handleCancel()}>
              <ConnectWallet />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
