import 'Views/DetailNFT/index.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Space } from 'antd';
// import { useDispatch } from 'react-redux';
export default function Cancel({ visible, handleOk, setIsDeploying }) {
  const { colError } = useSelector((state) => state);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const dispatch = useDispatch();

  useEffect(() => {
    setIsModalVisible(visible);
  }, [visible]);

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsLoading(true);
    setIsDeploying(false);
  };

  const tryAgain = async () => {
    setIsLoading(true);
    handleOk();
  }

  useEffect(() => {
    if (colError === '4001') {
      setIsLoading(false);
    } else if (colError === '4000') {
      setIsLoading(true);
    } else if (colError === '1') {
      setIsModalVisible(false);
    }
  }, [colError])

  return (
    <Modal title="部署合约" onCancel={handleCancel} visible={isModalVisible} footer={<div />} centered>
      <p style={{ textAlign: 'center', margin: '0 0 50px 0', fontSize: '15px' }}>为创建的作品集部署智能合约</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Button
          style={{ width: '210px', height: '42px', background: '#fff', borderRadius: '10px', border: '1px solid #6080b4', color: '#6080b4' }}
          size='large' onClick={handleCancel} className='btn-cancel-sell'>
          取消
        </Button>
        {!!isLoading ? <Space style={{ display: 'flex', flexDirection: 'column', height: '60px' }}>
          <Button type="primary" loading style={{ width: '210px', height: '42px', background: '#6080b4', borderRadius: '10px', border: 'none', color: '#fff' }}>
            合约部署中
          </Button>
        </Space> : <Space style={{ display: 'flex', flexDirection: 'column', height: '60px' }}>
          <Button onClick={tryAgain} type="primary" style={{ width: '210px', height: '42px', background: '#6080b4', borderRadius: '10px', border: 'none', color: '#fff', marginLeft: '20px' }}>
            再试一次
          </Button>
          <div style={{ color: 'red' }}>错误：您在钱包中拒绝支付</div>
        </Space>}
      </div>
    </Modal>
  );
}
