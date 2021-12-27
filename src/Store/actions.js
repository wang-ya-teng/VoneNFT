import {
  parseBalance
} from 'Utils/helper';
import ERC721 from 'Contracts/ERC721.json';
import ERC1155 from 'Contracts/ERC1155.json';
import SampleERC721 from 'Contracts/SampleERC721.json';
import SampleERC1155 from 'Contracts/SampleERC1155.json';
import DidiERC721NFT from 'Contracts/DidiERC721NFT.json';
import DidiERC1155NFT from 'Contracts/DidiERC1155NFT.json';
import AddressesProvider from 'Contracts/AddressesProvider.json';
import Market from 'Contracts/Market.json';
import NFTList from 'Contracts/NFTList.json';
import SellOrderList from 'Contracts/SellOrderList.json';
import Vault from 'Contracts/Vault.json';
import CreativeStudio from 'Contracts/CreativeStudio.json';
import ERC20 from 'Contracts/ERC20.json';
import axios from 'axios';
import { getContractAddress } from 'Utils/getContractAddress';
import { getWeb3List } from 'Utils/getWeb3List';
import logoCollectionDefault from 'Assets/logo-mochi.png';
import avatarDefault from 'Assets/avatar-profile.png';

var contractAddress;
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
const VALUE_MAX = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

////////////////////
// Common
////////////////////

export const SET_WEB3 = 'SET_WEB3';
export const setWeb3 = (web3) => async (dispatch, getState) => {
  dispatch({ type: SET_WEB3, web3 });

  let chainId = getState().chainId ? getState().chainId : await web3.eth.net.getId();
  contractAddress = getContractAddress(chainId);

  const addressesProvider = new web3.eth.Contract(
    AddressesProvider.abi,
    contractAddress.AddressesProvider
  );
  const market = new web3.eth.Contract(Market.abi, contractAddress.Market);
  const nftList = new web3.eth.Contract(NFTList.abi, contractAddress.NftList);
  const sellOrderList = new web3.eth.Contract(SellOrderList.abi, contractAddress.SellOrderList);
  const vault = new web3.eth.Contract(Vault.abi, contractAddress.Vault);
  const creativeStudio = new web3.eth.Contract(CreativeStudio.abi, contractAddress.CreativeStudio);

  dispatch(setAddressesProvider(addressesProvider));
  dispatch(setMarket(market));
  dispatch(setNftList(nftList));
  // dispatch(setAcceptedNftsUser());
  dispatch(setSellOrderList(sellOrderList));
  dispatch(setVault(vault));
  dispatch(setCreativeStudio(creativeStudio));
  dispatch(setAdminAddress(addressesProvider));

  dispatch(setAvailableSellOrder());
};

export const LOGOUT = 'LOGOUT';
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const SET_CHAINID = 'SET_CHAINID';
export const setChainId = (chainId) => (dispatch) => {
  dispatch({ type: SET_CHAINID, chainId });
};

export const SET_ADMIN_ADDRESS = 'SET_ADMIN_ADDRESS';
export const setAdminAddress = (addressesProvider) => async (dispatch) => {
  let adminAddress = await addressesProvider.methods.getAdmin().call();
  dispatch({
    type: SET_ADMIN_ADDRESS,
    adminAddress,
  });
};

export const SET_ADDRESS = 'SET_ADDRESS';
export const setAddress = (walletAddress) => async (dispatch) => {
  walletAddress = walletAddress?.toLowerCase()
  if (walletAddress) {
    var shortAddress = `${walletAddress?.slice(0, 6)}...${walletAddress?.slice(
      walletAddress?.length - 4,
      walletAddress?.length
    )}`;

    let infoUserLogin = (await dispatch(getUser(walletAddress))).user;

    dispatch({
      type: SET_ADDRESS,
      walletAddress,
      shortAddress,
    });

    dispatch({
      type: SET_INFO_USER_LOGIN,
      infoUserLogin,
    });
    dispatch(setBalance());

    dispatch(setCollectionByUser());
  }
};

export const SET_BALANCE = 'SET_BALANCE';
export const setBalance = (walletAddress) => async (dispatch, getState) => {
  let { web3 } = getState();
  let balance;
  if (!!walletAddress) {
    balance = await web3.eth.getBalance(walletAddress);
    if (!!balance) {
      balance = parseBalance(balance.toString(), 18);
      dispatch({
        type: SET_BALANCE,
        balance,
      });
    }
  }
};

export const SET_STR_SEARCH = 'SET_STR_SEARCH';
export const setStrSearch = (strSearch) => (dispatch) => {
  dispatch({ type: SET_STR_SEARCH, strSearch });
};

export const SET_INFO_COLLECTIONS = 'SET_INFO_COLLECTIONS';
export const setInfoCollections = (infoCollections) => (dispatch) => {
  dispatch({ type: SET_INFO_COLLECTIONS, infoCollections });
};

export const SET_INFO_USERS = 'SET_INFO_USERS';
export const setInfoUsers = (infoUsers) => (dispatch) => {
  dispatch({ type: SET_INFO_USERS, infoUsers });
};

export const SET_INFO_USER_LOGIN = 'SET_INFO_USER_LOGIN';
export const setInfoUserLogin = (infoUserLogin) => (dispatch) => {
  dispatch({ type: SET_INFO_USER_LOGIN, infoUserLogin });
};

////////////////////
// ERC721
////////////////////
export const INIT_ERC721 = 'INIT_ERC721';
export const initERC721 = (acceptedNftsAddress) => async (dispatch, getState) => {
  const { web3, nftList } = getState();
  let erc721Instances = [];
  // let erc1155Instances = [];
  if (!!acceptedNftsAddress) {
    for (let i = 0; i < acceptedNftsAddress.length; i++) {
      let is1155 = await nftList.methods.isERC1155(acceptedNftsAddress[i]).call();
      if (is1155) {
        // erc1155Instances.push(new web3.eth.Contract(ERC1155.abi, acceptedNftsAddress[i]));
      } else {
        erc721Instances.push(new web3.eth.Contract(ERC721.abi, acceptedNftsAddress[i]));
      }
    }

    dispatch({ type: INIT_ERC721, erc721Instances });
    dispatch(getNFTsOfOwner(erc721Instances));
  }
};

