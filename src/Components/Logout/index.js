import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'antd/lib/modal/Modal';
import { logout } from 'Store/actions';
import { disconnectWeb3Modal } from 'Connections/web3Modal';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';

export default function LogoutWallet() {
  const { walletAddress } = useSelector((state) => state);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const router = useHistory();
  const logoutAction = () => {
    dispatch(logout());
    disconnectWeb3Modal();
    cancelModal();
    localStorage.isLogin = false
    router.push('/login')
  };

  async function cancelModal() {
    setIsModalVisible(false);
  }

  return (
    <div className='logoutModal'>
      <div className='pink-font btn-nl' onClick={() => setIsModalVisible(true)}>
        Logout
      </div>

      <Modal
        centered
        visible={isModalVisible}
        title={[
          <h2 key='title' className='textmode mgb-0'>
            Your wallet
          </h2>,
        ]}
        onOk={() => cancelModal}
        onCancel={() => cancelModal()}
        footer={[
          <div key='cancel' style={{ width: '100%' }} className='center'>
            <Button
              className='ant-btn ant-btn-primary btn-logout'
              onClick={() => logoutAction()}
              size='large'
              shape='round'
            >
              Logout
            </Button>
          </div>,
        ]}
      >
        <div key='content'>
          <div className='textmode wl-fs'>{walletAddress}</div>
        </div>
      </Modal>
    </div>
  );
}
