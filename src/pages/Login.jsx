import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { LoginApi } from '../request/api';
import login from './less/login.less'
import Logo from '../assets/logo.png'

export default function Login() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    LoginApi({
      username: values.username,
      password: values.password
    }).then(res => {
      if(res.errCode === 0) {
        message.success(res.message)
        // 存储数据
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('player', res.data.player)
        localStorage.setItem('avatar', res.data.avatar)
        localStorage.setItem('editable', res.data.editable)
        localStorage.setItem('cms-token', res.data['cms-token'])
        // 跳转页面
        setTimeout(()=>{
          navigate('/')
        }, 1500)
      }else {
        message.error(res.message)
      }
    })
  };

  return (
    <div className="loginForm">
      <div className='login_box'>
        <img src={Logo} />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入你的账号!',
              },
            ]}
          >
            <Input placeholder='请输入账号' prefix={<UserOutlined />} size='large' />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入你的密码!',
              },
            ]}
          >
            <Input.Password placeholder='请输入密码' prefix={<LockOutlined />} size='large' />
          </Form.Item>

          <Form.Item>
            <Link to='../Register'>还没账号？点击注册</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size='large' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