export const GET_NFTS_BY_COLLECTION_ADDRESS = 'GET_NFTS_BY_COLLECTION_ADDRESS';
export const getNftsByCollectionAddress = (collectionAddress) => async (dispatch, getState) => {
  const { web3 } = getState();
  let instance = await new web3.eth.Contract(
    SampleERC721.abi,
    collectionAddress
  );
  // let nftsArr = [];
  let balance
  let nftsOfCollectionAddress = [];

  balance = await instance.methods.totalSupply().call();
  console.log(collectionAddress)
  console.log(balance)

  if (balance > 0) {
    for (let i = 0; i < balance; i++) {
      let token = {};
      token.index = await instance.methods.tokenByIndex(i).call();
      token.is1155 = false;
      token.tokenURI = await instance.methods.tokenURI(token.index).call();
      nftsOfCollectionAddress.push(token)
    }
    dispatch({ type: GET_NFTS_BY_COLLECTION_ADDRESS, nftsOfCollectionAddress });
  } else {
    dispatch({ type: GET_NFTS_BY_COLLECTION_ADDRESS, nftsOfCollectionAddress });
  }

}

export const GET_OWNED_ERC721 = 'GET_OWNED_ERC721';
export const SET_LIST_NTTS_OWNER = 'SET_LIST_NTTS_OWNER';
export const getNFTsOfOwner = (erc721Instances, address) => async (dispatch, getState) => {
  // const walletAddress = address;

  dispatch(setLoadingErc721(true));

  var getERC721 = (instance) => {
    return new Promise(async (resolve) => {
      let ERC721token = [];
      let balance;
      if (address) {
        balance = await instance.methods.balanceOf(address).call();
      }
      if (balance > 0) {
        for (let i = 0; i < balance; i++) {
          let token = {};
          token.addressToken = instance._address;
          token.attributes = null;
          token.collections = await instance.methods.name().call();
          token.index = await instance.methods.tokenOfOwnerByIndex(address, i).call();
          token.is1155 = false;
          token.nameCollection = await instance.methods.name().call();
          token.symbol = await instance.methods.symbol().call();
          token.tokenURI = await instance.methods.tokenURI(token.index).call();
          // console.log(await instance.methods.totalSupply().call());
          ERC721token.push(token);
        }
        resolve(ERC721token);
      } else {
        resolve();
      }
    });
  };

  let erc721Tokens = await Promise.all(
    erc721Instances.map(async (instance) => {
      return await getERC721(instance);
    })
  );
  erc721Tokens = [].concat(...erc721Tokens);
  
  dispatch({ type: GET_OWNED_ERC721, erc721Tokens });
  await dispatch({ type: SET_LIST_NTTS_OWNER, erc721Tokens });

  // Loading done
  dispatch(setLoadingErc721(false));
};

export const setAcceptedNftsUser = () => async (dispatch, getState) => {
  const { nftList } = getState();
  try {
    let acceptedNftsAddress = await nftList.methods.getAcceptedNFTs().call();
    console.log(acceptedNftsAddress);
    acceptedNftsAddress = acceptedNftsAddress.map((value) => value.toLowerCase());
    dispatch({ type: SET_ACCEPTED_NFTS, acceptedNftsAddress });
    dispatch(initERC721(acceptedNftsAddress));
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const IS_LOADING_ERC721 = 'IS_LOADING_ERC721';
export const setLoadingErc721 = (isLoadingErc721) => async (dispatch) => {
  dispatch({
    type: IS_LOADING_ERC721,
    isLoadingErc721,
  });
};

export const TRANSFER_ERROR = 'TRANSFER_ERROR';
export const transferError = (transferError) => async (dispatch) => {
  dispatch({
    type: TRANSFER_ERROR,
    transferError,
  });
};
export const transferNft = (contractAddress, to, tokenId, amount, is1155) => async (
  dispatch,
  getState
) => {
  let { walletAddress, web3, erc721Instances } = getState();
  let activity = {
    key: `transfer-${Date.now()}`,
    status: 'pending',
    title: '赠送物品',
    duration: 0,
    txHash: null,
  };
  if (is1155) {
    let nftInstance = new web3.eth.Contract(ERC1155.abi, contractAddress);
    try {
      await nftInstance.methods
        .safeTransferFrom(walletAddress, to, tokenId, amount, '0x')
        .send({ from: walletAddress })
        .on('transactionHash', function (txHash) {
          activity = { ...activity, txHash };
          dispatch(setStatusActivity(activity));
        })
        .on('receipt', (receipt) => {
          activity = { ...activity, status: 'success', duration: 15000 };
          dispatch(setStatusActivity(activity));
        });
    } catch (error) {
      error.type = 'error';
      dispatch(setStatusActivity({ ...activity, status: 'close' }));
    }
  } else {
    dispatch({ type: TRANSFER_ERROR, transferError: '0' });
    let nftInstance = new web3.eth.Contract(ERC721.abi, contractAddress);
    try {
      await nftInstance.methods
        .safeTransferFrom(walletAddress, to, tokenId)
        .send({ from: walletAddress })
        .on('error', function (error) {
          dispatch({ type: TRANSFER_ERROR, transferError: '4001' });
        })
        .on('transactionHash', (txHash) => {
          dispatch({ type: TRANSFER_ERROR, transferError: '4000' });
          activity = { ...activity, txHash };
          dispatch(setStatusActivity(activity));
        })
        .on('receipt', (receipt) => {
          dispatch({ type: TRANSFER_ERROR, transferError: '1' });
          dispatch(setStatusActivity({ ...activity, status: 'success', duration: 15000 }));
        });
    } catch (error) {
      error.type = 'error';
      dispatch(setStatusActivity({ ...activity, status: 'close' }));
      dispatch({ type: TRANSFER_ERROR, transferError: '0' });
    }
  }
  // get own nft
  dispatch({ type: TRANSFER_ERROR, transferError: '0' });
  dispatch(setAvailableSellOrder());
  dispatch(getNFTsOfOwner(erc721Instances));
};

////////////////////
// CONTRACT ADDRESS
////////////////////
export const SET_ADDRESSESPROVIDER = 'SET_ADDRESSESPROVIDER';
export const setAddressesProvider = (addressesProvider) => async (dispatch) => {
  dispatch({
    type: SET_ADDRESSESPROVIDER,
    addressesProvider,
  });
};

export const SET_NFTLIST = 'SET_NFTLIST';
export const setNftList = (nftList) => async (dispatch) => {
  dispatch({
    type: SET_NFTLIST,
    nftList,
  });
};

export const SET_VAULT = 'SET_VAULT';
export const setVault = (vault) => async (dispatch) => {
  dispatch({
    type: SET_VAULT,
    vault,
  });
};

export const SET_SELLORDERLIST = 'SET_SELLORDERLIST';
export const setSellOrderList = (sellOrderList) => async (dispatch) => {
  dispatch({
    type: SET_SELLORDERLIST,
    sellOrderList,
  });
};

export const SET_MARKET = 'SET_MARKET';
export const setMarket = (market) => async (dispatch) => {
  dispatch({
    type: SET_MARKET,
    market,
  });
};

export const SET_CREATIVESTUDIO = 'SET_CREATIVESTUDIO';
export const setCreativeStudio = (creativeStudio) => async (dispatch) => {
  dispatch({
    type: SET_CREATIVESTUDIO,
    creativeStudio,
  });
};

////////////////////
// NFTs List
////////////////////

export const registerNft = (contractAddress, isERC1155) => async (dispatch, getState) => {
  const { nftList, walletAddress } = getState();

  try {
    // is contract address
    // let ERC721token = new web3.eth.Contract(ERC721.abi, contractAddress);
    // await ERC721token.methods.name().call();
    await nftList.methods
      .registerNFT(contractAddress, isERC1155)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        let noti = {};
        noti.type = 'success';
        noti.message = 'Register Successfully';
        dispatch(showNotification(noti));
      });
    return true;
  } catch (error) {
    error.message = 'Sorry, but this is not contract address or this address has been accepted';
    error.type = 'error';
    dispatch(showNotification(error));
    return false;
  }
};

