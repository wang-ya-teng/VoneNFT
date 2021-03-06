import sampleAbiERC1155 from 'Contracts/SampleERC1155.json';

export default async function helperStatusActions1155Profile(
  walletAddress,
  setStatus,
  addressToken,
  id,
  chainId,
  web3,
  setBalanceOf
) {
  if (!!chainId && !!id && !!addressToken) {
    try {
      if (!!walletAddress) {
        const nft = new web3.eth.Contract(sampleAbiERC1155.abi, addressToken);
        const balanceOf = await nft.methods.balanceOf(walletAddress, id).call();
        setBalanceOf(balanceOf);
        if (balanceOf > 0) {
          setStatus(2);
        } else {
          setStatus(0);
        }
      } else {
        setStatus(0);
      }
    } catch (error) {
      console.log(error);
      // message.error("NFT doesn't exist!");
    }
  }
}
