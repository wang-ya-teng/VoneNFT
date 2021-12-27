import { Card, Row, Col, Skeleton, Empty, Tooltip, Button } from 'antd';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, } from 'react-redux';
import axios from 'axios';
import imgNotFound from 'Assets/notfound.png';
import sampleAbiERC1155 from 'Contracts/SampleERC1155.json';
import abiERC721 from 'Contracts/ERC721.json';
import '../NFTsCardBrowse/index.scss';
import 'Assets/css/common-card-nft.scss';
import { getCollection } from 'Store/actions';
import store from 'Store/index';
import empty from 'Assets/icons/empty.svg';

import erc1155 from 'Assets/erc1155.png'
import erc721 from 'Assets/erc721.png'

function NFTsCardProfile({ token, strSearch, onSale }) {
  const { address } = useParams();
  const { web3, chainId, infoCollections } = useSelector((state) => state);
  const [detailNFT, setDetailNFT] = useState(null);
  const [status, setStatus] = useState(true);// 设置状态 用来阻止内存泄漏
  const standard = '721';
  const router = useHistory()
  useEffect(() => {
    async function fetchDetail() {
      if (!!token && status) {
        try {
          let tokenURI;
          if (token.is1155) {
            const nft = new web3.eth.Contract(sampleAbiERC1155.abi, token.addressToken);
            tokenURI = await nft.methods.uri(token.index).call();
          } else {
            const nft = new web3.eth.Contract(abiERC721.abi, token.addressToken);
            tokenURI = await nft.methods.tokenURI(token.index).call();
          }
          let req = await axios.get(tokenURI);
          const data = req.data;

          token.attributes = !!data.attributes ? data.attributes : null;

          setDetailNFT({
            name: !!data.name ? data.name : 'Unnamed',
            description: !!data.description ? data.description : '',
            image: !!data.image ? data.image : imgNotFound
          });
        } catch (error) {
          setDetailNFT({ name: 'Unnamed', description: '', image: imgNotFound });
        }
        token.nameCollection = (
          await store.dispatch(getCollection(token.addressToken, null))
        ).collection.name;
      } else {
        setDetailNFT({ name: '', description: '', image: imgNotFound });
      }
    }
    fetchDetail();
    // 阻止useEffect内存泄漏
    return () => {
      setStatus(false)
    }
  }, [token, web3, chainId, infoCollections, status]);
  const toPage = (url) => {
    router.push(url)
  }

  return !!detailNFT &&
    !!detailNFT.name &&
    (detailNFT.name.toLocaleLowerCase().includes(strSearch.toLowerCase()) ||
      token.nameCollection.toLocaleLowerCase().includes(strSearch.toLowerCase())) ? (
    <Col
      className='gutter-row'
      span={6}
    >
      {!!detailNFT ? (
        <div onClick={() => {
          toPage(`/token/${chainId}/${token.addressToken}/${token.index}/${!!token.sellId ? token.sellId : null
            }`)
        }}>
          <Card
            hoverable
            cover={
              <div className='wrap-cover'>
                <div className='creater'>
                  {!!address && address.slice(0, 8) + '...' + address.slice(address.length - 6, address.length)}
                </div>
                <div className='NFTResource-Wrapper'>
                  <img
                    alt={`img-nft-${token.index}`}
                    src={detailNFT.image}
                    className='display-resource-nft'
                  />
                </div>
              </div>
            }
            className='card-nft'
          >
            {!!token.price ? (
              <div className='price-nft textmode'>
                <span>{web3.utils.fromWei(token.price, 'ether')}</span><span style={{ fontSize: '13px' }}>{chainId === '4' ? 'ETH' : 'BNB'}</span>
              </div>
            ) : (
              <></>
            )}
            <Row justify='space-between'>
              <Col className={`footer-card-left ${!token.is1155 ? 'fill-width' : ''}`}>
                <div onClick={e => e.stopPropagation()}>
                  <Link
                    to={`/collection/detail/${token.addressToken}/${address}`}
                    className='link-collection-name'
                    tag='span'
                  >
                    {token.nameCollection}
                  </Link>
                </div>
                <div className='name-nft textmode' style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className='name-nft textmode'>{detailNFT.name}</div>
                  <div className="production-standard">
                    <Tooltip title={standard === '1155' ? 'ERC1155' : 'ERC721'} color='#6080b4'>
                      <Button className="production-button">
                        <img src={standard === '1155' ? erc1155 : erc721} alt="" width="24px" />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </Col>
              {!!token.is1155 && !onSale ? (
                <Col className='footer-card-right text-right price-nft'>
                  <div className='title-price'>Available</div>
                  <div className=''>
                    {!!token.soldAmount
                      ? parseInt(token.value) - parseInt(token.soldAmount)
                      : token.value}{' '}
                    <span className=''>of</span> {token.totalSupply}{' '}
                  </div>
                </Col>
              ) : (
                <></>
              )}
            </Row>
          </Card>
        </div>
      ) : (
        <Skeleton active round title='123' />
      )}
    </Col>
  ) : null;
}

export default function ERC721({ tokens, onSale }) {
  const [afterFilter, setafterFilter] = useState(!!tokens ? tokens : []);
  const { strSearch } = useSelector((state) => state);

  useEffect(() => {
    if (tokens) setafterFilter(() => tokens);
  }, [tokens]);

  return (
    <div className='explore-nft content-list-nft' style={{ width: '100%', maxWidth: '1125px' }}>
      <Row justify={afterFilter.length > 0 ? 'start' : 'center'} gutter={[20, 24]}>
        {afterFilter.length > 0 ? (
          afterFilter.map((token, index) => (
            <NFTsCardProfile key={index} token={token} strSearch={strSearch} onSale={onSale} />
          ))
        ) : (
          <Empty
            image={empty}
            imageStyle={{
              height: 86,
              width: 86,
            }}
            description={<span className='textmode'>No Data</span>}
          ></Empty>
        )}
      </Row>
    </div>
  );
}