export const acceptNft = (contractAddress) => async (dispatch, getState) => {
  const { nftList, walletAddress, web3 } = getState();

  try {
    // is contract address
    let ERC721token = new web3.eth.Contract(ERC721.abi, contractAddress);
    await ERC721token.methods.name().call();
    nftList.methods
      .acceptNFT(contractAddress)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        let noti = {};
        noti.type = 'success';
        noti.message = 'Accept Successfully';
        dispatch(showNotification(noti));
      });
  } catch (error) {
    error.message = 'Sorry, but this is not contract address or this address has been accepted';
    error.type = 'error';
    dispatch(showNotification(error));
  }
};

export const SET_ACCEPTED_NFTS = 'SET_ACCEPTED_NFTS';
export const setAcceptedNfts = () => async (dispatch, getState) => {
  const { nftList } = getState();
  try {
    let acceptedNftsAddress = await nftList.methods.getAcceptedNFTs().call();
    //   console.log('acceptedNftsAddress 1', acceptedNftsAddress);
    acceptedNftsAddress = acceptedNftsAddress.map((value) => value.toLowerCase());
    dispatch({ type: SET_ACCEPTED_NFTS, acceptedNftsAddress });
    dispatch(initERC721(acceptedNftsAddress));
  } catch (error) {
    error.type = 'error';
    // dispatch(showNotification(error));
    return error;
  }
};

////////////////////
// SellOrders List
////////////////////

