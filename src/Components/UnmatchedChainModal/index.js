import { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { setUnmatchedModal, logout } from 'Store/actions';
import { useHistory } from 'react-router-dom';
import { disconnectWeb3Modal } from 'Connections/web3Modal';
import 'antd/dist/antd.less'
import './index.scss';

export default function UnmatchedChainModal(props) {
    const { visible } = props
    const [isChainModalVisible, setIsChainModalVisible] = useState(false); //弹框状态
    const dispatch = useDispatch()
    const router = useHistory()
    useEffect(() => {
        setIsChainModalVisible(visible)
    }, [visible])
    const handleOk = () => {
        // 关闭弹窗
        dispatch(setUnmatchedModal(false))
        // 退出登录
        dispatch(logout());
        disconnectWeb3Modal();
        localStorage.isLogin = false
        // 关闭后跳转到登录页面
        router.push('/login')
    };

    return (
        <div className='unmatched-chain-modal'>
            <Modal
                title='错误的链类型'
                visible={isChainModalVisible}
                maskClosable={false}
                closable={false}
                width={653}
                centered={true}
                wrapClassName='wrapClass'
                footer={[
                    // 定义右下角
                    <Button key="submit" type="primary" onClick={() => { handleOk() }}>确定</Button>
                ]}
            >
                <p>本平台暂不支持该链类型</p>
            </Modal>
        </div>
    );
}
