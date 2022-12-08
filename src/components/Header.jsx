import defaultAvatar from '../assets/defaultAvatar.jpg'
import logoImg from '../assets/logo.png'

import React, { useEffect, useState } from 'react'
import { Dropdown, Menu, message, Space } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(defaultAvatar)
    const [username, setUsername] = useState("张三")

    // 模拟componentDidMount
    useEffect(() => {
        let avatar1 = localStorage.getItem('avatar')
        let username1 = localStorage.getItem('username')
        if(avatar1) {
            setAvatar('http://47.93.114.103:6688/'+avatar1)
        }
        if(username1) {
            setUsername(username1)
        }

    }, [])

    // 退出登录
    const logout = () => {
        localStorage.clear()
        message.success('退出成功，即将返回登录页！')
        setTimeout(() => navigate('/login'), 1500)
    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: <span>修改资料</span>
                },
                {
                    type: 'divider'
                },
                {
                    key: '3',
                    label: <span onClick={()=>logout()}>退出登录</span>
                }
            ]}
        />
    );

    return (
        <div>
            <header>
                <img src={logoImg} className='logo' />
                <div className="right">
                    <img src={avatar} alt="" />
                    <Dropdown overlay={() => menu}>
                        <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
                            <Space>
                                {username}
                                <CaretDownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </header>
        </div>
    )
}
