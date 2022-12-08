import React, { useEffect, useState } from 'react'
import './less/ListTable.less'
import { Button, Space, Table } from 'antd';
import { ArticleApi } from '../request/api';
import moment from 'moment/moment';

function MyTitle(props) {
    return (
        <div>
            <a href={'http://codesohigh.com:8765/article/' + props.id} target='blank' className='list_title'>{props.title}</a>
            <p style={{ color: '#999' }}>{props.subTitle}</p>
        </div>
    )
}

export default function ListTable() {

    const [arr, setArr] = useState([])

    const [pagination, setPagination] = useState({ current: 0, pageSize: 0, total: 0 })

    const getArticleList = (current, pageSize) => {
        ArticleApi({
            num: current,
            count: pageSize
        }).then((res) => {
            if (res.errCode === 0) {
                console.log(res.data);
                let { num, total } = res.data;
                setPagination({ current: num, pageSize: 10, total })

                let jsonArr = JSON.parse(JSON.stringify(res.data.arr))
                let myArr = []
                jsonArr.map(item => {
                    let obj = {
                        key: item.id,
                        date: moment(item.date).format('YYYY-MM-DD hh:mm:ss'),
                        myTitle: <MyTitle title={item.title} subTitle={item.subTitle} id={item.id} />
                    }

                    myArr.push(obj)
                });
                setArr(myArr)
            }
        })
    }

    useEffect(() => {
        getArticleList()
    }, [])

    const columns = [
        {
            dataIndex: 'myTitle',
            key: 'myTitle',
            width: '70%',
            render: text => <div>{text}</div>
        },
        {
            dataIndex: 'date',
            key: 'date',
            render: text => <p>{text}</p>
            
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => console.log(record.key)}>编辑</Button>
                    <Button type='primary' onClick={() => console.log(record.key)} danger>删除</Button>
                </Space>
            ),
        },
    ];

    const pageChange = (arg) => {
        getArticleList(arg.current, arg.pageSize)
    }


    return (
        <div className='list_table'>
            <Table
                showHeader={false}
                columns={columns}
                dataSource={arr}
                onChange={pageChange}
                pagination={pagination}

            />
        </div>
    )
}
