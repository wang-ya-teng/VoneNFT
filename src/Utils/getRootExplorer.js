const rootExplorer = {
  //BSC Mainnet
  4: 'https://rinkeby.etherscan.io',
  //BSC Mainnet
  56: 'https://bscscan.com',
  //BSC Testnet
  97: 'https://testnet.bscscan.com',
  //Polygon
  137: 'https://polygonscan.com',
};

export const getRootExplorer = (_chainId) => {
  return rootExplorer[_chainId];
};
