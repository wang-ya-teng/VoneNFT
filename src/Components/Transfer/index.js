import 'Views/DetailNFT/index.scss';
import { useState, useEffect } from 'react';
import { Modal, Button, Input, Form, InputNumber, Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { transferNft } from 'Store/actions';
import send from 'Assets/icons/send.png';

export default function Transfer({ token, is1155, available, web3, getOwners1155 }) {
  const { transferError } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transferTo, setTransferTo] = useState('');
  const { addressToken, id } = useParams();
  const [transfer, setTransfer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //4001用户拒绝交易   4000用户确认交易    1交易成功
    if (transferError === '4001') {
      setIsLoading(false);
      setTransfer(true);
    } else if (transferError === '4000') {
      setTransfer(false);
    } else if (transferError === '1') {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  }, [transferError])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (!!values) {
      setIsLoading(true);
      setTransfer(false);
      await dispatch(transferNft(addressToken, transferTo, id, values.amount, is1155));
      // await getOwners1155();

    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsLoading(false);
    setTransfer(false);
    form.resetFields();
  };

  const onChange = (e) => {
    setTransferTo(e.target.value);
  };

  const checkAmount = async (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Enter amount'));
    } else if (parseInt(value) > parseInt(available)) {
      return Promise.reject(new Error('Not enough amount'));
    } else {
      return Promise.resolve();
    }
  };
  const checkAddress = async (_, value) => {
    if (!value) {
      return Promise.reject(new Error('请输入地址'));
    } else if (!web3.utils.isAddress(value)) {
      return Promise.reject(new Error('地址格式不正确'));
    } else {
      return Promise.resolve();
    }
  };

  return (
    <>
      <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center' }} onClick={showModal}>
        <img style={{ marginRight: '5px' }} width={14} src={send} alt='send' /><div style={{ color: '#6080B4', fontSize: '15px' }}>赠送</div>
      </div>
      <Modal
        width={550}
        title={<h3 className='textmode mgb-0'>赠送</h3>}
        visible={isModalVisible}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key='cancel' shape='round' size='large' onClick={() => handleCancel()} style={{ width: '220px', height: '42px', borderRadius: '10px', border: '1px solid #6080b4', color: '#6080b4' }}>
            取消
          </Button>,
          <Button key='sell' type='primary' loading={isLoading} shape='round' size='large' onClick={() => handleOk()} style={{ width: '220px', height: '42px', background: '#6080b4', borderRadius: '10px', border: 'none', display: `${!!transfer ? 'none' : 'inline-block'}` }}>
            {!!isLoading ? '支付中' : '赠送'}
          </Button>,
          <Button key='transfer' type='primary' loading={isLoading} shape='round' size='large' onClick={() => handleOk()} style={{ width: '220px', height: '42px', background: '#6080b4', borderRadius: '10px', border: 'none', display: `${!transfer ? 'none' : 'inline-block'}` }}>
            再试一次
          </Button>,
        ]}
      >
        <div className='price-des'>
          <Form form={form} layout='vertical' className='input-transfer'>
            <Row gutter={[5, 10]}>
              <Col xs={{ span: 24 }} md={{ span: is1155 ? 17 : 24 }}>
                <div style={{ marginBottom: '20px' }}>赠送物品需要发起一笔交易</div>
                <Form.Item
                  name={['address']}
                  rules={[{ validator: checkAddress }]}
                  label='接收地址'
                  required
                >
                  <Input
                    width={200}
                    size='large'
                    className='search-style'
                    onChange={onChange}
                    placeholder='请输入地址'
                  />
                </Form.Item>
                <div style={{ color: 'red', width: '100%', textAlign: 'center', marginTop: '10px', display: `${!!transfer ? 'block' : 'none'}` }}>错误：您在钱包中拒绝支付</div>
              </Col>
              {is1155 ? (
                <Col xs={{ span: 24 }} md={{ span: 7 }}>
                  <Form.Item
                    name={['amount']}
                    rules={[{ validator: checkAmount }]}
                    label='Amount'
                    required
                  >
                    <InputNumber
                      min='1'
                      size='large'
                      className='search-style input-amount-transfer input-sell'
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      placeholder='Set amount'
                    />
                  </Form.Item>
                </Col>
              ) : null}
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
