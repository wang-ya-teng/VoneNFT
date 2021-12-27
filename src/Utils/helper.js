import { getContractAddress } from 'Utils/getContractAddress';
import { getUrlSubgraph } from 'Utils/getUrlsSubgraph';
const Web3 = require('web3');
const ERC20 = require('Contracts/ERC20.json');
const axios = require('axios');

export function parseBalance(_balanceWei, _decimals) {
  if (!_balanceWei) {
    return 0;
  }
  if (!_decimals) {
    _decimals = 18;
  }
  _decimals = parseInt(_decimals);
  let afterDecimal;
  const weiString = _balanceWei.toString();
  const trailingZeros = /0+$/u;

  const beforeDecimal =
    weiString.length > _decimals ? weiString.slice(0, weiString.length - _decimals) : '0';
  afterDecimal = ('0'.repeat(_decimals) + _balanceWei).slice(-_decimals).replace(trailingZeros, '');
  if (afterDecimal === '') {
    afterDecimal = '0';
  } else if (afterDecimal.length > 3) {
    afterDecimal = afterDecimal.slice(0, 3);
  }
  return parseFloat(`${beforeDecimal}.${afterDecimal}`);
}

export function convertTimestampToDate(timestamp) {
  var months_arr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  // Convert timestamp to milliseconds
  var date = new Date(timestamp * 1000);
  // Year
  var year = date.getFullYear();
  // Month
  var month = months_arr[date.getMonth()];
  // Day
  var day = date.getDate();
  // Hours
  var hours = date.getHours();
  // Minutes
  var minutes = date.getMinutes() + 1;

  // Display date time in MM-dd-yyyy h:m:s format
  var convdataTime = `${year !== new Date().getFullYear() ? year : ''} ${month} ${day < 10 ? '0' + day : day
    }, ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes} `;

  return convdataTime;
}

export const allowance = async (tokenAddress, walletAddress, chainId) => {
  const web3 = new Web3(window.ethereum);
  const instaneErc20 = new web3.eth.Contract(ERC20.abi, tokenAddress);
  const contractAddress = getContractAddress(chainId);
  let allowance = await instaneErc20.methods
    .allowance(walletAddress, contractAddress.Market)
    .call();
  return allowance;
};

export const balanceOf = async (tokenAddress, walletAddress) => {
  const web3 = new Web3(window.ethereum);
  console.log(web3);
  let balance;
  const erc20 = new web3.eth.Contract(ERC20.abi, tokenAddress);
  balance = await erc20.methods.balanceOf(walletAddress).call();
  return balance;
};

export async function getAllOwnersOf1155(tokenAddress, tokenId, chainId, addressMarket) {
  if (!!chainId) {
    const url = getUrlSubgraph(chainId);
    if (url.url1155.length > 0) {
      const result = await axios.post(url.url1155, {
        query: `{
          tokens(where: {registry : "${tokenAddress.toLowerCase()}", identifier: "${tokenId}"}) {
            balances(where: {value_gt: 0, account_not: "${addressMarket.toLowerCase()}"}){
              account {
                id
              }
              value
              }
              totalSupply
            }
          }`,
      });

      let ownersOf1155Raw =
        !!result.data && !!result.data.data.tokens && !!result.data.data.tokens[0]
          ? result.data.data.tokens[0].balances
          : [];
      const totalSupply =
        !!result.data && !!result.data.data.tokens && !!result.data.data.tokens[0]
          ? result.data.data.tokens[0].totalSupply
          : 0;

      let ownersOf1155 = await Promise.all(
        ownersOf1155Raw.map(async (nft) => {
          return {
            owner: nft.account.id,
            value: nft.value,
            totalSupply,
          };
        })
      );

      let addressOwnersOf1155 = {};
      ownersOf1155Raw.forEach(async (nft) => (addressOwnersOf1155[nft.account.id] = nft.value));

      return { ownersOf1155, addressOwnersOf1155, totalSupply };
    }
  }
  return { ownersOf1155: [], addressOwnersOf1155: {}, totalSupply: 0 };
}

export const handleChildClick = (e) => {
  e.preventDefault();
};

export const getPrice = async (price) => {
  let countPrice;
  try {
    const res = await axios.get(
      'https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=Y4KMJASSBRWUXW3MQYG3QVVKFQFC2C1J4K'
    )
    if (res.data.result.ethusd) {
      countPrice = parseFloat(price) * parseFloat(res.data.result.ethusd);
      return countPrice.toFixed(2);
    }
  } catch (e) {
    console.log(e);
  }
}