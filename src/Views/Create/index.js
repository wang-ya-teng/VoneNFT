import { useHistory } from 'react-router';
import './index.scss';
import { Button } from 'antd';
import create721Icon from 'Assets/images/create721.png';
import create1155Icon from 'Assets/images/create1155.png';
import { useState } from 'react';
export default function Create() {
  const history = useHistory();
  const [selectType, setSelectType] = useState(1);

  function push(to) {
    history.push(to);
  }

  return (
    <div className='center create-'>
      <div className='create-box'>
        <h1 className='title-create-collection'>创建物品</h1>

        <div className='justifyContentSa'>
          <div className={`${selectType === 1 ? 'active' : ''} box input-mode-bc slt center mr60`} onClick={() => setSelectType(1)}>
            <img style={{ height: '40px' }} src={create721Icon} alt='single' />
            <p className="size16">ERC721</p>
            <p>如果您希望创建独一无二的 物品，如艺术品，请选择本标准。</p>
          </div>

          <div className={`${selectType === 2 ? 'active' : ''} box input-mode-bc slt center`} onClick={() => setSelectType(2)}>
            <img style={{ height: '40px' }} src={create1155Icon} alt='multiple' />
            <p className="size16">ERC1155</p>
            <p>如果您希望将同一件物品创 建多份，如音乐、视频等， 请选择本标准。</p>
          </div>
        </div>

        <div className="flex-center">
          <div className="line"></div>
        </div>

        <div className='noti-create-collection'>
          <Button type="primary"
            size="large"
            style={{ backgroundColor: '#6080b4', width: '280px', height: '50px', borderRadius: '10px', border: 'none' }}
            onClick={() => push(`/create/${selectType === 1 ? 'erc721' : 'erc1155'}`)}
          >创建</Button>
        </div>
      </div>
    </div>
  );
}
