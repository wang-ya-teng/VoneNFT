import { Modal, Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import './index.scss';
import Dui from 'Assets/icons/dui.png'

export default function CreateModal({ visible, approve, selling, handleOk, setIsLoading }) {
  // const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsModalVisible(visible);
  }, [visible]);

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsLoading(false);
  };

  const tryAgain = async () => {
    handleOk();
  }

  return (
    <Modal
      visible={isModalVisible}
      footer={<div />}
      centered
      width={500}
      onCancel={handleCancel}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '90%', margin: '25px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="textMode"><span className="one">1</span><span>授权</span></div>
            {approve === '3' ? <div style={{ color: '#43A047' }}>
              已完成
              <img src={Dui} alt='yes' style={{ width: '22px' }} />
            </div> : null}
          </div>
          <div>出售此作品集中的作品需进行一次性授权。</div>
          {approve === '1' ? <Space style={{ width: '100%' }}>
            <Button type="primary" loading style={{ width: '400px', height: '40px', borderRadius: '10px', marginTop: '10px', background: '#6080b4', border: 'none' }}>
              授权中
            </Button>
          </Space> : approve === '2' ? <Space style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Button onClick={() => { tryAgain() }} type="primary" style={{ width: '400px', height: '40px', borderRadius: '10px', marginTop: '10px', background: '#6080b4', border: 'none' }}>
              再试一次
            </Button>
            <div style={{ color: 'red' }}>错误：您在钱包中拒绝支付</div>
          </Space> : null}
        </div>
        <div style={{ width: '90%', margin: '25px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="textMode"><span className="one">2</span><span>上架出售</span></div>
            {selling === '3' ? <div style={{ color: '#43A047' }}>
              已完成
              <img src={Dui} alt='yes' style={{ width: '22px' }} />
            </div> : null}
          </div>
          <div>上架出售需支付一笔矿工费。</div>
          {selling === '1' ? <Space style={{ width: '100%' }}>
            <Button type="primary" loading style={{ width: '400px', height: '40px', borderRadius: '10px', marginTop: '10px', background: '#6080b4', border: 'none' }}>
              上架中
            </Button>
          </Space> : selling === '2' ? <Space style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '50px' }}>
            <Button onClick={() => { tryAgain() }} type="primary" style={{ width: '400px', height: '40px', borderRadius: '10px', marginTop: '10px', background: '#6080b4', border: 'none' }}>
              再试一次
            </Button>
            <div style={{ color: 'red' }}>错误：您在钱包中拒绝支付</div>
          </Space> : null}
        </div>
      </div>
    </Modal>
  );
}
