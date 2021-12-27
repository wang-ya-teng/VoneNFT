import { Layout, Select } from 'antd';
import { useEffect, useState } from 'react';
import NFTsCardBrowse from 'Components/NFTsCardBrowse';
import IconLoading from 'Components/IconLoading';
import './index.scss';

const { Content } = Layout;
const { Option } = Select;

export default function NFTsFilterBrowse({ collectionsNFT, isLoadingErc721 }) {
  const [selectedTokens, setSelectedTokens] = useState({});
  const [strSearch, setStrSearch] = useState(null);
  const [typeSort, setTypeSort] = useState('recentlyListed');
  const [allOrders, setAllOrders] = useState([]);
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    if (!!collectionsNFT) {
      setAllOrders(
        collectionsNFT
          ? [].concat(
            ...collectionsNFT.map((collections) => collections.tokens.map((token) => token))
          )
          : []
      );
    }
  }, [collectionsNFT, setAllOrders]);

  const _setFilterCount = (count) => {
    setFilterCount(count);
  };

  const nftList = [].concat(collectionsNFT.map((item) => {
    let nft = {};
    for (let i = 0; i < collectionsNFT.length; i++) {
      nft.value = item.name;
      nft.tokens = item.tokens;
    }
    return nft;
  }));

  const onChange = (value, option) => {
    setStrSearch([value])
    setSelectedTokens(option);
  }

  const Complete = () => (
    <Select
      showSearch
      placeholder="搜索作品集"
      optionFilterProp="children"
      allowClear={true}
      onChange={onChange}
      style={{
        width: '220px'
      }}
      value={strSearch}
      options={nftList}
      filterOption={(input, option) =>
        option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
    </Select>
  );

  return (
    <>
      <Layout style={{ minHeight: '100%' }}>
        <Layout style={{ padding: '1rem' }} className='nfts-filter-browse-container background-mode'>
          <Content
            className='site-layout-background'
            style={{
              padding: 6,
              margin: 0,
              minHeight: 280,
            }}
          >
            {/* because isLoadingERC721 will false before start loading so isLoadingErc721 = null may be best option */}
            {isLoadingErc721 || isLoadingErc721 === null ? (
              <div className='center' style={{ width: '100%', height: '100%' }}>
                <IconLoading />
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className='sort-results'>
                    <div className='left-sort-results'>
                      <span className='textmode'>
                        共有<span className='filterCount'>{`${filterCount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>个物品
                      </span>
                    </div>
                    <div className='right-sort-results'>
                      <span>作品集：</span>
                      <Complete />
                      <span className='mgl40'>排序：</span>
                      <Select
                        value={typeSort}
                        className='textmode select-sort'
                        style={{ fontSize: '14px' }}
                        size='large'
                        onChange={(value) => setTypeSort(value)}
                      >
                        <Option value='recentlyListed'>最新上架</Option>
                        <Option value='priceAsc'>价格从高到低</Option>
                        <Option value='priceDesc'>价格从低到高</Option>
                      </Select>
                    </div>
                  </div>
                  {!!selectedTokens && !!selectedTokens.tokens ? (
                    <NFTsCardBrowse
                      tokens={selectedTokens.tokens}
                      typeSort={typeSort}
                      filterCountCallback={_setFilterCount}
                    />
                  ) : (
                    <NFTsCardBrowse
                      tokens={allOrders}
                      typeSort={typeSort}
                      filterCountCallback={_setFilterCount}
                    />
                  )}
                </div>
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
