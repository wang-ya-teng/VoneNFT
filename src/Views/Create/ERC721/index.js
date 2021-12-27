import { Form, Input, message, Row, Button, Switch, Space, Modal, InputNumber } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import CreateModal from 'Components/CreateModal';
import ERC721Collections from './collections';
import ConnectWallet from 'Components/ConnectWallet';
import { uploadIPFS } from '../UploadIpfs';
import { createSellOrder } from 'Store/actions';
import '../index.scss';
import { generateERC721NFT } from 'Store/actions';
import { Link } from 'react-router-dom';
import Add from 'Assets/icons/add.png'
import Delete from 'Assets/icons/delete.png'

const { TextArea } = Input;

export default function CreateERC721() {
  const { walletAddress, chainId, web3, mintError, approveError, sellError } = useSelector((state) => state);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [price, setPrice] = useState(false);
  const [tokenId, setTokenId] = useState('');
  const [first, setFirst] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [create, setCreate] = useState('0');//控制创建状态
  const [approve, setApprove] = useState('0');//控制授权状态
  const [selling, setSelling] = useState('0');//控制上架状态
  const [isLoading, setIsLoading] = useState(false);
  const [collectionId, setCollectionId] = useState(-1);// -1代表官方作品集的id，其它代表别的作品集
  const [nftAddress, setNftAddress] = useState('');
  const [btn, setBTN] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [pinataUri, setPinataUri] = useState("");
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const profile = useRef(null);
  const [receivedPrice, setReceivedPrice] = useState('');

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleClean = () => {
    // 清空 form file 和所有交易状态
    setIsLoading(false);
    setFirst(false);
    setCreate('0');
    setApprove('0');
    setSelling('0');
    setAttributes([]);
    setFiles([]);
    form.resetFields();
  }

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

  //属性
  const onFinishing = async (values) => {
    let attrs = [];
    if (values.addAttributes.length > 0) {
      for (let i = 0; i < values.addAttributes.length; i++) {
        let attr = {};
        attr.trait_type = await values.addAttributes[i].attrName;
        attr.value = await values.addAttributes[i].attrValue;
        attrs.push(attr);
      }
      setAttributes(attrs)
      setIsModalVisible(false);
    } else {
      // message.warn('属性不能为空')
      setAttributes([]);
      setIsModalVisible(false);
    }
  };
  //4001用户拒绝交易   4000用户确认交易    1交易成功
  //actions里面 交易的时候会根据用户的操作 来返回相应的code 再作处理
  useEffect(() => {
    if (mintError === '4001') {
      setCreate('2')
    } else if (mintError === '4000') {
      setCreate('1')
    } else if (mintError === '1') {
      setCreate('3')
      if (!inputOpen) {
        setIsLoading(false)
      }
    }
    if (approveError === '4001') {
      setApprove('2')
    } else if (approveError === '4000') {
      setApprove('1')
    } else if (approveError === '1') {
      setApprove('3')
      setSelling('1')
    }
    if (sellError === '4001') {
      setSelling('2');
    } else if (sellError === '4000') {
      setSelling('1');
    } else if (sellError === '1') {
      setSelling('0');
      setSelling('3');
    }
  }, [mintError, inputOpen, approveError, sellError]);

  //开始创建
  const onFinish = async (values) => {
    setPrice(values.price);
    let metaData = {};
    metaData.attributes = attributes;
    metaData.name = values.name;
    metaData.description = values.description;
    if (files.length > 0) {
      if (files[0].size <= 50000000) {
        // 上传图片
        setIsLoading(true);
        setUploading(true);
        let tokenUri;
        try {
          tokenUri = await uploadIPFS(metaData, files);
          setUploading(false);
        } catch (e) {
          message.error('上传失败，请重试！')
        }
        setPinataUri(tokenUri)
        setFirst(true)
        setCreate('1')

        // 铸造
        const result = await dispatch(generateERC721NFT(collectionId, tokenUri, nftAddress));
        if (!!result) {
          setTokenId(result.tokenId)
          //出售按钮为true 并且价格大于0
          if (!!inputOpen && parseFloat(values.price) > 0) {
            setApprove('1')
            const res = await dispatch(createSellOrder(
              nftAddress,
              result.tokenId,
              web3.utils.toWei(values.price.toString(), 'ether'),
              '0x0000000000000000000000000000000000000000',
              1))
            if (!!res.status) {
              // 如果成功了，  清空 form file 和所有交易状态
              setIsLoading(false);
              setFirst(false);
              setCreate('0');
              setApprove('0');
              setSelling('0');
              setAttributes([]);
              setFiles([]);
              form.resetFields();
            }
          }
        } else {
          return;
        }
      } else message.warn('上传物品最大为50MB');
    } else message.warn('您还没有上传物品图片！');
  };

  return (
    <div className='center create-pt'>
      <CreateModal visible={isLoading}
        uploading={uploading} create={create} setCreate={setCreate} setApprove={setApprove}
        first={first} pinataUri={pinataUri} handleClean={handleClean}
        collectionId={collectionId} inputOpen={inputOpen} nftAddress={nftAddress}
        approve={approve} selling={selling} price={price} tokenId={tokenId} setTokenId={setTokenId}
      />
      <div className='my-collection'>
        <h2 className='textmode'>创建物品</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className='area-upload'>
            <div className='drag-box-search'>
              <div className='drag-box dropzone'>
                {!!files[0] ? (
                  <div className='preview'>
                    <img
                      src={files[0].preview}
                      alt='priview'
                      style={{ width: '90%', maxWidth: '208px', height: '208px', objectFit: 'contain' }}
                    />
                  </div>
                ) : (
                  <p className='textmode' style={{ textAlign: 'center' }}>
                    {'请上传物品文件'}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <p className="textmodeH3">上传图片</p>
            <p>支持JPG, PNG, GIF *不超过50MB</p>
            <div {...getRootProps({ className: 'create-collection-dropzone' })}>
              <input {...getInputProps()} />
              <div className="create-collection-upLoad-btn">
                上传
              </div>
            </div>
          </div>
        </div>

        <Link to={`/profile/${chainId}/${walletAddress}`} ref={profile} />
        <div className='info-item'>
          <div className='input-area'>
            <Form onFinish={onFinish} form={form} colon={false}>
              <div style={{ display: 'flex' }}>
                <div className='textName' style={{ padding: '0.5rem 2.7rem 0 0.5rem' }}>名称</div>
                <Form.Item
                  // label={<div className='textName pr15'>名称</div>}
                  name='name'
                  rules={[
                    {
                      required: true,
                      message: '请输入物品名称!',
                    },
                  ]}
                >
                  <Input
                    className='input-name-nft input-mode-bc textName'
                    placeholder='请输入物品名称'
                    size='large'
                    maxLength="50"
                  />
                </Form.Item>
              </div>
              <div className="mt25"></div>
              <Form.Item className='description' name='description' label={<div className='textName pr25'>简介</div>}>
                <TextArea
                  className='input-name-nft input-mode-bc content-description'
                  autoSize={{ minRows: 3 }}
                  placeholder='请输入简介'
                  size='large'
                  maxLength="500"
                />
              </Form.Item>
              <div style={{ display: 'flex', width: '800px', margin: '40px 0 10px 0' }}>
                <div className='textName' style={{ width: '82px' }}>作品集</div>
                <ERC721Collections
                  collectionId={collectionId}
                  setCollectionId={setCollectionId}
                  setNftAddress={setNftAddress}
                />
              </div>
              <div className='textName attributes'>
                <div style={{ paddingLeft: '8px', marginRight: '42px' }}>属性</div>
                {!!attributes ? attributes.map((attr, index) =>
                  <div key={index}>
                    <div className="attri">
                      <div>{attr.trait_type}</div>
                      <div className="attrValue">{attr.value}</div>
                    </div>
                  </div>
                ) : null}
                <img
                  onClick={showModal}
                  src={Add}
                  alt='add'
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
              </div>

              <Modal footer="" centered className="attrModal" title="添加属性" visible={isModalVisible} onCancel={handleCancel}>
                <Form name="dynamic_form_nest_item" onFinish={onFinishing}>
                  <Form.List name="addAttributes" className="listAttributes">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.length >= 1 ? <div style={{ display: 'flex', justifyContent: 'start' }}>
                          <div style={{ width: '220px' }}>名称</div>
                          <div style={{ width: '210px' }}>属性</div>
                        </div> : null}
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                          <Space key={key} style={{ display: 'flex', alignItems: 'center', position: 'relative' }} align="baseline">
                            <Form.Item style={{ width: '210px' }}
                              {...restField}
                              name={[name, 'attrName']}
                              fieldKey={[fieldKey, 'attrName']}
                              rules={[{ required: true, message: '属性名不能为空' }]}
                            >
                              <Form.Item>
                                <Input maxLength={30} style={{ width: '210px', border: '1px solid #6080b4', borderRadius: '10px' }} />
                              </Form.Item>
                            </Form.Item>
                            <Form.Item
                              style={{ width: '210px' }}
                              {...restField}
                              name={[name, 'attrValue']}
                              fieldKey={[fieldKey, 'attrValue']}
                              rules={[{ required: true, message: '属性值不能为空' }]}
                            >
                              <Form.Item>
                                <Input maxLength={30} style={{ width: '210px', border: '1px solid #6080b4', borderRadius: '10px' }} />
                              </Form.Item>
                            </Form.Item>
                            <div onClick={() => remove(name)} >
                              <img
                                src={Delete}
                                alt='add'
                                style={{ width: '20px', height: '20px', cursor: 'pointer', position: 'absolute', right: 0, top: 6 }}
                              />
                            </div>
                          </Space>
                        ))}
                        <Form.Item style={{ marginTop: '20px' }}>
                          <Button className="addBTN" type="primary" onClick={() => add(setBTN(true))} >
                            新增
                          </Button>
                          <Button disabled={!btn} className="deleteBTN" type="primary" htmlType="submit">
                            保存
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form>
              </Modal>

              <Form.Item label={<div className='textName pr25'>出售</div>} valuePropName="checked">
                <div className="saleMode">
                  <div className="textName">创建后立即上架出售</div>
                  <Switch onChange={() => setInputOpen(!inputOpen)} />
                </div>
              </Form.Item>
              <Input.Group label='Price' style={{ display: `${inputOpen ? '' : 'none'}`, marginTop: '20px' }}>
                <div style={{ display: 'flex' }}>
                  <div className='textName' style={{ padding: '0.5rem 2.7rem 0 0.5rem' }}>价格</div>
                  <Form.Item
                    name='price'
                    rules={[
                      {
                        required: inputOpen,
                        message: '请输入物品名称!',
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: '500px', borderRadius: '0px' }}
                      min='0.01'
                      size='large'
                      controls={false}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      placeholder='请输入价格'
                      addonAfter={chainId === 4 ? 'ETH' : 'BNB'}
                      onChange={(val) => setReceivedPrice((val * 0.975).toFixed(4))}
                    />
                  </Form.Item>
                </div>
              </Input.Group>
              <div style={{ padding: '0 35px 0 85px', margin: '25px 0 30px 0', display: `${inputOpen ? '' : 'none'}` }} className="saleMode">
                <span>服务费率：2.5%</span>
                <span>{!!receivedPrice ? <span>你将获得：{receivedPrice}<span className='size12'> {chainId === 4 ? 'ETH' : 'BNB'}</span></span> : null}</span>
              </div>
              <Form.Item
                label={<div className='textName pr25'>版税</div>}
                style={{ display: `${inputOpen ? '' : 'none'}`, marginTop: '10px' }}
                name='royalty'
              >
                <InputNumber
                  style={{ width: '500px', borderRadius: '0px' }}
                  placeholder='请输入版税'
                  size='large'
                  min={0}
                  max={10}
                  step={1}
                  addonAfter="%"
                />
              </Form.Item>
              <div style={{ position: 'relative', margin: '0 0 0 90px', display: `${inputOpen ? '' : 'none'}` }} className="saleMode">
                <p>0~10</p>
              </div>
              <Form.Item style={{ marginTop: '40px' }}>
                <Row justify='center'>
                  {walletAddress ? (
                    <Button
                      className='btn-create-item'
                      htmlType='submit'
                      shape='round'
                      size='large'
                    >
                      创建
                    </Button>
                  ) : (
                    <ConnectWallet />
                  )}
                </Row>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
