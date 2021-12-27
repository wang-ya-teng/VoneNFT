import 'Views/DetailNFT/index.scss';
import './index.scss';
import { useState, useEffect, useCallback } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { buyNft, approveToken } from 'Store/actions';
import ModalBuy1155 from 'Components/ModalBuy1155';
import { balanceOf, allowance } from 'Utils/helper';
import { connectWeb3Modal } from 'Connections/web3Modal';
import { useHistory } from 'react-router';

export default function BuySmall({ token, orderDetail, is1155, id, addressToken, getOwners1155, setOrderDetail }) {
  let history = useHistory();
  const [insufficient, setInsufficient] = useState(false);
  const { balance, chainId, walletAddress, allowanceToken, web3, buyError } = useSelector((state) => state);
  const [approvedToken, setApprovedToken] = useState(false);
  const [Checkout1155, setCheckout1155] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [buying, setBuying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [money, setMoney] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const getBalance = async () => {
      let balance = await web3.eth.getBalance(walletAddress);
      setMoney(balance);
    }
    if(walletAddress) {
      getBalance();
    }
    //4001用户拒绝交易   4000用户确认交易    1交易成功
    if (buyError === '4001') {
      setIsLoading(false);
      setBuying(true);
    } else if (buyError === '4000') {
      setBuying(false);
    } else if (buyError === '1') {
      setOrderDetail(null);
      setIsLoading(false);
      setIsModalVisible(false);
    }
  }, [buyError, setOrderDetail, walletAddress, web3.eth])

  const handleOk = () => {
    setIsLoading(true);
    setBuying(false);
    buy(orderDetail);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsLoading(false);
    setBuying(false);
  };

  const fetchBalance = useCallback(
    async (order) => {
      if (!order) return;
      if (order.tokenPayment === '0x0000000000000000000000000000000000000000') {
        setApprovedToken(true);
        if (order.price > parseInt(balance * 1e18)) {
          setInsufficient(true);
        } else {
          setInsufficient(false);
        }
      } else {
        let allowanceToken = await allowance(order.tokenPayment, walletAddress, chainId);
        let _tokenBal = await balanceOf(order.tokenPayment, walletAddress);
        if (order.price > parseInt(_tokenBal)) {
          setInsufficient(true);
        } else {
          setInsufficient(false);
        }
        if (order.price <= parseInt(allowanceToken)) {
          setApprovedToken(true);
        } else {
          setApprovedToken(false);
        }
      }
    },
    [balance, walletAddress, chainId]
  );

  useEffect(() => {
    if (!!walletAddress) fetchBalance(orderDetail);
  }, [fetchBalance, walletAddress, allowanceToken, orderDetail]);

  const buy = async (order) => {
    if (!order) return;
    let result = await dispatch(buyNft(order, is1155));
    if (!!result.status && !!result.link) {
      if (!!is1155) {
        await getOwners1155();
      }
      history.push({
        pathname: `/token/${chainId}/${addressToken}/${id}/null`,
      });
    }
  };

  const approve = async () => {
    if (!orderDetail) return;
    await dispatch(approveToken(orderDetail));
  };

  const checkout1155 = async () => {
    setCheckout1155(true);
  };

  return (
    <>
      {!!walletAddress ? (
        <>
          <Modal
            title={<h3 className='textmode mgb-0'>购买</h3>}
            visible={isModalVisible}
            onCancel={handleCancel}
            centered
            footer={[
              <Button
                style={{ width: '280px', height: '42px', background: '#6080b4', borderRadius: '10px', border: 'none', marginBottom: '10px' }}
                key='buy'
                loading={isLoading}
                type='primary'
                shape='round'
                size='large'
                onClick={() => handleOk()}
              >
                {!!isLoading ? '支付中' : '购买'}
              </Button>, <div key='red' style={{ color: 'red', marginTop: '5px', display: `${!!buying ? 'block' : 'none'}` }}>错误：支付失败</div>
            ]}
          >
            <div className='sell-img' style={{ borderTop: '1px solid rgba(96,128,180,0.09)', borderBottom: '1px solid rgba(96,128,180,0.09)', padding: '45px 0', display: 'flex', alignItems: 'center' }}>
              <img alt='img-nft' src={token.image} />
              <div>
                <div className='textmode'>{token.name}</div>
                <div style={{ color: 'rgba(0,0,0,0.50)' }}>{token.nameCollection}</div>
                <div className='textmode'>单价: <span style={{ fontWeight: '600', fontSize: '16px' }}>{web3.utils.fromWei(orderDetail.price.toString(), 'ether')}</span>{' '}{chainId === 4 ? 'ETH' : 'BNB'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>账户余额:<span>{web3.utils.fromWei(money.toString(), 'ether').slice(0, 6)}{' '}{chainId === 4 ? 'ETH' : 'BNB'}</span></div>
          </Modal>
          <ModalBuy1155
            visible={Checkout1155}
            orderDetail={orderDetail}
            buy={buy}
            insufficient={insufficient}
            setCheckout1155={setCheckout1155}
          />
          {approvedToken ? (
            insufficient ? (
              <Button type='text' disabled shape='round' size='small'>
                余额不足
              </Button>
            ) : (
              <Button
                className="buy-btn"
                type='text'
                shape='round'
                size='small'
                onClick={() => (is1155 ? checkout1155() : setIsModalVisible(true))}
              >
                购买
              </Button>
            )
          ) : (
            <Button type='text' shape='round' size='small' onClick={approve}>
              授权
            </Button>
          )}
        </>
      ) : (
        <>
          <Button
            style={{ color: '#6080B4', fontWeight: 'bold', fontSize: '15px' }}
            type='text' shape='round' size='small' onClick={connectWeb3Modal}>
            购买
          </Button>
        </>
      )}
    </>
  );
}
