import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';

export default function Bread() {

    const [breadName, setBreadName] = useState()
    const { pathname } = useLocation()
    useEffect(() => {
        switch (pathname) {
            case '/listlist':
                setBreadName('查看文章列表list')
                break
            case '/listtable':
                setBreadName('查看文章列表table')
                break
            case '/means':
                setBreadName('文章编辑')
                break
            case '/edit':
                setBreadName('修改资料')
                break
            default:
                break
        }
    }, [pathname])
    return (
        <Breadcrumb style={{height: '30px', lineHeight: '30px'}}>
            <Breadcrumb.Item><a href='/'>Home</a></Breadcrumb.Item>
            <Breadcrumb.Item>
                <span>{breadName}</span>
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}
