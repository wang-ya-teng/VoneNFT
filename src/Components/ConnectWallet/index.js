import { Button } from 'antd';
import { connectWeb3Modal, CONNECTID } from 'Connections/web3Modal';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import SupportMode  from 'Components/SupportMode';
import SupportMode from 'Components/SupportMode';

export default function ConnectWallet() {
  const { walletAddress } = useSelector((state) => state);
  const [okText, setOkText] = useState('')
  const [cancelText, setCancelText] = useState('')
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(CONNECTID)) {
      connectWeb3Modal();
    }
  }, []);
  const connect = () => {
    if (!window.ethereum?.isMetaMask) {
      if (navigator.userAgent.indexOf('WebKit') > -1 || navigator.userAgent.indexOf('Firefox') > -1) {
        setIsModalVisible(true)
        setOkText('前往MetaMask')
        setCancelText('返回')
        setContent('您的浏览器未安装MetaMask，是否要前往MetaMask官网下载安装？安装成功后，请返回并刷新登录页面；首次登录时，请按照MetaMask的引导进行账号设置。')
        setTitle('MetaMask未安装')
      } else {
        setIsModalVisible(true)
        setOkText('确定')
        setCancelText('返回')
        setContent('当前浏览器不兼容MetaMask钱包，请使用谷歌Chrome浏览器。')
        setTitle('浏览器不兼容MetaMask')
      }
    } else {
      setIsModalVisible(false)
      connectWeb3Modal();
    }
  };

  return (
    <>
      <div>
        {!walletAddress ? (
          <Button className='pink-font bt-cnlo' shape='round' onClick={() => connect()}>
            <div className='center'>
              连接钱包
              <div className='error-dot' />
            </div>
          </Button>
        ) : null}
        <div>
          {isModalVisible ? (
            <SupportMode visible={isModalVisible} okText={okText} cancelText={cancelText} content={content} title={title} setVisible= {setIsModalVisible}></SupportMode>
          ) : null}
        </div>
      </div>
    </>
  );
}