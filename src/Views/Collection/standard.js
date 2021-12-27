import { useHistory } from 'react-router';
import './standard.scss';
import { Button } from 'antd';
import erc721 from 'Assets/erc721.png';
import erc1155 from 'Assets/erc1155.png';
import { useState } from 'react';
export default function Create() {
    const history = useHistory();
    const [selectType, setSelectType] = useState(1);

    function push(to) {
        history.push(to);
    }

    return (
        <>
            <div className='standard'>
                <div className='standard-box'>
                    <div className='title-standard-collection'>创建作品集</div>

                    <div className='standard-content'>
                        <div className={`${selectType === 1 ? 'active' : ''} standard-item mr60`} onClick={() => setSelectType(1)}>
                            <img height='62px' src={erc721} alt='single' />
                            <p className="size16">ERC721</p>
                            <p>如果您希望该作品集中的物 品都独一无二，如艺术品， 请选择本标准。</p>
                        </div>

                        <div className={`${selectType === 2 ? 'active' : ''} standard-item`} onClick={() => setSelectType(2)}>
                            <img style={{ height: '62px' }} src={erc1155} alt='multiple' />
                            <p className="size16">ERC1155</p>
                            <p>如果您希望该作品集中的每 一件物品都可以创建多份，如音乐、视频等，请选择本标准。</p>
                        </div>
                    </div>
                    <div className="standard-line"></div>

                    <div className='noti-standard-collection'>
                        <Button type="primary"
                            size="large"
                            style={{ backgroundColor: '#6080b4', width: '280px', height: '50px', borderRadius: '10px', border: 'none' }}
                            onClick={() => push(`/collection/create/${selectType === 1 ? 'erc721' : 'erc1155'}`)}
                        >创建</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
