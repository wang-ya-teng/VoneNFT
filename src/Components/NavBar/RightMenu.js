import { Menu } from 'antd';
// import { Menu, Grid } from 'antd';
import { connectWeb3Modal, CONNECTID } from 'Connections/web3Modal';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import avatarLogout from 'Assets/avatar-logout.png';
import avatarDefault from 'Assets/avatar-default.png';
import LogoutWallet from 'Components/Logout';
const SubMenu = Menu.SubMenu;
const RightMenu = ({ onClose }) => {
  const location = useLocation();
  const router = useHistory();
  // const routeMatch = useRouteMatch();
  // const params = useParams();
  // console.log(routeMatch)
  // console.log(params)
  // console.log(location)
  const { shortAddress, walletAddress, chainId, userInfo } = useSelector(
    (state) => state
  );

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setUserData(userInfo)
}, [userInfo])
  useEffect(() => {
    if (localStorage.getItem(CONNECTID)) {
      connectWeb3Modal();
    }
    // if(!window?.ethereum?.selectedAddress) {
    //   router.push('/login')
    // }
  }, [router]);

  const generateMenuItemForRouteKey = routeKey => {
    const pathName = location.pathname;
    const routeMap = {
      "/market": "市场",
      "/create": "创建",
    }
    let linkClassName = "menu-button"
    let menuClassName = ''
    let walletProfilePath = `/profile/${chainId}/${walletAddress}`
    if (routeKey === pathName || (routeKey === '/profile' && walletProfilePath === pathName)) {
      linkClassName += ' active';
      menuClassName = 'ant-menu-selected ant-menu-item-selected'
    }
    return (
      <Menu.Item key={routeKey} className={menuClassName}>
        <Link to={routeKey === '/profile' ? walletProfilePath : routeKey} onClick={onClose}><div className={linkClassName}>{routeMap[routeKey]}</div></Link>
      </Menu.Item>
    )
  }
  const toPage = (url) => {
    let Url = shortAddress ? url : `/login`
    router.push(Url)
  }
  return (
    <Menu selectable={false} mode={'horizontal'} triggerSubMenuAction="hover">
      {generateMenuItemForRouteKey('/market')}
      {generateMenuItemForRouteKey('/create')}

      <SubMenu
        key='sub1'
        title={
          <div className='balance-create background-mode center'>
            <div style={{ paddingLeft: '2px' }}>
              <div className='center' style={{ display: 'flex' }}>
                {!shortAddress ? (
                  <img
                    className='nav-avatar'
                    src={avatarLogout}
                    alt='avatar'
                    onClick={() => { toPage() }}
                  />
                ) : <img
                  className='nav-avatar'
                  src={userData?.avatar || avatarDefault}
                  alt='avatar'
                />
                }
              </div>
            </div>
          </div>
        }
      >
        <Menu.Item key='setting:1' onClick={() => { toPage(`/profile/index/${chainId}/${walletAddress}`) }}>
          我的物品
        </Menu.Item>
        <Menu.Item key='setting:2' onClick={() => { toPage(`/collection/index/${walletAddress}`) }}>
          我的作品集
        </Menu.Item>
        <Menu.Item key='setting:3' onClick={() => { toPage(`/profile/edit`) }}>
          账户设置
        </Menu.Item>
        {walletAddress ? <Menu.Item key='setting:4'>
          <LogoutWallet />
        </Menu.Item> : null}

      </SubMenu>
    </Menu>
  );
};

export default RightMenu;
