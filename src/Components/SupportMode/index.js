import { useState } from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.less'
import './index.scss';

export default function SupportMode(props) {
  const { visible, okText, cancelText, content, title, setVisible } = props
  const [isModalVisible, setIsModalVisible] = useState(visible);

  const handleOk = async () => {
    setIsModalVisible(false);
    setVisible(false)
    if (okText === '前往MetaMask') {
      window.open('https://metamask.io/download', '_blank');
    } else if (okText === '确定') {
      window.open('https://www.google.cn/intl/zh-CN/chrome/', '_blank');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setVisible(false)
  };


  return (
    <div className='support-mode'>
      <Modal
        title={title}
        visible={isModalVisible}
        maskClosable={false}
        closable={false}
        width={653}
        centered={true}
        wrapClassName='wrapClass'
        footer={[
          // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
          <Button key="back" onClick={handleCancel} style={{ display: okText === '确定' ? 'none' : 'block' }}>{cancelText}</Button>,
          <Button key="submit" type="primary" onClick={handleOk} style={{ width: okText === '确定' ? '280px' : '240px' }}>{okText}</Button>
        ]}
      >
        <p>{content}</p>
      </Modal>
    </div>
  );
}
