import React from 'react'
import { Button, message, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { RegisterApi } from '../request/api';
import { useNavigate } from 'react-router-dom';
import login from './less/login.less'
import Logo from '../assets/logo.png'

export default function Register() {

  const navigate = useNavigate()

  const onFinish = (values) => {
    
    RegisterApi({
      username: values.username,
      password: values.password
    }).then(res => {
      console.log(res);
      if(res.errCode === 0) {
        message.success(res.message)
        setTimeout(() => navigate('/login'), 1500)
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

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('俩次输入密码不一致!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder='请确认密码' prefix={<LockOutlined />} size='large' />
          </Form.Item>

          <Form.Item>
            <Link to='../Login'>已有账号，点击登录</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size='large' block>
              点击注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
