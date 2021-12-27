import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import { Link } from 'react-router-dom';
import logo from 'Assets/logo.png';
import { getDB, initOrbitDB } from 'Utils/orbit'
import { setUserInfo, setCollectionInfo } from 'Store/actions';
import UnmatchedChainModal from 'Components/UnmatchedChainModal';

export default function NavBar() {
  const { walletAddress, orbitdb, chainId, unmatchedModal } = useSelector((state) => state);
  const [isModalVisible, setIsModalVisible] = useState(unmatchedModal) //不匹配链类型弹框控制
  const dispatch = useDispatch();
  const fetchDB = async (address, orbitdb) => {
    const db = await getDB(address, orbitdb)
    if (db) {
      // db.set(walletAddress+'_profile',{userName: 'qqqq', desc: 'wwww', cover: 'qqq', pic: 'qqq'})
      let userInfo = await db.get(walletAddress + '_profile')
      let collectionInfo = await db.get(`${walletAddress}_${chainId}`)
      console.log(userInfo)
      console.log(collectionInfo)
      dispatch(setUserInfo(userInfo || {}))
      dispatch(setCollectionInfo(collectionInfo || []))
    }
  }

  useEffect(() => {
    if (walletAddress) {
      // 根据环境获取orbitdb库的地址
      const address = process.env.REACT_APP_ORBIT_DB;
      if (!!orbitdb) {
        fetchDB(address, orbitdb)
      } else {
        // 初始化IPFS、ORBITDB
        initOrbitDB().then(() => {
          fetchDB(address, orbitdb)
        })
      }
    }
  }, [walletAddress,orbitdb])// eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(()=>{
    setIsModalVisible(unmatchedModal)
  }, [unmatchedModal, isModalVisible])
  return (
    <nav className='menu-bar'>
      <div className='logo'>
        <Link to='/'>
          <img src={logo} alt='logo' />
        </Link>
      </div>
      <div className='menuCon'>
        <div className='leftMenu'>
          <LeftMenu />
        </div>
        <div className='rightMenu'>
          <RightMenu />
        </div>
      </div>
      <UnmatchedChainModal visible={isModalVisible}></UnmatchedChainModal> 
    </nav>
  );
}
