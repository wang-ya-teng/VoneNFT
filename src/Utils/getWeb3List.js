import Web3 from 'web3';

export const web3Default = {
    97: {
        web3Default: new Web3(
            new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/')
        ),
        name: 'BSC Testnet',
        explorer: 'https://testnet.bscscan.com/tx/',
    },
    4: {
        web3Default: new Web3(
            new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/2457d7b074194e61a49947a293acf117')
        ),
        name: 'Rinkeby',
        explorer: 'https://rinkeby.etherscan.io/tx/',
    },
};

export const networkDefault = !!localStorage.getItem('chainId')
    ? parseInt(localStorage.getItem('chainId'))
    : 97;

export const getWeb3List = (_chainId) => {
    return web3Default[_chainId];
};