export const SET_CONVERT_ERC721 = 'SET_CONVERT_ERC721';
export const SET_AVAILABLE_SELL_ORDER_721 = 'SET_AVAILABLE_SELL_ORDER_721';
export const SET_LIST_NTTS_ONSALE = 'SET_LIST_NTTS_ONSALE';
export const setAvailableSellOrder = (walletAddress) => async (dispatch, getState) => {
  const { sellOrderList, web3, infoCollections } = getState();
  let listNFTsOnsale = [];
  let collectionsInfo = infoCollections;
  const pushErc721 = async (listNftContract) => {
    let ERC721token = { name: '', symbol: '', avatarToken: '', tokens: [] };
    let resCollection = await dispatch(getCollection(listNftContract.nftAddress, collectionsInfo));
    collectionsInfo = resCollection.infoCollections;
    ERC721token.addressToken = listNftContract.nftAddress;
    ERC721token.name = resCollection.collection.name;
    ERC721token.symbol = await listNftContract.instance.methods.symbol().call();
    ERC721token.avatarToken = resCollection.collection.logo;
    // console.log('listNftContract 2', listNftContract);
    ERC721token.tokens = await Promise.all(
      listNftContract.tokenId.map(async (order, index) => {
        let token = {};
        token.index = order.id;
        token.tokenURI = await listNftContract.instance.methods.tokenURI(order.id).call();
        token.addressToken = listNftContract.instance._address;
        token.price = listNftContract.price[index];
        token.nameCollection = ERC721token.name;
        token.symbolCollections = ERC721token.symbol;
        token.sortIndex = order.sortIndex;
        token.tokenPayment = listNftContract.tokenPayment[index];
        token.seller = listNftContract.seller[index];
        token.sellId = listNftContract.sellId[index];
        token.is1155 = false;
        if (
          !!walletAddress &&
          listNftContract.seller[index].toLowerCase() === walletAddress.toLowerCase()
        ) {
          listNFTsOnsale.push(token);
        }

        return token;
      })
    );
    return ERC721token;
  };

  // Loading done
  if (sellOrderList) {
    try {
      let availableSellOrderIdList = await sellOrderList.methods
        .getAvailableSellOrdersIdList()
        .call();
      let availableSellOrderERC721 = await sellOrderList.methods
        .getSellOrdersByIdList(availableSellOrderIdList.resultERC721)
        .call();

      var convertErc721Tokens = [];
      var listNftContracts721 = [];

      if (!!availableSellOrderERC721) {
        availableSellOrderERC721.map(async (sellOrder, i) => {
          let token = {
            sellId: [],
            tokenId: [],
            price: [],
            tokenPayment: [],
            seller: [],
            amount: [],
          };
          let nftindex = listNftContracts721.findIndex(
            (nft) => nft.nftAddress === sellOrder.nftAddress
          );
          if (nftindex === -1) {
            //cant fine nft in list => nft in a new collection
            token.nftAddress = sellOrder.nftAddress;
            token.instance = new web3.eth.Contract(ERC721.abi, sellOrder.nftAddress);
            token.tokenId.push({ sortIndex: i, id: sellOrder.tokenId });
            token.price.push(sellOrder.price);
            token.tokenPayment.push(sellOrder.token);
            token.seller.push(sellOrder.seller);
            token.amount.push(sellOrder.amount);
            token.sellId.push(sellOrder.sellId);
            listNftContracts721.push(token);
          } else {
            // push nft to existing collection
            listNftContracts721[nftindex].tokenId.push({ sortIndex: i, id: sellOrder.tokenId });
            listNftContracts721[nftindex].price.push(sellOrder.price);
            listNftContracts721[nftindex].tokenPayment.push(sellOrder.token);
            listNftContracts721[nftindex].seller.push(sellOrder.seller);
            listNftContracts721[nftindex].amount.push(sellOrder.amount);
            listNftContracts721[nftindex].sellId.push(sellOrder.sellId);
          }
        });
      }
      // console.log('listNftContracts721 4', availableSellOrderERC721);
      convertErc721Tokens = await Promise.all(
        listNftContracts721.map(async (listNftcontract) => {
          return await pushErc721(listNftcontract);
        })
      );
      dispatch({
        type: SET_LIST_NTTS_ONSALE,
        listNFTsOnsale,
      });

      dispatch({
        type: SET_AVAILABLE_SELL_ORDER_721,
        availableSellOrder721: availableSellOrderERC721,
      });
      dispatch({
        type: SET_CONVERT_ERC721,
        convertErc721Tokens,
      });
      dispatch(setLoadingErc721(false));
    } catch (e) {
      // console.log(e);
      dispatch({
        type: SET_AVAILABLE_SELL_ORDER_721,
        availableSellOrder721: [],
      });
      dispatch({
        type: SET_CONVERT_ERC721,
        convertErc721Tokens: [],
      });
      return null;
    }
  }
};

export const SET_MY_SELL_ORDER = 'SET_MY_SELL_ORDER';
export const setMySellOrder = () => async (dispatch, getState) => {
  const { sellOrderList, walletAddress } = getState();
  try {
    let mySellOrder = await sellOrderList.methods.getAllSellOrderIdListByUser(walletAddress).call();
    dispatch({ type: SET_MY_SELL_ORDER, mySellOrder });
  } catch (e) {
    console.log(e);
  }
};

export const APPROVE_ERROR = 'APPROVE_ERROR';
export const approveError = (approveError) => async (dispatch) => {
  dispatch({
    type: APPROVE_ERROR,
    approveError,
  });
};
export const SELL_ERROR = 'SELL_ERROR';
export const sellError = (sellError) => async (dispatch) => {
  dispatch({
    type: SELL_ERROR,
    sellError,
  });
};
export const createSellOrder = (nftAddress, tokenId, price, tokenPayment, amount, is1155) => async (
  dispatch,
  getState
) => {
  const { market, walletAddress, web3, sellOrderList, erc721Instances } = getState();
  let activity = {
    key: `cancel-${Date.now()}`,
    status: 'pending',
    title: '上架物品',
    duration: 0,
    txHash: null,
  };
  try {
    if (is1155) {
      const erc1155Instance = await new web3.eth.Contract(ERC1155.abi, nftAddress);
      // Check to see if nft have accepted
      let isApprovedForAll = await erc1155Instance.methods
        .isApprovedForAll(walletAddress, market._address)
        .call();

      if (!isApprovedForAll) {
        // Approve ERC1155
        try {
          await erc1155Instance.methods
            .setApprovalForAll(market._address, true)
            .send({ from: walletAddress })
            .on('transactionHash', function (txHash) {

            });
        } catch (error) {
          return false;
        }
      }
    } else {
      const erc721Instance = await new web3.eth.Contract(ERC721.abi, nftAddress);

      // 查看是否已授权
      let addressApproved = await erc721Instance.methods
        .isApprovedForAll(walletAddress, market._address)
        .call();

      dispatch({ type: APPROVE_ERROR, approveError: '0' });
      if (!addressApproved) {
        // 如果没有授权
        // Approve All ERC721
        let activity = {
          key: `cancel-${Date.now()}`,
          status: 'pending',
          title: '授权',
          duration: 0,
          txHash: null,
        };
        try {
          await erc721Instance.methods
            .setApprovalForAll(market._address, true)
            .send({ from: walletAddress })
            .on('error', function (error) {
              // 4001用户拒绝交易   4000用户接受接受     1交易成功
              dispatch({ type: APPROVE_ERROR, approveError: '4001' });
            })
            .on('transactionHash', function (txHash) {
              dispatch({ type: APPROVE_ERROR, approveError: '4000' });
              activity = { ...activity, txHash };
              dispatch(setStatusActivity(activity));
            })
            .on('receipt', (receipt) => {
              dispatch({ type: APPROVE_ERROR, approveError: '1' });
              activity = { ...activity, status: 'success', duration: 15000 };
              dispatch(setStatusActivity(activity));
            });
        } catch (error) {
          return false;
        }
      }
      dispatch({ type: APPROVE_ERROR, approveError: '1' });
    }
    // Create Sell Order
    dispatch({ type: SELL_ERROR, sellError: '0' });
    if (!!walletAddress) {
      await market.methods
        // TODO : can sale with other tokenPayment
        .createSellOrder(nftAddress, tokenId, amount, price, tokenPayment)
        .send({ from: walletAddress })
        .on('error', function (error) {
          dispatch({ type: SELL_ERROR, sellError: '4001' });
        })
        .on('transactionHash', function (txHash) {
          dispatch({ type: SELL_ERROR, sellError: '4000' });
          activity = { ...activity, txHash };
          dispatch(setStatusActivity(activity));
        })
        .on('receipt', (receipt) => {
          dispatch({ type: SELL_ERROR, sellError: '1' });
          activity = { ...activity, status: 'success', duration: 15000 };
          dispatch(setStatusActivity(activity));
        });
    }
    // Fetch new availableOrderList
    dispatch(setAvailableSellOrder());
    // get own nft
    dispatch(getNFTsOfOwner(erc721Instances));
    dispatch({ type: APPROVE_ERROR, approveError: '0' });
    dispatch({ type: SELL_ERROR, sellError: '0' });
    activity = { ...activity, status: 'success', duration: 15000 };
    dispatch(setStatusActivity(activity));
    let orders = await sellOrderList.methods
      .getAvailableSellOrdersIdListByUser(walletAddress)
      .call();
    return {
      status: true,
      sellId: is1155 ? orders.resultERC1155.slice(-1) : orders.resultERC721.slice(-1),
    };
  } catch (error) {
    dispatch({ type: APPROVE_ERROR, approveError: '0' });
    dispatch({ type: SELL_ERROR, sellError: '0' });
    console.log({ error });
    error.type = 'error';
    return { status: false, sellId: null };
  }
};

