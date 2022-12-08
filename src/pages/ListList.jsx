import React, { useEffect, useState } from 'react'
import { List, Skeleton } from 'antd';
import { ArticleApi } from '../request/api'
import moment from 'moment/moment';
import './less/ListList.less'

export default function ListList() {

  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // 请求封装
  const getList = (num) => {
    ArticleApi({
      num,
      count: pageSize
    }).then(res => {
      if (res.errCode === 0) {
        let { arr, total, num, count } = res.data;
        setList(arr)
        setTotal(total)
        setCurrent(num)
        setPageSize(count)
      }
    })
  }

  // 请求列表数据
  useEffect(() => {
    getList(current)
  }, [])

  // 分页
  const onChange = (pages) => {
    getList(pages)
  }

  return (
    <div className='listlist' style={{ padding: '20px' }}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        onChange={onChange}
        renderItem={(item) => (
          <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
          >
            <Skeleton title={false} loading={item.loading} active>
              <List.Item.Meta
                title={<a href='#'>{item.title}</a>}
                description={item.subTitle}
              />
              <div>{moment(item.date).format('YYYY-MM-DD hh:mm:ss')}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}