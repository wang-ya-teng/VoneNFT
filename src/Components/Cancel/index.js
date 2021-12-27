import 'Views/DetailNFT/index.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Space } from 'antd';
import { cancelSellOrder } from 'Store/actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
export default function Cancel({ orderDetail, is1155, getOwners1155, chainId }) {
  const { cancelError } = useSelector((state) => state);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelOrder, setCancelOrder] = useState('0');
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
    setCancelOrder('1');
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (cancelError === '4001') {
      setCancelOrder('2');
    } else if (cancelError === '4000') {
      setCancelOrder('1');
    } else if (cancelError === '1') {
      setCancelOrder('0');
    }
  }, [cancelError])

  let history = useHistory();

  const cancel = async () => {
    if (orderDetail && orderDetail.sellId) {
      setIsLoading(true);
      setCancelOrder('1');
      let result = await dispatch(cancelSellOrder(orderDetail));
      if (!!result) {
        setIsModalVisible(false);
        setIsLoading(false);
        if (!!is1155) {
          await getOwners1155();
        }
        history.push({
          pathname: `/token/${chainId}/${orderDetail.nftAddress}/${orderDetail.tokenId}/null`,
        });
      }
    }
  };

  return (
    <div className='gSzfBw'>
      <Button style={{ borderRadius: '10px' }} size='large' onClick={showModal} className='btn-cancel-sell'>
        下架
      </Button>
      <Modal title="下架" onCancel={handleCancel} visible={isModalVisible} footer={<div />} centered>
        <p style={{ textAlign: 'center' }}>下架后您仍然可以重新出售</p>
        <p style={{ textAlign: 'center', marginBottom: '30px' }}>下架物品需要发起一笔交易</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button
            style={{ width: '210px', height: '42px', background: '#fff', borderRadius: '10px', border: '1px solid #6080b4', color: '#6080b4' }}
            size='large' onClick={handleCancel} className='btn-cancel-sell'>
            取消
          </Button>
          {cancelOrder === '1' ? <Space style={{ display: 'flex', flexDirection: 'column', height: '60px' }}>
            <Button onClick={cancel} type="primary" loading={isLoading} style={{ width: '210px', height: '42px', background: '#6080b4', borderRadius: '10px', border: 'none', color: '#fff' }}>
              {!!isLoading ? '下架中' : '下架'}
            </Button>
          </Space> : cancelOrder === '2' ? <Space style={{ display: 'flex', flexDirection: 'column', height: '60px' }}>
            <Button onClick={cancel} type="primary" style={{ width: '210px', height: '42px', background: '#6080b4', borderRadius: '10px', border: 'none', color: '#fff', marginLeft: '20px' }}>
              再试一次
            </Button>
            <div style={{ color: 'red' }}>错误：您在钱包中拒绝支付</div>
          </Space> : null}
        </div>
      </Modal>
    </div >
  );
}
