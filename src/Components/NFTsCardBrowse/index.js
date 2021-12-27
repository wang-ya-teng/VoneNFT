import { Card, Tooltip, Button, Row, Col } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import imgNotFound from 'Assets/notfound.png';
import sampleAbiERC1155 from 'Contracts/SampleERC1155.json';
import abiERC721 from 'Contracts/ERC721.json';
import { getCollection } from 'Store/actions';
import store from 'Store/index';

import erc1155 from 'Assets/erc1155.png'
import erc721 from 'Assets/erc721.png'

import './index.scss';
import 'Assets/css/common-card-nft.scss';
import { BottomScrollListener } from 'react-bottom-scroll-listener';

function NFTsCard({ token, strSearch }) {
  const { web3, chainId } = useSelector((state) => state);
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
            image: !!data.image ? data.image : imgNotFound,
            seller: !!token ? token.seller : 'Unnamed'
          });
        } catch (error) {
          setDetailNFT({ name: 'Unnamed', description: '', image: imgNotFound, seller: 'Unnamed' });
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
  }, [token, web3, status]);
  const toPage = (url) => {
    router.push(url)
  }

  const _strSearch = strSearch.toLowerCase();
  const visible =
    !!detailNFT &&
    !!detailNFT.name &&
    (detailNFT.name.toLocaleLowerCase().includes(_strSearch) ||
      token.nameCollection.toLocaleLowerCase().includes(_strSearch));

  return detailNFT !== null ? (
    <>
      {!visible ? null : (
        <Col
          className='gutter-row'
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 8 }}
          lg={{ span: 8 }}
          xl={{ span: 6 }}
          xxl={{ span: 6 }}
        >
          <div onClick={() => { toPage(`/token/${chainId}/${token.addressToken}/${token.index}/${token.sellId}`) }} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              hoverable
              cover={
                <div className='wrap-cover'>
                  <div className='creater'>
                    {!!detailNFT && detailNFT.seller.slice(0, 8) + '...' + detailNFT.seller.slice(detailNFT.seller.length - 6, detailNFT.length)}
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
              <div justify='space-between'>
                <div className='footer-card-left'>
                  <div className='name-nft textmode'>{detailNFT.name}</div>
                  <div className='name-nft textmode' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{web3.utils.fromWei(token.price, 'ether')}</span>{' '}
                      <span>{!!chainId === 4 ? 'ETH' : 'BNB'}</span>
                    </div>
                    <div className="production-standard">
                      <Tooltip title={standard === '1155' ? 'ERC1155' : 'ERC721'} color='#6080b4'>
                        <Button className="production-button">
                          <img src={standard === '1155' ? erc1155 : erc721} alt="" width="24px" />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      )}
    </>
  ) : (
    <Col
      className='gutter-row'
      xs={{ span: 24 }}
      sm={{ span: 12 }}
      md={{ span: 8 }}
      lg={{ span: 8 }}
      xl={{ span: 6 }}
      xxl={{ span: 6 }}
    >
      <Card
        className='card-nft card-nft-content-loader'
        cover={
          <div className='wrap-cover' style={{ padding: '0.4rem' }}>
            <div className='name-nft' style={{ marginBottom: '5px' }}>&nbsp;</div>
            <div className='NFTResource-Wrapper' style={{ padding: '0' }}>
              <img
                className='display-resource-nft'
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
                alt=''
              />
            </div>
          </div>
        }
      >
        <div justify='space-between'>
          <div className='footer-card-left'>
            <div className='name-collection'>&nbsp;</div>
            <div className='name-nft'>&nbsp;</div>
          </div>
        </div>
      </Card>
    </Col>
  );
}

export default function NFTsCardBrowse({
  tokens,
  typeSort,
  filterCountCallback,
  strSearchInCollection,
}) {
  const { strSearch, web3 } = useSelector((state) => state);
  const [afterFilter, setAfterFilter] = useState(!!tokens ? tokens : []);
  const [cardsPaginated, setCardsPaginated] = useState({ cards: [], indexEnd: 0 });

  useEffect(() => {
    filterCountCallback(afterFilter.length);
  }, [afterFilter.length, filterCountCallback]);

  const sortOrders = useCallback(async () => {
    var BN = web3.utils.BN;
    switch (typeSort) {
      case 'recentlyListed':
        setAfterFilter(
          tokens.sort((a, b) => a.sortIndex < b.sortIndex ? 1 : a.sortIndex > b.sortIndex ? -1 : 0)
        );
        break;
      case 'priceAsc':
        setAfterFilter(
          tokens.sort((a, b) =>
            !new BN(a.price).gt(new BN(b.price)) ? 1 : new BN(a.price).gt(new BN(b.price)) ? -1 : 0
          )
        );
        break;
      case 'priceDesc':
        setAfterFilter(
          tokens.sort((a, b) =>
            new BN(a.price).gt(new BN(b.price)) ? 1 : !new BN(a.price).gt(new BN(b.price)) ? -1 : 0
          )
        );
        break;
      default:
        break;
    }
  }, [tokens, typeSort, web3]);

  const setPaginationDefault = useCallback(async () => {
    setCardsPaginated({
      cards: afterFilter.slice(0, 12),
      indexEnd: afterFilter.slice(0, 12).length > 0 ? afterFilter.slice(0, 12).length - 1 : 0,
    });
  }, [afterFilter]);

  useEffect(() => {
    if (tokens) {
      sortOrders();
      setPaginationDefault();
    }
  }, [tokens, sortOrders, setPaginationDefault]);

  useEffect(() => {
    if (afterFilter.length > 0) setPaginationDefault();
  }, [setPaginationDefault, afterFilter]);

  const paginationCards = useCallback(
    async (e) => {
      let { indexEnd } = cardsPaginated;
      setCardsPaginated({
        cards: afterFilter.slice(0, indexEnd + 12),
        indexEnd:
          afterFilter.slice(0, indexEnd + 12).length > 0
            ? afterFilter.slice(0, indexEnd + 12).length - 1
            : 0,
      });
    },
    [afterFilter, cardsPaginated]
  );

  return (
    <div className='explore-nft content-list-nft' style={{ maxWidth: '1125px', width: '100%' }}>
      <Row justify='start' gutter={[0, 20]} id='row-cards'>
        <BottomScrollListener onBottom={paginationCards} offset={300}>
          {!!cardsPaginated.cards ? (
            cardsPaginated.cards.map((token, index) => (
              <NFTsCard
                key={token.sellId}
                token={token}
                strSearch={!!strSearchInCollection ? strSearchInCollection : strSearch}
              />
            ))
          ) : (
            <></>
          )}
        </BottomScrollListener>
      </Row>
    </div>
  );
}
