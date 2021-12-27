import './index.scss'
import metamaskLogo from 'Assets/metamask-logo.png';
import { connectWeb3Modal } from 'Connections/web3Modal';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SupportMode from 'Components/SupportMode';
// 登陆页面
export default function Login() {
  const { walletAddress, chainId } = useSelector((state) => state);
  const [okText, setOkText] = useState('')
  const [cancelText, setCancelText] = useState('')
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false) // 未安装metamask钱包的弹框显示状态
  const router = useHistory()

  useEffect(() => {
    // 登录状态为true 且能取到钱包地址 跳转到个人中心页面
    if(walletAddress&&localStorage.isLogin) {
      router.push(`/profile/index/${chainId}/${walletAddress}`)
    }
  }, [walletAddress, chainId, router]);
  const connect = () => {
    // 判断浏览器是否安装metamask钱包
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
      // 
      setIsModalVisible(false)
      connectWeb3Modal();
    }
  };
  return (
    <>
      <div className="login">
        <div className="login-box">
          <div className="title">连接钱包</div>
          <div className="metamask-logo">
            <div className="metamask-img">
              <img src={metamaskLogo} alt="" width="400" />
            </div>
            <div className="line"></div>
          </div>
          <div className="login-btn" onClick={() => connect()}>使用MetaMask登录</div>
        </div>
      </div>
      <div>
        {isModalVisible ? (
          <SupportMode visible={isModalVisible} okText={okText} cancelText={cancelText} content={content} title={title} setVisible={setIsModalVisible}></SupportMode>
        ) : null}
      </div>
    </>
  )
}
