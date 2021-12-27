import './index.scss'
import { Link, useHistory } from 'react-router-dom'
import { Tooltip, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import erc1155 from 'Assets/erc1155.png'
import erc721 from 'Assets/erc721.png'
export default function ProductionItem(props) {
    const { tokenURI, isERC1155, collectionAddress, index} = props
    
  const { chainId } = useSelector(
    (state) => state
  );
  const [nftInfo, setNftInfo] = useState(null)
    const router = useHistory()
    const toPage = (url) => {
        router.push(url)
    }
    useEffect(()=>{
        async function fetchDetail() {
            let res = await axios.get(tokenURI);
            setNftInfo(res.data)
        }
        fetchDetail()
    },[tokenURI])
    return (
        <>
            <div className="production-item">
                <div className="production-item-create">
                    <Link to={`/profile/index/${chainId}`}>create</Link>
                </div>
                <div className="production-works" onClick={() => { toPage(`/token/${chainId}/${collectionAddress}/${index}/null`) }}>
                    <img src={nftInfo?.image} alt="" className="production-works-img" />
                </div>
                <div>{nftInfo?.name}</div>
                <div className="production-item-price">
                    {/* <div>{price < 0.0001 ? '<0.0001' : parseFloat(price).toFixed(4)} ETH</div> */}
                    <div className="production-standard">
                        <Tooltip title={isERC1155 ? 'erc1155' : 'erc721'} color='#6080b4'>
                            <Button className="production-button">
                                <img src={isERC1155 ? erc1155 : erc721} alt="" width="22px" />
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </>
    )
}