export const SET_ALLOWANCE = 'SET_ALLOWANCE';
export const approveToken = (orderDetail) => async (dispatch, getState) => {
  const { market, walletAddress, web3 } = getState();
  if (orderDetail.tokenPayment !== NULL_ADDRESS) {
    const instaneErc20 = new web3.eth.Contract(ERC20.abi, orderDetail.tokenPayment);
    const allowance = await instaneErc20.methods.allowance(walletAddress, market._address).call();
    if (parseInt(allowance) <= 0) {
      await instaneErc20.methods
        .approve(market._address, VALUE_MAX)
        .send({ from: walletAddress })
        .on('transactionHash', function (txHash) {
        })
        .on('receipt', (receipt) => {
          dispatch({ type: SET_ALLOWANCE, allowanceToken: VALUE_MAX });
          return true;
        })
        .on('error', (error, receipt) => {
          console.log('approveERC20: ', error);
          return false;
        });
    }
  }
};

export const BUY_ERROR = 'BUY_ERROR';
export const buyError = (buyError) => async (dispatch) => {
  dispatch({
    type: BUY_ERROR,
    buyError,
  });
};
export const buyNft = (orderDetail, is1155) => async (dispatch, getState) => {
  const { market, walletAddress, chainId, web3, erc721Instances } = getState();
  let link = null;
  let value = 0;
  if (orderDetail.tokenPayment !== NULL_ADDRESS) {
    const instaneErc20 = new web3.eth.Contract(ERC20.abi, orderDetail.tokenPayment);
    const allowance = await instaneErc20.methods.allowance(walletAddress, market._address).call();
    if (parseInt(allowance) <= 0) {
      let activity = {
        key: `approve-${Date.now()}`,
        status: 'pending',
        title: 'Approve',
        duration: 0,
        txHash: null,
      };

      dispatch(setStatusActivity(activity));
      await instaneErc20.methods
        .approve(market._address, VALUE_MAX)
        .send({ from: walletAddress })
        .on('transactionHash', function (txHash) {
          activity = { ...activity, txHash };
          dispatch(setStatusActivity(activity));
        })
        .on('receipt', (receipt) => {
          activity = { ...activity, status: 'success', duration: 15000 };
          dispatch(setStatusActivity(activity));
          return true;
        })
        .on('error', (error, receipt) => {
          console.log('approveERC20: ', error);
          dispatch(setStatusActivity({ ...activity, status: 'close' }));
          return false;
        });
    }
  } else {
    value = orderDetail.price;
  }

  let activity = {
    key: `buy-${Date.now()}`,
    status: 'pending',
    title: '购买物品',
    duration: 0,
    txHash: null,
  };
  dispatch({ type: BUY_ERROR, buyError: '0' });
  try {
    await market.methods
      .buy(orderDetail.sellId, is1155 ? orderDetail.amount : 1, walletAddress, '0x')
      .send({ from: walletAddress, value: value })
      .on('error', function (error) {
        dispatch({ type: BUY_ERROR, buyError: '4001' });
      })
      .on('transactionHash', function (txHash) {
        dispatch({ type: BUY_ERROR, buyError: '4000' });
        activity = { ...activity, txHash };
        dispatch(setStatusActivity(activity));
      })
      .on('receipt', (receipt) => {
        dispatch({ type: BUY_ERROR, buyError: '1' });
        activity = { ...activity, status: 'success', duration: 15000 };
        dispatch(setStatusActivity(activity));
        dispatch(setAvailableSellOrder());
        link = getWeb3List(chainId).explorer + receipt.transactionHash;
      });
    // Fetch new availableOrderList
    dispatch(setAvailableSellOrder());
    // get own nft
    dispatch(getNFTsOfOwner(erc721Instances));
    dispatch({ type: BUY_ERROR, buyError: '0' });
    return { status: true, link };
  } catch (error) {
    error.type = 'error';
    console.log(error);
    dispatch({ type: BUY_ERROR, buyError: '0' });
    dispatch(setStatusActivity({ ...activity, status: 'close' }));
    return { status: false, link: null };
  }
};

