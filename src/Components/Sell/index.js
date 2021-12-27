import 'Views/DetailNFT/index.scss';
import { Button, InputNumber, Modal, Form, Input, Col, Row } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createSellOrder, SELL_ERROR } from 'Store/actions';
import { useDispatch, useSelector } from 'react-redux';
import SellModal from 'Components/SellModal';

import './index.scss';

export default function Sell({ token, is1155, available, getOwners1155 }) {
  const dispatch = useDispatch();
  let history = useHistory();

  const { web3, chainId, approveError, sellError } = useSelector((state) => state);
  const { addressToken, id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [approve, setApprove] = useState('0');
  const [selling, setSelling] = useState(false);
  const [receivedPrice, setReceivedPrice] = useState('');

  const [form] = Form.useForm();

  useEffect(() => {
    //4001用户拒绝交易   4000用户确认交易    1交易成功
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
  }, [approveError, sellError])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = useCallback(async () => {
    const values = await form.validateFields();
    if (!!values && parseFloat(values.price) > 0) {
      setIsLoading(true);
      setApprove('1');
      const result = await dispatch(
        createSellOrder(
          addressToken,
          id,
          web3.utils.toWei(values.price.toString(), 'ether'),
          '0x0000000000000000000000000000000000000000',
          !!values.amount ? values.amount : 1
        )
      );
      
      if (!!result.status) {
        if (!!is1155) {
          await getOwners1155();
        }
        setIsModalVisible(false);
        form.resetFields();
        history.push({
          pathname: `/token/${chainId}/${addressToken}/${id}/${result.sellId}`,
        });
      }
    }
  }, [
    dispatch,
    addressToken,
    id,
    web3.utils,
    is1155,
    history,
    form,
    getOwners1155,
    chainId,
  ]);

  const handleCancel = () => {
    dispatch({ type: SELL_ERROR, sellError: '0' });
    setIsModalVisible(false);
    form.resetFields();
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

  return (
    <>
      <div className='gSzfBw'>
        <Button style={{ background: '#6080b4', border: 'none', borderRadius: '10px' }} type='primary' size='large' onClick={showModal}>
          出售
        </Button>
      </div>

      <Modal
        title={<h3 className='textmode mgb-0'>出售</h3>}
        visible={isModalVisible}
        onCancel={handleCancel}
        centered
        footer={[
          <Button
            style={{ width: '220px', height: '42px', background: '#6080b4', borderRadius: '10px', border: 'none' }}
            key='sell'
            type='primary'
            shape='round'
            size='large'
            onClick={() => handleOk()}
          >
            出售
          </Button>,
        ]}
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
                  style={{ width: '60%' }}
                >
                  <InputNumber
                    style={{ width: '460px', borderRadius: '0px' }}
                    min='0.01'
                    size='large'
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    placeholder='请输入价格'
                    addonAfter={chainId === 4 ? 'ETH' : 'BNB'}
                    onChange={(val) => setReceivedPrice((val * 0.975).toFixed(4))}
                  />
                </Form.Item>
              </Input.Group>
              <div className='flex-between'>
                <div>服务费率：</div>
                <div><span className='bold'>2.50</span>%</div>
              </div>
              <div className='flex-between'>
                <div>版税率：</div>
                <div><span className='bold'>0</span>%</div>
              </div>
              <div className='flex-between'>
                <div>你将获得的总金额：</div>
                <div><span className='bold'>{receivedPrice}</span>{chainId === 4 ? 'ETH' : 'BNB'}</div>
              </div>
            </Col>
            {is1155 ? (
              <Col xs={{ span: 24 }} md={{ span: 7 }}>
                <Input.Group>
                  <Form.Item
                    required
                    name={['amount']}
                    rules={[{ validator: checkAmount }]}
                    label='Amount'
                    className='input-amount-sell textmode'
                  >
                    <InputNumber
                      min='1'
                      size='large'
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      placeholder='Amount'
                      className='textmode'
                    />
                  </Form.Item>
                </Input.Group>
              </Col>
            ) : (
              <></>
            )}
          </Row>
        </Form>
      </Modal>

      {!!isLoading ?
        <SellModal
          visible={true}
          approve={approve}
          selling={selling}
          setIsLoading={setIsLoading}
          handleOk={handleOk}
        /> : <></>}
    </>
  );
}
