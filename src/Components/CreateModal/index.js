import { Modal, Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateERC721NFT } from 'Store/actions';
import { createSellOrder } from 'Store/actions';
import './index.scss';
import Dui from 'Assets/icons/dui.png'

export default function CreateModal({ visible, handleClean, first, uploading, create, setCreate, setApprove,
  pinataUri, collectionId, inputOpen, approve, selling, price, nftAddress, tokenId, setTokenId }) {
  const { web3 } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [collection, setCollection] = useState();

  useEffect(() => {
    setIsModalVisible(visible);
    setCollection(collectionId);
  }, [visible, collectionId]);

  const handleCancel = () => {
    setIsModalVisible(false);
    //关闭弹窗 清空所有状态
    handleClean();
  };

  //拒绝后再次铸造并出售
  const mintAgain = async () => {
    setCreate('1')
    const result = await dispatch(generateERC721NFT(collection, pinataUri, nftAddress));

    if (!!result && !!inputOpen) {
      console.log((result.tokenId));
      setTokenId(result.tokenId)
      setApprove('1');
      const res = await dispatch(
        createSellOrder(
          nftAddress,
          result.tokenId,
          web3.utils.toWei(price.toString(), 'ether'),
          '0x0000000000000000000000000000000000000000',
          1
        )
      );

      if (!!res.status) {
        // 如果成功了， 清空 form file 和所有交易状态
        console.log('clean');
        handleClean();
      }
    }
  }

  //拒绝后重新创建卖单
  const sellAgain = async () => {
    const res = await dispatch(
      createSellOrder(
        nftAddress,
        tokenId,
        web3.utils.toWei(price.toString(), 'ether'),
        '0x0000000000000000000000000000000000000000',
        1
      ));

    if (!!res.status) {
      // 如果成功了， 清空 form file 和所有交易状态
      console.log('clean');
      handleClean();
    }
  }

  return (
    <Modal
      visible={isModalVisible}
      footer={<div />}
      centered
      width={500}
      onCancel={handleCancel}
    >
      <div className='flex-column-center'>
        <div className='first-style'>
          <div className='flex-between-center'>
            <div className="textMode"><span className="one">1</span><span>上传</span></div>
            {!!first ? <div className='color'>
              已完成
              <img src={Dui} alt='yes' style={{ width: '22px' }} />
            </div> : null}
          </div>
          <div>上传媒体文件和元数据。</div>
          {!!uploading ? <Space className='space-style'>
            <Button type="primary" loading className='btn-style'>
              上传中
            </Button>
          </Space> : null}
        </div>

        <div className='first-style'>
          <div className='flex-between-center'>
            <div className="textMode"><span className="one">2</span><span>创建</span></div>
            {create === '3' ? <div className='color'>
              已完成
              <img src={Dui} alt='yes' style={{ width: '22px' }} />
            </div> : null}
          </div>
          <div>创建NFT需支付一笔矿工费。</div>
          {create === '1' ? <Space className='flex-column-center space-style'>
            <Button type="primary" loading className='btn-style'>
              创建中
            </Button>
          </Space> : create === '2' ? <Space className='flex-column-center space-style'>
            <Button onClick={() => { mintAgain() }} type="primary" className='btn-style'>
              再试一次
            </Button>
            <div className='color-red mt5'>错误：您在钱包中拒绝支付</div>
          </Space> : null}
        </div>

        <div style={{ width: '90%', margin: '25px 0', display: `${inputOpen ? '' : 'none'}` }}>
          <div className="flex-between-center">
            <div className="textMode"><span className="one">3</span><span>授权</span></div>
            {approve === '3' ? <div className='color'>
              已完成
              <img src={Dui} alt='yes' style={{ width: '22px' }} />
            </div> : null}
          </div>
          <div>出售此作品集中的作品需进行一次性授权。</div>
          {approve === '1' ? <Space className='flex-column-center space-style'>
            <Button type="primary" loading className='btn-style'>
              授权中
            </Button>
          </Space> : approve === '2' ? <Space className='flex-column-center space-style'>
            <Button onClick={() => { sellAgain() }} type="primary" className='btn-style'>
              再试一次
            </Button>
            <div className='color-red'>错误：您在钱包中拒绝支付</div>
          </Space> : null}
        </div>

        <div style={{ width: '90%', margin: '25px 0', display: `${inputOpen ? '' : 'none'}` }}>
          <div className='flex-between-center'>
            <div className="textMode"><span className="one">4</span><span>上架出售</span></div>
            {selling === '3' ? <div className='color'>
              已完成
              <img src={Dui} alt='yes' style={{ width: '22px' }} />
            </div> : null}
          </div>
          <div>上架出售需支付一笔矿工费。</div>
          {selling === '1' ? <Space className='flex-column-center space-style'>
            <Button type="primary" loading className='btn-style'>
              上架中
            </Button>
          </Space> : selling === '2' ? <Space className='flex-column-center space-style'>
            <Button onClick={() => { sellAgain() }} type="primary" className='btn-style'>
              再试一次
            </Button>
            <div className='color-red'>错误：您在钱包中拒绝支付</div>
          </Space> : null}
        </div>
      </div>
    </Modal>
  );
}