export const UPDATE_ERROR = 'UPDATE_ERROR';
export const updateError = (updateError) => async (dispatch) => {
  dispatch({
    type: UPDATE_ERROR,
    updateError,
  });
};
export const updatePrice = (sellId, newPrice) => async (dispatch, getState) => {
  const { market, walletAddress, erc721Instances } = getState();
  let activity = {
    key: `update-price-${Date.now()}`,
    status: 'pending',
    title: '更改价格',
    duration: 0,
    txHash: null,
  };
  dispatch({ type: UPDATE_ERROR, updateError: '0' });
  try {
    await market.methods
      .updatePrice(sellId, newPrice)
      .send({ from: walletAddress }, function (error, transactionHash) { console.log(error, transactionHash) })
      .on('error', function (error) {
        dispatch({ type: UPDATE_ERROR, updateError: '4001' });
      })
      .on('transactionHash', (txHash) => {
        dispatch({ type: UPDATE_ERROR, updateError: '4000' });
        activity = { ...activity, txHash };
        dispatch(setStatusActivity(activity));
      })
      .on('receipt', (receipt) => {
        dispatch({ type: UPDATE_ERROR, updateError: '1' });
      });

    // Fetch new availableOrderList
    dispatch(setAvailableSellOrder());
    // get own nft
    dispatch(getNFTsOfOwner(erc721Instances));
    activity = { ...activity, status: 'success', duration: 15000 };
    dispatch(setStatusActivity(activity));
    dispatch({ type: UPDATE_ERROR, updateError: '0' });
    return true;
  } catch (error) {
    error.type = 'error';
    dispatch(setStatusActivity({ ...activity, status: 'close' }));
    return false;
  }
};

export const CANCEL_ERROR = 'CANCEL_ERROR';
export const cancelError = (cancelError) => async (dispatch) => {
  dispatch({
    type: CANCEL_ERROR,
    cancelError,
  });
};
export const cancelSellOrder = (orderDetail) => async (dispatch, getState) => {
  const { market, walletAddress, erc721Instances } = getState();
  let activity = {
    key: `cancel-${Date.now()}`,
    status: 'pending',
    title: '下架物品',
    duration: 0,
    txHash: null,
  };
  dispatch({ type: CANCEL_ERROR, cancelError: '0' });
  try {
    await market.methods
      .cancelSellOrder(orderDetail.sellId)
      .send({ from: walletAddress })
      .on('error', function (error) {
        console.log(error);
        dispatch({ type: CANCEL_ERROR, cancelError: '4001' });
      })
      .on('transactionHash', (txHash) => {
        dispatch({ type: CANCEL_ERROR, cancelError: '4000' });
        activity = { ...activity, txHash };
        dispatch(setStatusActivity(activity));
      })
      .on('receipt', (receipt) => {
        console.log(receipt);
        dispatch({ type: CANCEL_ERROR, cancelError: '1' });
      });

    // Fetch new availableOrderList
    dispatch(setAvailableSellOrder());
    // get own nft
    dispatch(getNFTsOfOwner(erc721Instances));
    activity = { ...activity, status: 'success', duration: 15000 };
    dispatch(setStatusActivity(activity));
    dispatch({ type: CANCEL_ERROR, cancelError: '0' });
    return true;
  } catch (error) {
    error.type = 'error';
    dispatch(setStatusActivity({ ...activity, status: 'close' }));
    return false;
  }
};

////////////////////
// Create New NFT
////////////////////

// TODO
export const MINT_ERROR = 'MINT_ERROR';
export const mintError = (mintError) => async (dispatch) => {
  dispatch({
    type: MINT_ERROR,
    mintError,
  });
};
export const generateERC721NFT = (collectionId, tokenUri, nftAddress) => async (dispatch, getState) => {
  const { web3, chainId, walletAddress, erc721Instances } = getState();
  let activity = {
    key: `cancel-${Date.now()}`,
    status: 'pending',
    title: '创建物品',
    duration: 0,
    txHash: null,
  };
  contractAddress = getContractAddress(chainId);
  let erc721Instance;
  if (collectionId !== -1 && nftAddress) {
    erc721Instance = await new web3.eth.Contract(
      SampleERC721.abi,
      nftAddress
    );
    dispatch({ type: MINT_ERROR, mintError: '0' });
    let tokenIdForSell = '';
    try {
      await erc721Instance.methods
        .mint(walletAddress, tokenUri, NULL_ADDRESS)
        .send({ from: walletAddress })
        .on('error', function (error) {
          dispatch({ type: MINT_ERROR, mintError: '4001' });
        })
        .on('transactionHash', (txHash) => {
          dispatch({ type: MINT_ERROR, mintError: '4000' });
          activity = { ...activity, txHash };
          dispatch(setStatusActivity(activity));
        })
        .on('receipt', (receipt) => {
          tokenIdForSell = receipt.events.Transfer.returnValues.tokenId;
          dispatch({ type: MINT_ERROR, mintError: '1' });
        });
      dispatch({ type: MINT_ERROR, mintError: '0' });
      activity = { ...activity, status: 'success', duration: 15000 };
      dispatch(setStatusActivity(activity));
      return {
        status: true,
        tokenId: tokenIdForSell
      };
    } catch (error) {
      error.type = 'error';
      // dispatch(showNotification(error));
      console.log(error);
    }
    dispatch({ type: MINT_ERROR, mintError: '0' });
  } else {
    erc721Instance = await new web3.eth.Contract(
      DidiERC721NFT.abi,
      contractAddress.DidiERC721NFT
    );
    //4001用户拒绝交易   4000用户确认交易    1交易成功
    dispatch({ type: MINT_ERROR, mintError: '0' });
    let tokenIdForSell = '';
    try {
      await erc721Instance.methods
        .mint(tokenUri)
        .send({ from: walletAddress })
        .on('error', function (error) {
          dispatch({ type: MINT_ERROR, mintError: '4001' });
        })
        .on('transactionHash', (txHash) => {
          dispatch({ type: MINT_ERROR, mintError: '4000' });
          activity = { ...activity, txHash };
          dispatch(setStatusActivity(activity));
        })
        .on('receipt', (receipt) => {
          tokenIdForSell = receipt.events.Transfer.returnValues.tokenId;
          dispatch({ type: MINT_ERROR, mintError: '1' });
        });
      dispatch({ type: MINT_ERROR, mintError: '0' });
      activity = { ...activity, status: 'success', duration: 15000 };
      dispatch(setStatusActivity(activity));
      return {
        status: true,
        tokenId: tokenIdForSell
      };
    } catch (error) {
      error.type = 'error';
    }
  }

  // get own nft
  dispatch(getNFTsOfOwner(erc721Instances));
};

