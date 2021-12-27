import { /* Button,  message, */  Grid, Image } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import IconLoading from 'Components/IconLoading';
import helperGetNFTDetails from './helperGetNFTDetails';
import helperGetOwner1155 from './helperGetOwner1155';
import helperStatusActions721 from './helperStatusActions721';
import helperStatusActions1155Order from './DetailsNftOrder/helperStatusActions1155Order';
import helperStatusActions1155Profile from './DetailsNftProfile/helperStatusActions1155Profile';
import RenderSwitch from './RenderSwitch';
import BuySmall from 'Components/BuySmall';
import { getPrice } from 'Utils/helper';
import abiERC721 from 'Contracts/ERC721.json';
// import IconCoppy from 'Components/IconCoppy';
import { getRootExplorer } from 'Utils/getRootExplorer';
import { setAvailableSellOrder, getUser, setInfoUsers } from 'Store/actions';
import moment from 'moment';

import './index.scss';
import { selectChain } from 'Connections/web3Modal';

const { useBreakpoint } = Grid;

export default function DetailNFT() {
  // 获取NFT详情信息
  const {
    web3,
    walletAddress,
    sellOrderList,
    availableSellOrder721,
    market,
    chainId,
    nftList,
    convertErc1155Tokens,
    availableSellOrder1155,
    erc1155Tokens,
    infoCollections,
    infoUsers,
  } = useSelector((state) => state);
  const { chainID, addressToken, id, sellID } = useParams();
  const { lg } = useBreakpoint();

  const dispatch = useDispatch();
  let history = useHistory();

  const [metadata, setMetadata] = useState(null);
  const [token, setToken] = useState(null);
  const [is1155, setIs1155] = useState(false);
  const [orderDetail, setOrderDetail] = useState();
  const [status, setStatus] = useState(1);
  const [owners, setOwners] = useState([]);
  const [ownersOnSale, setOwnersOnSale] = useState([]);
  const [available, setAvailable] = useState(1);
  // const [totalSupply, setTotalSupply] = useState(1);
  const [infoOwners, setInfoOwners] = useState({});
  const [getUsd, setGetUsd] = useState(null);
  const [useStatus, setUseStatus] = useState(true);// 设置状态 用来阻止内存泄漏

  // 检查route的chainId
  useEffect(() => {
    if (parseInt(chainId) !== parseInt(chainID)) selectChain(chainID, walletAddress);
  }, [walletAddress, chainId, chainID]);

  useEffect(() => {
    const fetchSetAvailableOrdersNew = async () => {
      await dispatch(setAvailableSellOrder());
    };
    fetchSetAvailableOrdersNew();
    setTimeout(() => {
      fetchSetAvailableOrdersNew();
      fetchSetAvailableOrdersNew();
    }, 500);
  }, [dispatch]);

  // Get detail nft by TokenURI for both 721 and 1155
  useEffect(() => {
    helperGetNFTDetails(web3, nftList, addressToken, id, erc1155Tokens, setAvailable, setToken);
  }, [web3, nftList, addressToken, id, erc1155Tokens, infoCollections]);

  // Modules getOwners1155 to other file so short index file
  const getOwners1155 = useCallback(async () => {
    if (!!market) {
      helperGetOwner1155(
        convertErc1155Tokens,
        addressToken,
        id,
        chainId,
        market,
        // setTotalSupply,
        setOwners,
        setOwnersOnSale
      );
    }
  }, [convertErc1155Tokens, addressToken, id, chainId, market]);

  // Check status action sell, transfer, cancel and buy
  const statusActions = useCallback(async () => {
    if (web3 && sellOrderList && availableSellOrder721 && nftList) {
      let is1155 = await nftList.methods.isERC1155(addressToken).call();
      //  Process ERC1155
      if (is1155) {
        getOwners1155();
        setIs1155(true);
        if (Number.isInteger(parseInt(sellID)) && sellID !== 'null')
          helperStatusActions1155Order(
            availableSellOrder721,
            availableSellOrder1155,
            nftList,
            sellOrderList,
            walletAddress,
            web3,
            sellID,
            setStatus,
            setOrderDetail,
            history
          );
        else
          helperStatusActions1155Profile(
            walletAddress,
            setStatus,
            addressToken,
            id,
            chainId,
            web3,
          );
      } else {
        //  Process ERC721
        helperStatusActions721(
          addressToken,
          availableSellOrder721,
          id,
          market,
          nftList,
          sellOrderList,
          walletAddress,
          web3,
          setStatus,
          setOwners,
          setOwnersOnSale,
          setOrderDetail,
          history,
          sellID
        );
      }
    }
  }, [
    addressToken,
    availableSellOrder721,
    availableSellOrder1155,
    id,
    market,
    nftList,
    sellOrderList,
    walletAddress,
    web3,
    sellID,
    getOwners1155,
    chainId,
    history,
  ]);

  useEffect(() => {
    statusActions();
  }, [statusActions]);

  const getInfoOwners = useCallback(() => {
    let _infoUsers = infoUsers;
    owners.forEach(async (owner) => {
      let res = await dispatch(getUser(owner.owner.toLowerCase()));
      let infoUser = res.user;
      _infoUsers[owner.owner.toLowerCase()] = infoUser;
    });
    setInfoOwners(_infoUsers);
    dispatch(setInfoUsers(_infoUsers));
  }, [dispatch, infoUsers, owners]);

  const getCountPrice = useCallback(async () => {
    if (!!orderDetail) {
      let price = await web3.utils.fromWei(orderDetail.price, 'ether');
      let countPrice = await getPrice(price);
      setGetUsd(countPrice);
    }
  }, [orderDetail, web3.utils])

  useEffect(() => {
    if (!getUsd && useStatus) {
      getCountPrice();
    }
    // 阻止useEffect内存泄漏
    return () => {
      setUseStatus(false)
    }
  }, [getCountPrice, getUsd, useStatus]);

  const getMetadata = useCallback(async () => {
    if (!!addressToken && !!id) {
      const nft = new web3.eth.Contract(abiERC721.abi, addressToken);
      let tokenUri = await nft.methods.tokenURI(id).call();
      setMetadata(tokenUri);
    }
  }, [web3, addressToken, id]);

  useEffect(() => {
    getInfoOwners();
    getMetadata();
  }, [getInfoOwners, getMetadata]);

  return (
    <div style={{ width: '100%', background: '#f7f8fb' }}>
      <div className='detail-page center'>
        <div className='body-page'>
          {!!token ? (
            <div className='detail-main'>
              {lg ? (
                <div className='info-wrap-left'>
                  <div className='expand-img-nft'>
                    <div className='image-label center'>
                      <Image alt='img-nft' src={token.image} />
                    </div>
                  </div>

                  <div className='description-nft'>
                    <div className='content-properties'>
                      <div className='title-tab-properties'>
                        <h3 className='nft-h3'>简介</h3>
                      </div>

                      <div className='detail-des textmode'>
                        {token.description}
                      </div>
                    </div>
                  </div>

                  <div className='properties-nft'>
                    <div className='content-properties'>
                      <div className='title-tab-properties'>
                        <h3 className='nft-h3'>属性</h3>
                      </div>
                      <div className='list-properties'>
                        <div className='items-properties'>
                          {!!token.attributes
                            ? token.attributes.map((attr, i) => (
                              <div className='item-properties' key={i}>
                                <div className='name-properties'>{attr.trait_type}</div>
                                <div className='value-properties textmode'>
                                  {!!attr.display_type &&
                                    attr.display_type.toLowerCase() === 'date' &&
                                    !!moment(attr.value).isValid()
                                    ? moment(
                                      attr.value.toString().length < 13
                                        ? attr.value * 1000
                                        : attr.value
                                    ).format('DD-MM-YYYY')
                                    : attr.value}
                                </div>
                              </div>
                            ))
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className='info-wrap-right'>
                <div className='info-order-nft'>
                  <div className='detail-title'>
                    <h1>{token.name}</h1>
                  </div>
                  {sellID !== 'null' ? (<div className='show-price'>
                    <div>{!!orderDetail ? `${web3.utils.fromWei(orderDetail.price, 'ether') + ' BNB'}` : ''}</div>
                    <div className='price'>{!!orderDetail ? `≈$ ${getUsd}` : ''}</div>
                  </div>) : null}
                  <div className='collections-nft'>
                    <div>
                      <div className="textBlack">作者<span style={{ color: 'rgba(0,0,0,0.30)' }}>（10% 版税）</span></div>
                      <Link to={`/collection/${chainId}/${addressToken.toLowerCase()}`}>
                        {token.nameCollection}
                      </Link>
                    </div>
                    <div style={{ margin: '0 45px' }}>
                      <div className="textBlack">作品集</div>
                      {/*todo walletAddress应该为作者钱包地址 */}
                      <Link to={`/collection/detail/${addressToken.toLowerCase()}/${walletAddress}`}>
                        {token.nameCollection}
                      </Link>
                    </div>
                    <div>
                      <div className="textBlack">持有者</div>
                      {owners.map((owner, index) => (
                        <div key={index} className='avatar-link-available'>
                          <div className='link-and-available'>
                            <Link
                              to={`/profile/index/${chainId}/${owner.owner.toLowerCase()}`}
                              className='owner'
                            >
                              {!!infoOwners[owner.owner.toLowerCase()] &&
                                infoOwners[owner.owner.toLowerCase()].username !== 'Unnamed' ? (
                                <strong>@{infoOwners[owner.owner.toLowerCase()].username}</strong>
                              ) : (
                                <strong>
                                  {`${owner.owner.slice(0, 8)}...${owner.owner.slice(
                                    owner.owner.length - 6,
                                    owner.owner.length
                                  )}`}
                                </strong>
                              )}
                            </Link>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='purchase-nft'>
                  <h3 className="nft-h3">出售列表</h3>
                  <div>
                    <div className='order-title'>
                      <span className='width100'>单价</span><span className='width100'>数量</span><span className='width100'>卖家</span>
                    </div>
                    <div className='order-List'>
                      <span className='width100'>
                        {!!orderDetail && sellID !== 'null' ? (
                          <div className='title-and-price'>
                            <span className='price-eth color-black'>
                              {web3.utils.fromWei(orderDetail.price, 'ether')}{' BNB'}
                            </span>
                          </div>
                        ) : (
                          <>--</>
                        )}
                      </span>
                      <span className='width100'>{!!orderDetail && sellID !== 'null' ? (
                        <div className='color-black'>
                          {!!ownersOnSale ? ownersOnSale[0].value : 1}
                        </div>
                      ) : (
                        <>--</>
                      )}</span>
                      <span className='width100'>{!!orderDetail && sellID !== 'null' ? (
                        <div>
                          <Link
                            to={`/profile/${chainId}/${orderDetail.seller.toLowerCase()}`}
                            className='owner'
                          >
                            <strong style={{ color: '#6080B4', fontWeight: '400' }}>
                              {`${orderDetail.seller.slice(0, 8)}...${orderDetail.seller.slice(
                                orderDetail.seller.length - 6,
                                orderDetail.seller.length
                              )}`}
                            </strong>
                          </Link>

                        </div>
                      ) : (
                        <>--</>
                      )}</span>
                      <span className='width100' style={{ textAlign: 'end' }}>
                        {!walletAddress ||
                          (!!walletAddress && orderDetail && sellID !== 'null' &&
                            orderDetail.seller.toLowerCase() !== walletAddress.toLowerCase()) ? (
                          <BuySmall
                            token={token}
                            orderDetail={orderDetail}
                            is1155={is1155}
                            id={id}
                            addressToken={addressToken}
                            getOwners1155={getOwners1155}
                            setOrderDetail={setOrderDetail}
                          />
                        ) : null}
                      </span>
                    </div>
                  </div>
                  <div className='style-purchase'>
                    <div className='actions-nft'>
                      <RenderSwitch
                        status={status}
                        token={token}
                        orderDetail={orderDetail}
                        is1155={is1155}
                        available={available}
                        web3={web3}
                        addressToken={addressToken}
                        id={id}
                        chainId={chainId}
                        sellID={sellID}
                      />
                    </div>
                  </div>
                </div>

                <div className='nft-details'>
                  <h3 className="nft-h3">详情</h3>
                  <div className='flex-between mb15'>
                    <div className='color-black'>合约地址</div>
                    <div>
                      <a
                        href={`${getRootExplorer(chainId)}/address/${addressToken}`}
                        target='_blank'
                        rel='noreferrer'
                        className='href-to-address-contract'
                      >
                        {lg
                          ? addressToken
                          : `${addressToken.slice(0, 8)}...${addressToken.slice(
                            addressToken.length - 6,
                            addressToken.length
                          )}`}
                      </a>
                    </div>
                  </div>
                  <div className='flex-between mb15'>
                    <div className='color-black'>Token ID</div>
                    <div className='color-black'>{id}</div>
                  </div>
                  <div className='flex-between mb15'>
                    <div className='color-black'>NFT标准</div>
                    <div className='color-black'>ERC-721</div>
                  </div>
                  <div className='flex-between'>
                    <div className='color-black'>元数据</div>
                    <div className='href-to-address-contract'>
                      <a
                        href={metadata}
                        target='_blank'
                        rel='noreferrer'
                        className='href-to-address-contract'
                      >
                        IPFS
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='center' style={{ width: '100%', minHeight: '200px' }}>
              <IconLoading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
