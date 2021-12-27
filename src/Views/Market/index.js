import { useSelector } from 'react-redux';
import './index.scss'
import NFTsFilterBrowse from 'Components/NFTsFilterBrowse';

export default function Market() {
    const { convertErc721Tokens, isLoadingErc721 } = useSelector(
        (state) => state
    );

    return (
        <>
            <div className="market">
                <div className='container' style={{ width: '100%', height: '100%' }}>
                    <NFTsFilterBrowse
                        collectionsNFT={convertErc721Tokens}
                        isLoadingErc721={isLoadingErc721} />
                </div>
            </div>
        </>
    )
}