// TODO
export const generateERC1155NFT = (collectionId, id, amount, tokenUri) => async (
  dispatch,
  getState
) => {
  const { web3, chainId, walletAddress, userCollections, erc721Instances } = getState();
  contractAddress = getContractAddress(chainId);
  let erc1155Instance;
  if (collectionId !== -1) {
    erc1155Instance = await new web3.eth.Contract(
      SampleERC1155.abi,
      userCollections[collectionId].contractAddress
    );

    try {
      await erc1155Instance.methods
        .mint(walletAddress, id, amount, tokenUri, NULL_ADDRESS)
        .send({ from: walletAddress })
        .on('receipt', (receipt) => {

        });
    } catch (error) {
      error.type = 'error';
      // dispatch(showNotification(error));
      console.log(error);
    }
  } else {
    erc1155Instance = await new web3.eth.Contract(
      DidiERC1155NFT.abi,
      contractAddress.DidiERC1155NFT
    );

    try {
      await erc1155Instance.methods
        .mint(amount, tokenUri, NULL_ADDRESS)
        .send({ from: walletAddress })
        .on('receipt', (receipt) => {

        });
    } catch (error) {
      error.type = 'error';
      // dispatch(showNotification(error));
      console.log(error);
    }
  }

  // get own nft
  dispatch(getNFTsOfOwner(erc721Instances));
};

////////////////////
// Create Collection
////////////////////

export const SET_USER_COLLECTIONS = 'SET_USER_COLLECTIONS';
export const setCollectionByUser = () => async (dispatch, getState) => {
  let { walletAddress, creativeStudio } = getState();
  try {
    if (!walletAddress) return;
    let userCollections = await creativeStudio.methods.getCollectionsByUser(walletAddress).call();
    userCollections = JSON.stringify(userCollections);
    userCollections = JSON.parse(userCollections);

    // add index in array usercollection
    let formatUserCollections = userCollections.map((userCollection, index) => {
      userCollection.index = index;
      userCollection.id = userCollection[0];
      userCollection.contractAddress = userCollection[1];
      userCollection.isERC1155 = userCollection[2];
      userCollection.creator = userCollection[3];

      return userCollection;
    });

    dispatch({ type: SET_USER_COLLECTIONS, userCollections: formatUserCollections });
  } catch (error) {
    error.type = 'error';
    console.log(error);
  }
};

export const createERC1155Collection = ({ name, symbol }) => async (dispatch, getState) => {
  let { walletAddress, creativeStudio } = getState();

  try {
    await creativeStudio.methods
      .createERC1155Collection(name, symbol)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        dispatch(setCollectionByUser());
        let noti = {};
        noti.type = 'success';
        noti.message = 'Create Successfully !';
        dispatch(showNotification(noti));
      });
  } catch (error) {
    error.type = 'error';
    dispatch(showNotification(error));
  }
  // get own nft
  dispatch(setAcceptedNfts());
};

export const COL_ERROR = 'COL_ERROR';
export const colError = (colError) => async (dispatch) => {
  dispatch({
    type: COL_ERROR,
    colError,
  });
};
export const createERC721Collection = ({ name, symbol }) => async (dispatch, getState) => {
  let { walletAddress, creativeStudio } = getState();
  let activity = {
    key: `cancel-${Date.now()}`,
    status: 'pending',
    title: '部署合约',
    duration: 0,
    txHash: null,
  };
  dispatch({ type: COL_ERROR, colError: '0' });
  try {
    await creativeStudio.methods
      .createERC721Collection(name, symbol)
      .send({ from: walletAddress })
      .on('error', function (error) {
        dispatch({ type: COL_ERROR, colError: '4001' });
      })
      .on('transactionHash', (txHash) => {
        dispatch({ type: COL_ERROR, colError: '4000' });
        activity = { ...activity, txHash };
        dispatch(setStatusActivity(activity));
      })
      .on('receipt', (receipt) => {
        activity = { ...activity, status: 'success', duration: 15000 };
        dispatch(setStatusActivity(activity));
        dispatch({ type: COL_ERROR, colError: '1' });
        dispatch(setCollectionByUser());
      });
  } catch (error) {
    error.type = 'error';
    console.log(error);
    dispatch(setStatusActivity({ ...activity, status: 'close' }));
    return { status: false }
  }
  // get own nft
  dispatch(setAcceptedNfts());
  return { status: true }
};

export const checkWhiteListNft = (addressNft) => async (dispatch, getState) => {
  let { nftList, web3 } = getState();
  try {
    if (!nftList) {
      let nftList = new web3.eth.Contract(NFTList.abi, contractAddress.NftList);
      dispatch(setNftList(nftList));
    }
    const result = await nftList.methods.isAcceptedNFT(addressNft).call();
    return result;
  } catch (error) {
    error.type = 'error';
    // dispatch(showNotification(error));
    console.log(error);
  }
};

