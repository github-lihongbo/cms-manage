import React, { useEffect, useState } from 'react'
import { UnorderedListOutlined, EditOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const getItem = (label, key, icon, children, type) => ({ key, icon, children, label, type })

const items = [
    getItem('查看文章列表list', 'listlist', <UnorderedListOutlined />),
    getItem('查看文章列表table', 'listtable', <UnorderedListOutlined />),
    getItem('文章编辑', 'edit', <EditOutlined />),
    getItem('修改资料', 'means', <SnippetsOutlined />)
];

export default function Aside() {
    const navigate = useNavigate()
    const location = useLocation()
    const [path, setPath] = useState('')

    useEffect(() => {
        setPath(location.pathname.split('/')[1])
    }, [])
    
    const onClick = (e) => {
        setPath(e.key)
        navigate('/' + e.key)
    };

    return (
        <Menu
            onClick={onClick}
            className='aside'
            selectedKeys={path}
            mode="inline"
            theme='dark'
            items={items}
        />
    )
}
