import './index.scss'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Empty } from 'antd';
import userBg from 'Assets/user-bg.png';
import avatarDefault from 'Assets/avatar-default.png';
import empty from 'Assets/icons/empty.svg';

import CollectionItem from 'Components/CollectionItem';
import { getDB } from 'Utils/orbit';
export default function Collection() {

    const { chainId, walletAddress, collectionInfo, orbitdb, userInfo } = useSelector((state) => state);
    const router = useHistory()
    const { address } = useParams();
    const [isOther, setIsOther] = useState(null); //判断是否为当前登录用户
    const [collectionData, setCollectionData] = useState([]);
    const [userData, setUserData] = useState(null);
    const toPage = (url) => {
        router.push(url)
    }
    const fetchDB = async (dbAddress, orbitdb) => {
        const db = await getDB(dbAddress, orbitdb)
        if (db) {
            let userInfo = await db.get(address + '_profile')
            let collectionInfo = await db.get(`${address}_${chainId}`)
            setCollectionData(collectionInfo)
            setUserData(userInfo)
        }
    }
    // const setDB = async (dbAddress, orbitdb, collectionAddr, colStr) =>{
    //     const db = await getDB(dbAddress, orbitdb)
    //     await db.set(`${collectionAddr}_${chainId}`, colStr)
    //     console.log(db.get(`${collectionAddr}_${chainId}`))
    // }
    // useEffect(()=>{
    //     const dbAddress = process.env.REACT_APP_ORBIT_DB;
    //     collectionData.forEach(item => {
    //         console.log(item.contractAddress)
    //         setDB(dbAddress, orbitdb, item.contractAddress, item)
    //     });
    // },[collectionInfo, orbitdb])// eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (address === walletAddress) {
            setIsOther(false)
            setUserData(userInfo)
            setCollectionData(collectionInfo)
        } else {
            setIsOther(true)
            // 根据环境获取orbitdb库的地址
            const dbAddress = process.env.REACT_APP_ORBIT_DB;
            if (!!orbitdb) {
                fetchDB(dbAddress, orbitdb)
            }
        }
    }, [collectionInfo, address, walletAddress, orbitdb, userInfo])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div className="collection">
                <div className="collection-header">
                    <div className="collection-bg">
                        <img src={userBg} alt="" width="100%" />
                    </div>
                    <div className="collection-user-header">
                        <img src={userData?.avatar || avatarDefault} alt="" className="collection-user-avatar-img" />
                    </div>
                    <div className="collection-user-info">
                        <p className="collection-user-name">{userData?.userName}</p>
                        <p className="collection-user-address">{`${address?.slice(0, 6)}...${address?.slice(address?.length - 4, address?.length)}`}</p>
                    </div>
                    {!isOther ? (
                        <div className="collection-index-btn">
                            <div className="col-btn" onClick={() => { toPage(`/profile/index/${chainId}/${address}`) }}>我的个人主页</div>
                            <div className="col-btn create-col-btn" onClick={() => { toPage('/collection/standard') }}>创建新作品集</div>
                        </div>
                    ) : (
                        <div className="collection-index-btn">
                            <div className="col-btn create-col-btn" onClick={() => { toPage(`/profile/index/${chainId}/${address}`) }}>他的个人主页</div>
                        </div>
                    )}
                </div>
                <div className="col-items" style={{ justifyContent: collectionData?.length ? 'flex-start' : 'center' }}>
                    {
                        collectionData?.length ? collectionData.map((item, i) => (
                            <CollectionItem isERC1155={item.isERC1155} logo={item.logo} name={item.name} address={address} contractAddress={item.contractAddress} key={i} isOther={isOther}></CollectionItem>
                        )) : (
                            <Empty
                                image={empty}
                                imageStyle={{
                                    height: 86,
                                    width: 86,
                                }}
                                description={<span className='textmode'>No Data</span>}
                            ></Empty>
                        )
                    }
                </div>
            </div>
        </>
    )
}