export const checkBalance = (addressToken) => async (dispatch, getState) => {
  const { walletAddress, web3 } = getState();
  try {
    const instaneErc20 = new web3.eth.Contract(ERC20.abi, addressToken);
    let weiBalance = await instaneErc20.methods.balanceOf(walletAddress).call();
    let symbol = await instaneErc20.methods.symbol().call();
    return { weiBalance, symbol };
  } catch (error) {
    error.type = 'error';
    console.log(error);
  }
};

export const approveERC20 = (addressToken, amount) => async (dispatch, getState) => {
  let { web3, walletAddress } = getState();
  try {
    const instaneErc20 = new web3.eth.Contract(ERC20.abi, addressToken);
    await instaneErc20.methods
      .approve(contractAddress.NFTCampaign, VALUE_MAX)
      .send({ from: walletAddress })
      .on('receipt', (receipt) => {
        let noti = {};
        noti.type = 'success';
        noti.message = 'Approve Successfully !';
        dispatch(showNotification(noti));
        return true;
      });
  } catch (error) {
    console.log('approveERC20: ', error);
    error.type = 'error';
    dispatch(showNotification(error));
    return false;
  }
};

export const NOTI = 'NOTI';
export const showNotification = (noti) => (dispatch) => {
  dispatch({ type: NOTI, noti });
};

export const ACTIVITY = 'ACTIVITY';
export const setStatusActivity = (activity) => (dispatch) => {
  dispatch({ type: ACTIVITY, activity });
};

// Collection
export const getCollection = (addressToken, _collections) => async (dispatch, getState) => {
  addressToken = addressToken.toLowerCase();
  const { web3, nftList, chainId, infoCollections } = getState();
  let collections = !!_collections ? _collections : infoCollections;
  let collection;
  if (!!collections[addressToken]) {
    collection = collections[addressToken];
  } else {
    let res;

    // if (!collections[addressToken]) {
    //   res = await getCollectionByAddress(addressToken, chainId);
    // }

    if (!!res && !!res.collection) {
      collection = res.collection;
      if (!collection.name) collection.name = 'Unnamed';
      if (!res.collection.name) res.collection.name = 'Unnamed';
      collections[addressToken] = res.collection;
      dispatch(setInfoCollections(collections));
    } else {
      if (web3 && nftList) {
        let nameCollection;
        let is1155 = await nftList.methods.isERC1155(addressToken).call();
        let tokenURI;
        if (!!is1155) {
          const erc1155Instances = await new web3.eth.Contract(SampleERC1155.abi, addressToken);
          try {
            tokenURI = await erc1155Instances.methods.uri().call();
          } catch (error) {
            tokenURI = null;
          }
          try {
            nameCollection = await erc1155Instances.methods.name().call();
          } catch (error) {
            nameCollection = null;
          }
        } else {
          const erc721Instances = await new web3.eth.Contract(SampleERC721.abi, addressToken);
          try {
            nameCollection = await erc721Instances.methods.name().call();
          } catch (error) {
            nameCollection = null;
          }
        }

        if (!nameCollection && !!tokenURI) {
          try {
            let req = await axios.get(tokenURI);
            const data = req.data;

            nameCollection = !!data.name ? data.name : 'Unnamed';
          } catch (error) {
            nameCollection = 'Unnamed';
          }
        } else if (!nameCollection && !tokenURI) {
          nameCollection = 'Unnamed';
        }

        collection = { name: nameCollection, logo: logoCollectionDefault, addressToken, chainId };
        collections[addressToken] = collection;
        dispatch(setInfoCollections(collections));
      }
    }
  }

  return { collection, infoCollections: collections };
};

// user
export const getUser = (walletAddress, _users) => async (dispatch, getState) => {
  walletAddress = walletAddress?.toLowerCase();
  const { infoUsers } = getState();
  let users = !!_users ? _users : infoUsers;
  let user;
  if (!!users[walletAddress]) {
    user = users[walletAddress];
  } else {
    let res;

    if (!!res && !!res.user) {
      user = res.user;
      users[walletAddress] = res.user;
      dispatch(setInfoUsers(users));
    } else {
      user = { username: 'Unnamed', avatar: avatarDefault };
      users[walletAddress] = user;
      dispatch(setInfoUsers(users));
    }
  }

  return { user, infoUsers: users };
};

export const SET_ORBITDB = 'SET_ORBITDB';
export const setOrbitdb = (orbitdb) => async (dispatch) => {
  dispatch({
    type: SET_ORBITDB,
    orbitdb,
  });
};

export const SET_USER_INFO = 'SET_USER_INFO';
export const setUserInfo = (userInfo) => async (dispatch) => {
  dispatch({
    type: SET_USER_INFO,
    userInfo,
  });
};

export const SET_COLLECTION_INFO = 'SET_COLLECTION_INFO';
export const setCollectionInfo = (collectionInfo) => async (dispatch) => {
  let colObj = {}
  collectionInfo.forEach(item => {
    colObj[item.contractAddress] = item
  })
  dispatch(setCollectionObj(colObj))
  dispatch({
    type: SET_COLLECTION_INFO,
    collectionInfo,
  });
};
export const SET_COLLECTION_OBJ = 'SET_COLLECTION_OBJ';
export const setCollectionObj = (collectionObj) => async (dispatch) => {
  dispatch({
    type: SET_COLLECTION_OBJ,
    collectionObj,
  });
};
export const UNMATCHED_MODAL = 'UNMATCHED_MODAL';
export const setUnmatchedModal = (unmatchedModal) => async (dispatch) => {
  dispatch({
    type: UNMATCHED_MODAL,
    unmatchedModal,
  });
};