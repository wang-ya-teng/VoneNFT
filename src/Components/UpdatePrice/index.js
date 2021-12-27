import 'Views/DetailNFT/index.scss';
import { Button, InputNumber, Modal, Form, Input, Col, Row, Space } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updatePrice } from 'Store/actions';
import { useDispatch, useSelector } from 'react-redux';

import '../Sell/index.scss';

export default function UpdatePrice({ orderDetail, token, is1155, available, getOwners1155 }) {
  const dispatch = useDispatch();

  const { web3, chainId, updateError } = useSelector((state) => state);

  const { sellID } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [update, setUpdate] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
    setUpdate('1');
  };

  const handleOk = useCallback(async () => {
    const values = await form.validateFields();
    if (!!values && parseFloat(values.price) > 0) {
      setIsLoading(true);
      setUpdate('1');
      let result = await dispatch(updatePrice(sellID, web3.utils.toWei(values.price.toString(), 'ether')));
      if (!!result) {
        console.log(result);
        setIsModalVisible(false);
        setUpdate('0');
        setIsLoading(false);
        form.resetFields();
      }
    }
  }, [dispatch, web3.utils, sellID, form]);

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsLoading(false);
    setUpdate('0');
    form.resetFields();
  };

  useEffect(() => {
    if (updateError === '4001') {
      setUpdate('2');
    } else if (updateError === '4000') {
      setUpdate('1');
    } else if (updateError === '1') {
      setUpdate('0');
    }
  }, [updateError])

  return (
    <div className='gSzfBw'>
      <Button key='change' style={{ background: '#6080B4', border: 'none', borderRadius: '10px' }} type='primary' size='large' onClick={showModal}>
        更改价格
      </Button>
      <Modal
        title={<h3 className='textmode mgb-0'>更改价格</h3>}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={<div />}
        centered
      >
        <Form form={form} className='input-sell' layout='vertical'>
          <Row gutter={[5, 10]}>
            <Col xs={{ span: 24 }} md={{ span: is1155 ? 17 : 24 }}>
              <div className='ant-col ant-form-item-label'>
                <label htmlFor='price' className='ant-form-item-required' title='Price'>
                  价格
                </label>
              </div>
              <Input.Group compact label='Price'>
                <Form.Item
                  name={['price']}
                  rules={[{ required: true, message: '请输入价格' }]}
                  className='input-price'
                >
                  <InputNumber
                    style={{ width: '460px', borderRadius: '0px' }}
                    min='0.01'
                    size='large'
                    className='search-style'
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    placeholder='请输入最新价格'
                    addonAfter={chainId === 97 ? 'BNB' : 'ETH'}
                  />
                </Form.Item>
              </Input.Group>
            </Col>
            {is1155 ? (
              <Col xs={{ span: 24 }} md={{ span: 7 }}>
                <Input.Group>
                  <Form.Item
                    required
                    name={['amount']}
                    label='Amount'
                    className='input-amount-sell'
                  >
                    <InputNumber
                      min='1'
                      size='large'
                      defaultValue={!!orderDetail ? orderDetail.amount : 0}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      placeholder='Amount'
                      disabled
                    />
                  </Form.Item>
                </Input.Group>
              </Col>
            ) : (
              <></>
            )}
          </Row>
        </Form>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '40px' }}>
          <Button
            style={{ width: '210px', height: '42px', background: '#fff', borderRadius: '10px', border: '1px solid #6080b4', color: '#6080b4' }}
            size='large' onClick={handleCancel} className='btn-cancel-sell'>
            取消
          </Button>
          {update === '1' ? <Space key='update' style={{ display: 'flex', flexDirection: 'column', height: '60px' }}>
            <Button onClick={() => handleOk()} type="primary" loading={isLoading} style={{ width: '210px', height: '42px', background: '#6080b4', borderRadius: '10px', border: 'none', color: '#fff' }}>
              {!!isLoading ? '更改中' : '更改价格'}
            </Button>
          </Space> : update === '2' ? <Space key='tryAgain' style={{ display: 'flex', flexDirection: 'column', height: '60px' }}>
            <Button onClick={() => handleOk()} type="primary" style={{ width: '210px', height: '42px', background: '#6080b4', borderRadius: '10px', border: 'none', color: '#fff', marginLeft: '20px' }}>
              再试一次
            </Button>
            <div style={{ color: 'red' }}>错误：您在钱包中拒绝支付</div>
          </Space> : null}
        </div>
      </Modal>
    </div>
  );
}
