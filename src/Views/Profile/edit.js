import './edit.scss'
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Form, Row } from 'antd';
import { useHistory } from 'react-router-dom';

import { getDB } from 'Utils/orbit'
import { setUserInfo } from 'Store/actions';

export default function EditProfile() {
    const {TextArea} = Input
    const { walletAddress, orbitdb, userInfo, chainId } = useSelector((state) => state);
    const dispatch = useDispatch()
    const router = useHistory()
    const [userData, setUserData] = useState(null); // 存储userInfo
    const [form] = Form.useForm();
    const formRef = useRef()
    useEffect(()=>{
        // input设置默认值
        formRef.current.setFieldsValue({
            name: userInfo.userName,
            description:userInfo.desc
        })
        setUserData(userInfo)
    }, [userInfo])// eslint-disable-line react-hooks/exhaustive-deps

    const onFinish = async (values) => {
        // 根据环境获取orbitdb库的地址
        const address = process.env.REACT_APP_ORBIT_DB;
        // 获取数据库信息[address:数据库地址;orbitdb：orbitdb初始化信息]
        const db = await getDB(address, orbitdb)
        if (db) {
            userData.userName = values.name
            userData.desc = values.description
           await db.set(walletAddress + '_profile', userData)
           dispatch(setUserInfo(userData))
            form.resetFields();
            // 修改完成跳转到个人中心页面
            router.push(`/profile/index/${chainId}/${walletAddress}`)
        }
    };

    return (
        <>
            <div className="edit-profile">
                <div className="edit-profile-title">编辑个人资料</div>
                <div className='edit-profile-input'>
                    <Form onFinish={onFinish} form={form} colon={false} ref={formRef}>
                        <Form.Item
                            label={<div className='edit-profile-input-name'>用户名</div>}
                            name='name'
                        >
                            <Input
                                className='edit-profile-input-value'
                                placeholder='请输入用户名'
                                size='large'
                                autoComplete='off'
                                maxLength="50"
                            />
                        </Form.Item>
                        <div className="mt25"></div>
                        <Form.Item className='description' name='description' label={<div className='edit-profile-input-name'>简介</div>}>
                            <TextArea
                                className='edit-profile-input-value'
                                autoSize={{ minRows: 2 }}
                                placeholder='请输入简介'
                                size='large'
                                maxLength="500"
                            />
                        </Form.Item>
                        <Form.Item style={{ marginTop: '40px' }}>
                            <Row justify='center'>
                                <Button
                                    className='btn-create-item'
                                    htmlType='submit'
                                    shape='round'
                                    size='large'
                                >
                                    保存
                                </Button>
                            </Row>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}