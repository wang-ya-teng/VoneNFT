import './detail.scss'
import collectionDefault from 'Assets/collection-default.png'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { getNftsByCollectionAddress } from 'Store/actions';
import ProductionItem from 'Components/ProductionItem'
import { getDB } from 'Utils/orbit'
import { Empty } from 'antd';
import empty from 'Assets/icons/empty.svg';
export default function CollectionDetail() {
    const { collectionAddress, address } = useParams()
    const { nftsOfCollectionAddress, walletAddress, orbitdb, chainId } = useSelector((state) => state)
    const [isOther, setIsOther] = useState(null); //判断是否为当前登录用户
    const [colInfo, setColInfo] = useState(null); //作品集信息
    const dispatch = useDispatch()
    // 获取该作品集下的nft信息
    const fetchOwner = useCallback(async () => {
        dispatch(getNftsByCollectionAddress(collectionAddress));
    }, [collectionAddress, dispatch]);
    useEffect(() => {
        fetchOwner()
    }, [fetchOwner])
    // 获取db中该作品集的信息
    const fetchDB = async (dbAddress, orbitdb) => {
        // 连接db
        const db = await getDB(dbAddress, orbitdb)
        if (db) {
            let colInfo = await db.get(`${collectionAddress}_${chainId}`)
            setColInfo(colInfo)
        }
    }
    useEffect(() => {

        // 根据环境获取orbitdb库的地址
        const dbAddress = process.env.REACT_APP_ORBIT_DB;
        if (!!orbitdb) {
            fetchDB(dbAddress, orbitdb)
        }
        if (address === walletAddress) {
            setIsOther(false)
        } else {
            setIsOther(true)
        }
    }, [address, walletAddress, orbitdb])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <div className="collection-detail">
                <div className="collection-detail-header">
                    <div className="collection-detail-logo">
                        <img className="collection-logo" src={colInfo?.logo || collectionDefault} alt="" />
                    </div>
                    <div className="collection-detail-info">
                        <div className="collection-detail-name">{colInfo?.name}</div>
                        <div className="collection-detail-desc">
                            
                            {colInfo?.description}
                        </div>

                        {/* <div class="text">
                        <label class="btn">展开</label>
                        <span>
                        
                            </span>
                        </div> */}
                    </div>
                </div>
                {!isOther ? (
                    <div className="collection-edit-btn">
                        <Link to={`/collection/edit/${collectionAddress}`}>编辑作品集</Link>
                    </div>
                ) : null}
                <div className="pro-items" style={{ justifyContent: nftsOfCollectionAddress?.length ? 'flex-start' : 'center' }}>
                    {
                        nftsOfCollectionAddress?.length ? nftsOfCollectionAddress.map((item, i) => (
                            <ProductionItem isERC1155={item.isERC1155} index={item.index} tokenURI={item.tokenURI} collectionAddress={collectionAddress} key={i}></ProductionItem>
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