import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NFTsProfile from 'Components/NFTsProfile';
import { getNFTsOfOwner } from 'Store/actions';
import store from 'Store/index';

export default function TabOwner({ address }) {
  const { erc721Tokens, erc721Instances } = useSelector((state) => state);
  const [loadingGetOwner, setloadingGetOwner] = useState(false);

  const fetchOwner = useCallback(async () => {
    setloadingGetOwner(true);
    await store.dispatch(getNFTsOfOwner(erc721Instances, address));
    setloadingGetOwner(false);
  }, [erc721Instances, address]);

  useEffect(() => {
    if (!!erc721Instances) {
      fetchOwner();
    }
  }, [fetchOwner, erc721Instances]);

  return <NFTsProfile listNFTs={erc721Tokens} isLoadingErc721={loadingGetOwner} onSale={false} />;
}
