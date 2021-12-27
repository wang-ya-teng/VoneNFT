import eth from 'Assets/icons/eth.png';
import bnb from 'Assets/icons/binance-smart-chain-icon.png';
import bscTag from 'Assets/logo/bsc.png';

const contractAddress = {
  //Rinkeby
  4: {
    AddressesProvider: '0x67E3aEC73ca5128BF7e82D09d642d9d9f2236685',
    CreativeStudio: '0xfcAf84199DFbF1f66CA7D07d57B512048D58AC6F',
    ExchangeOrderList: '0xfD49D4eF3bB6d01c25ef08B691Ee0EB53Ec27F7D',
    Market: '0xe9C52AB39eC14046bc6BE8cFad34F2f26e7BF9Cd',
    NftList: '0xB20A05E93ECd87C51b702e176A0c441b59422230',
    SellOrderList: '0xa4F90dfcDbf90e04BafDe30a9718c135604FB262',
    Vault: '0x0543C57361efa2dEA496b937d7654F770D6281df',
    DidiERC721NFT: '0x8538498c69DAB74B1Bb64B788526Df2dEe3D453E',
    DidiERC1155NFT: '0xa7852F76C9170B514586c9E9431A358baDA3486b'
  },
  //BSC Testnet
  97: {
    AddressesProvider: '0xe0eA5Df111f885c342443de620a765Df386B41f8',
    CreativeStudio: '0x52582cbCF53C9037Cb895E54D0d79D5CC6e3F4EA',
    ExchangeOrderList: '0xF5B4871c65FBE4271C7134DF515E59dD5AC0b371',
    Market: '0x6B055f2E3a0a689039A3f2002e21387A6Ca25fdb',
    NftList: '0x35E233042080d602c76Ad33b047d5854C3d306a1',
    SellOrderList: '0x41073997CC394BB03D5b478B152512754bB6bb3e',
    Vault: '0xFe55D0944DE065BaAcc07310f9efc51e2dD6705F',
    DidiERC721NFT: '0xf069D480589895e63669581de964Cd1f64527fAD',
    DidiERC1155NFT: '0xC494fC2F216De8446E20617b9dC4aea763881CdB',
  }
};

// const tokensPayment = {
//   //BSC Testnet
//   97: [
//     // { address: '0x777d20e16C6Bc508d5989e81a6c9B5034a32C6DD', icon: moma, symbol: 'MOMA' },
//     { address: '0x0000000000000000000000000000000000000000', icon: bnb, symbol: 'BNB' },
//   ],
//   // RINKEBY
//   4: [
//     // { address: '0x777d20e16C6Bc508d5989e81a6c9B5034a32C6DD', icon: moma, symbol: 'MOMA' },
//     { address: '0x0000000000000000000000000000000000000000', icon: eth, symbol: 'ETH' },
//   ]
// };

// const symbolToken = {
//   //BSC Testnet
//   97: {
//     '0x777d20e16C6Bc508d5989e81a6c9B5034a32C6DD': 'MOMA',
//     '0x0000000000000000000000000000000000000000': 'BNB',
//   },
//   // RINKEBY
//   4: {
//     '0x777d20e16C6Bc508d5989e81a6c9B5034a32C6DD': 'MOMA',
//     '0x0000000000000000000000000000000000000000': 'ETH',
//   }
// };

const infoChains = {
  4: { name: 'Rinkeby', icon: eth },
  97: { name: 'BSC-Testnet', icon: bnb }
};

export const listChainsSupport = [
  { chainId: 4, name: 'Rinkeby', icon: eth /*RINKEBY*/ },
  { chainId: 97, name: 'BSC-Testnet', icon: bnb /*BSC Testnet*/ }
];

const logoChainsTags = {
  4: { name: 'Rinkeby', logo: eth },
  97: { name: 'BSC-Testnet', logo: bscTag }
};

export const getContractAddress = (_chainId) => {
  return contractAddress[_chainId];
};
// export const getTokensPayment = (_chainId) => {
//   return tokensPayment[_chainId];
// };
// export const getSymbol = (_chainId) => {
//   return symbolToken[_chainId];
// };
export const getInfoChain = (_chainId) => {
  return infoChains[_chainId];
};
export const getLogoChainsTags = (_chainId) => {
  return logoChainsTags[_chainId];
};
