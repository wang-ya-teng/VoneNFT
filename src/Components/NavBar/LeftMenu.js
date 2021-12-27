import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Grid, Col, Menu, Dropdown } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { setWeb3, setChainId } from 'Store/actions';
import store from 'Store/index';
import { networkDefault, getWeb3List } from 'Utils/getWeb3List';
import { getInfoChain, listChainsSupport } from 'Utils/getContractAddress';
import { selectChain } from 'Connections/web3Modal';
import imgNotFound from 'Assets/notfound.png';

import './index.scss';

const { useBreakpoint } = Grid;

export default function LeftNar() {
  let history = useHistory();
  let matchRouteToken = useRouteMatch('/token/:chainID/:addressToken/:id/:sellID');
  let matchRouteCollection = useRouteMatch('/collection/index/:chainID/:addressToken');
  let matchRouteProfile = useRouteMatch('/profile/index/:address');
  const { chainId, web3, walletAddress } = useSelector((state) => state);
  const [infoChain, setInfoChain] = useState(getInfoChain(chainId)); // 选中的链类型信息

  useEffect(() => {
    if (!!chainId) {
      setInfoChain(getInfoChain(chainId));
    }
  }, [chainId]);
  // 设置默认的chainId 和web3
  useEffect(() => {
    const setWeb3Default = async () => {
      await store.dispatch(setWeb3(getWeb3List(networkDefault).web3Default));
      await store.dispatch(setChainId(networkDefault));
    };
    if (!web3 || !chainId) {
      setWeb3Default();
    }
  }, [web3, chainId]);
  // 切换链类型
  const switchNetworks = async (chainId) => {
    if (!!matchRouteToken || !!matchRouteCollection || matchRouteProfile) {
      history.push('/');
    }
    await selectChain(chainId, walletAddress);
  };

  const { md } = useBreakpoint();
  return (
    <Col span={md ? 40 : 25}>
      <Dropdown
        placement='bottomCenter'
        overlay={
          <Menu className='dropdown-select-chain'>
            <Menu.ItemGroup title='Select Network' className='textmode'>
              {listChainsSupport.map((info, i) => (
                <Menu.Item
                  key={i}
                  className='textmode'
                  onClick={() => switchNetworks(info.chainId)}
                >
                  <img className='network_icon' src={info.icon} alt={`${info.name} Icon`}></img>
                  {info.name}
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          </Menu>
        }
        trigger={['click']}
      >
        <div className='dropdown_network_header'>
          <div className='flex flex-max'>
            <img
              className='sidebar-menu-network-icon'
              alt='icon-chain'
              src={!!infoChain ? infoChain.icon : imgNotFound}
            />
            <div className='sidebar-menu-network-label textmode'>
              {!!infoChain ? infoChain.name : 'Unnamed'}
            </div>
            <CaretDownOutlined className='textmode ml-5' />
          </div>
        </div>
      </Dropdown>

      <></>
    </Col>
  );
}
