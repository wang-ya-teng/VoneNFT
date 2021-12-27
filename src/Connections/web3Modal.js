import Web3 from 'web3';
import Web3Modal from 'web3modal';
// import WalletConnectProvider from '@walletconnect/web3-provider';
import {
    setChainId,
    setWeb3,
    setAddress,
    setAcceptedNfts,
    setBalance,
    setUnmatchedModal
} from 'Store/actions';
import store from 'Store/index';
import { getWeb3List } from 'Utils/getWeb3List';

export const CONNECTID = 'WEB3_CONNECT_CACHED_PROVIDER';

// 平台支持的链类型RPC
const rpcSupport = {
    4: 'https://rinkeby.infura.io/v3/2457d7b074194e61a49947a293acf117',
    97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
};
const providerOptions = {
    walletconnect: {
        // package: WalletConnectProvider, // web3modal自带的登录弹框
        options: {
            rpc: rpcSupport,
        },
    },
};
// 平台支持链的配置参数 切换链类型时用
const paramsSwitchNetwork = {
    4: [
        {
            chainId: '0x4',
            chainName: 'Rinkeby',
            nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
            },
            rpcUrls: ['https://rinkeby.infura.io/v3/2457d7b074194e61a49947a293acf117/'],
            blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
        },
    ],
    97: [
        {
            chainId: '0x61',
            chainName: 'BSC-Testnet',
            nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
            },
            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
            blockExplorerUrls: ['https://testnet.bscscan.com/'],
        },
    ]
};
// 选择链类型
export const selectChain = async (chainId, walletAddress) => {
    if (!!rpcSupport[chainId]) {
        if (!!walletAddress) {
            injectNetworkNoEthereum(chainId);
        } else {
            await store.dispatch(setWeb3(getWeb3List(chainId).web3Default));
        }
    }
};

// Switch for chains is not ETH
export const injectNetworkNoEthereum = async (chainId) => {
    //wallet_switchEthereumChain：在以太坊的生态系统中切换链的方法,wallet_addEthereumChain:切换非以太坊链的方法
    await window.ethereum?.request({
        method: chainId === 4 ? 'wallet_switchEthereumChain' : 'wallet_addEthereumChain',
        params: chainId === 4 ? [
            {
                chainId: '0x4',
            },
        ] : paramsSwitchNetwork[chainId],
    });
};

// 在以太坊的生态系统中切换链
export const injectNetworkEthereum = async (chainId, web3) => {
    await window.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [
            {
                chainId: web3.utils.numberToHex(chainId),
            },
        ],
    });
};

const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
});
// 断开钱包连接
export const disconnectWeb3Modal = async () => {
    localStorage.removeItem(CONNECTID);
    localStorage.removeItem('chainId');
    web3Modal.clearCachedProvider();
};
// 连接钱包
export const connectWeb3Modal = async () => {
    const { chainId } = store.getState();
    if (!!chainId) {
        injectNetworkNoEthereum(chainId);
    }

    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);

    let chainID = await web3.eth.net.getId();
    if (!!rpcSupport[chainID]) {
        let accounts = await web3.eth.getAccounts();
        store.dispatch(setChainId(chainID));
        store.dispatch(setWeb3(web3));
        store.dispatch(setBalance(accounts[0]));
        store.dispatch(setUnmatchedModal(false));
        if (accounts.length > 0) {
            store.dispatch(setAddress(accounts[0]));
            // Init ERC721
            store.dispatch(setAcceptedNfts());
            // 设置登录状态
            localStorage.isLogin = true;
            localStorage.chainId = !!chainID ? chainID : 97;
        }
    } else {
        store.dispatch(setUnmatchedModal(true));// 打开链类型不匹配弹框
        localStorage.removeItem(CONNECTID);
        localStorage.removeItem('chainId');
        localStorage.isLogin = false;
    }

    // 监听账户切换
    provider.on('accountsChanged', async (accounts) => {
        if (accounts.length > 0) {
            store.dispatch(setAddress(accounts[0]));
            store.dispatch(setAcceptedNfts());
            store.dispatch(setBalance(accounts[0]));
        } else {
            window.location.href = '/login'
        }
    });

    // 监听链类型切换
    provider.on('chainChanged', async (chainID) => {
        chainID = parseInt(web3.utils.hexToNumber(chainID));
        if (!!rpcSupport[chainID]) {
            let accounts = await web3.eth.getAccounts();
            store.dispatch(setChainId(chainID));
            store.dispatch(setAcceptedNfts());
            store.dispatch(setWeb3(web3));
            store.dispatch(setAddress(accounts[0]));
            store.dispatch(setBalance(accounts[0]));
            localStorage.isLogin = true
            localStorage.chainId = chainID
            store.dispatch(setUnmatchedModal(false));
        } else {
            store.dispatch(setUnmatchedModal(true));// 打开链类型不匹配弹框
        }
    });

    // Subscribe to provider connection
    // provider.on('connect', (info) => {
    //     console.log(info);
    // });

    // Subscribe to provider disconnection 切换链类型走到这里
    // provider.on('disconnect', (error) => {
    //     console.log(error);
    // });
};
