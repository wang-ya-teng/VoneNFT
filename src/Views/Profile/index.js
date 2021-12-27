import './index.scss'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { message } from 'antd';
import { uploadFileToIpfs } from 'Utils/ipfs';
import LoadingModal from 'Components/LoadingModal';
import IconCoppy from 'Components/IconCoppy';
import userBg from 'Assets/user-bg.png';
import avatarDefault from 'Assets/avatar-default.png';
import edit from 'Assets/edit.png';
import { getDB } from 'Utils/orbit'
import { setUserInfo } from 'Store/actions';

import TabOwner from './tabOwner';
import TabOnSale from './tabOnSale';

export default function Profile() {
    const { userInfo, orbitdb, walletAddress } = useSelector((state) => state);
    const { address } = useParams();
    const router = useHistory()
    const dispatch = useDispatch()
    const [itemType, setItemType] = useState('1') // 1：拥有的物品，2：创建的物品
    const [imgType, setImgType] = useState('1') // 1:头像,2:背景图
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isOther, setIsOther] = useState(null); //判断是否为当前登录用户

    // const [userAvatar, setUserAvatar] = useState([]);
    const toPage = (url) => {
        router.push(url)
    }

    const fetchDB = async (dbAddress, orbitdb) => {
        const db = await getDB(dbAddress, orbitdb)
        if (db) {
            let userInfo = await db.get(address + '_profile')
            console.log(userInfo)
            setUserData(userInfo)
        }
    }
    useEffect(() => {
        if (address === walletAddress) {
            setIsOther(false)
            setUserData(userInfo)
        } else {
            setIsOther(true)
            // 根据环境获取orbitdb库的地址
            const dbAddress = process.env.REACT_APP_ORBIT_DB;
            if (!!orbitdb) {
                fetchDB(dbAddress, orbitdb)
            }
        }
    }, [userInfo, address, walletAddress, orbitdb])// eslint-disable-line react-hooks/exhaustive-deps
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: async (acceptedFiles) => {
            //支持的图片类型
            const isImage = acceptedFiles[0].type === 'image/jpeg' || acceptedFiles[0].type === 'image/jpg' || acceptedFiles[0].type === 'image/png' || acceptedFiles[0].type === 'image/gif'
            if (!isImage) {
                message.warn('上传图片只能是jpg、png、gif图片格式!')
                return
            }
            let image
            if (imgType === '1') { //上传头像
                if (acceptedFiles[0].size <= 2048000) {
                    // upload image
                    setIsLoading(true);
                    let formData = new FormData();
                    formData.append('file', acceptedFiles[0]);
                    const ipfsHash = await uploadFileToIpfs(formData);
                    image = 'https://gateway.pinata.cloud/ipfs/' + ipfsHash;
                    setIsLoading(false);
                    console.log(image);
                } else {
                    message.warn('头像最大为2MB')
                }
            } else if (imgType === '2') { // 上传背景图
                if (acceptedFiles[0].size <= 20480000) {
                    // upload image
                    setIsLoading(true);
                    let formData = new FormData();
                    formData.append('file', acceptedFiles[0]);
                    const ipfsHash = await uploadFileToIpfs(formData);
                    image = 'https://gateway.pinata.cloud/ipfs/' + ipfsHash;
                    setIsLoading(false);
                    console.log(image);
                } else {
                    message.warn('背景图最大为20MB')
                }
            }

            // 根据环境获取orbitdb库的地址
            const address = process.env.REACT_APP_ORBIT_DB;
            // 获取数据库信息[address:数据库地址;orbitdb：orbitdb初始化信息]
            const db = await getDB(address, orbitdb)
            if (db) {
                if (imgType === '1') {
                    userData.avatar = image
                } else if (imgType === '2') {
                    userData.background = image
                }
                await db.set(walletAddress + '_profile', userData)
                dispatch(setUserInfo(userData))
                console.log(userData)
            }
        },
    });

    return (
        <>
            <div className="profile">
                {isLoading ? <LoadingModal title={'Upload Image'} visible={true} /> : <></>}
                <div className="profile-header">
                    <div className="user-bg">
                        <img src={userData?.background || userBg} alt="" className="img-bg" />
                        {!isOther ? (
                            <div className="bg-edit" {...getRootProps()}>
                                <div onClick={() => { setImgType('2') }}>
                                    <input {...getInputProps()} />
                                    <img src={edit} alt="" className="img-bg-img" />
                                    <div style={{ color: '#fff' }}>上传背景图</div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div className="user-header">
                        <img src={userData?.avatar || avatarDefault} alt="" className="img-avatar" />
                        {!isOther ? (
                            <div className="header-edit" {...getRootProps()}>
                                <div onClick={() => { setImgType('1') }}>
                                    <input {...getInputProps()} />
                                    <img src={edit} alt="" className="header-edit-img" />
                                    <div style={{ color: '#fff' }}>上传头像</div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div className="user-info">
                        <p className="user-name">{userData?.userName}</p>
                        <p className="user-address">
                            <span>{`${address?.slice(0, 6)}...${address?.slice(address?.length - 4, address?.length)}`}</span>
                            <button className='btn-coppy'>
                                <span className='icon-coppy'>
                                    <IconCoppy address={address} />
                                </span>
                            </button>
                        </p>
                        <p className="user-desc">{userData?.desc}</p>
                    </div>
                    {!isOther ? (
                        <div className="user-btn">
                            <div className="btn" onClick={() => { toPage('/profile/edit') }}>编辑个人资料</div>
                            <div className="btn profile-collection" onClick={() => { toPage(`/collection/index/${address}`) }}>我的作品集</div>
                        </div>
                    ) : (
                        <div className="user-btn">
                            <div className="btn profile-collection-other" onClick={() => { toPage(`/collection/index/${address}`) }}>他的作品集</div>
                        </div>
                    )}
                </div>
                <div className="mynft">
                    <div className="nav">
                        <div className="mynft-title">{!!isOther ? '他的物品' : '我的物品'}</div>
                        <div className="mynft-btn">
                            <div className={['btn', itemType === '1' ? 'profile-active-btn' : ''].join(' ')} onClick={() => { setItemType('1') }}>拥有的物品</div>
                            <div className={['btn', itemType === '2' ? 'profile-active-btn' : ''].join(' ')} onClick={() => { setItemType('2') }}>创建的物品</div>
                        </div>
                    </div>
                </div>

                <div className='list-nft-owner'>
                    <div className='list-unsell'>在售物品</div>
                    <TabOnSale address={address} />
                    <div className='list-unsell mt40'>未出售物品</div>
                    <TabOwner address={address} />
                </div>
            </div>
        </>
    )
}