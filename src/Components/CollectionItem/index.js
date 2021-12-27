import './index.scss'
import { Link } from 'react-router-dom'
import { Tooltip, Button } from 'antd';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import SampleERC721 from 'Contracts/SampleERC721.json';
import erc1155 from 'Assets/erc1155.png'
import erc721 from 'Assets/erc721.png'
import collectionDefault from 'Assets/collection-default.png'
export default function CollectionItem(props) {
    const { isERC1155, logo, name, contractAddress, isOther, address } = props
    const { walletAddress, web3 } = useSelector(
        (state) => state
    );
    const [balance, setBalance] = useState(0)
    const router = useHistory()
    const toPage = (url) => {
        router.push(url)
    }
    useEffect(() => {
        const getInfo = async () => {
            let erc721Instance = await new web3.eth.Contract(
                SampleERC721.abi,
                contractAddress
            );
            let balance = await erc721Instance.methods.totalSupply().call();
            setBalance(balance)
        };

        getInfo();
    }, [contractAddress, walletAddress, web3])
    return (
        <>
            <div className="collection-item" onClick={() => { toPage(`/collection/detail/${contractAddress}/${address}`) }}>
                <div className="collection-standard">
                    <Tooltip title={isERC1155 ? 'erc1155' : 'erc721'} color='#6080b4'>
                        <Button className="collection-button">
                            <img src={isERC1155 ? erc1155 : erc721} alt="" width="22px" />
                        </Button>
                    </Tooltip>
                </div>
                <div className="collection-works">
                    <img src={logo || collectionDefault} alt="" className="collection-works-img" />
                </div>
                <div className="collection-item-name">{name}</div>
                <div className="collection-item-total">包含{balance}件物品</div>
                {!isOther ? (
                    <div className="collection-item-edit-btn" onClick={e => e.stopPropagation()}>
                        <Link to={`/collection/edit/${contractAddress}`}>编辑</Link>
                    </div>
                ) : null}
            </div>
        </>
    )
}