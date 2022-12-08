import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import './assets/base.less'
import Header from './components/Header';
import Aside from './components/Aside';
import Bread from './components/Bread';

const { Content } = Layout;

const App = () => (
  <Layout id='app'>
    <Header />
    <div className='container'>
      <Aside />
      <Content>
        <div className='container_box'>
          <Bread />
          <div className="container_content">
            <Outlet />
          </div>
        </div>
      </Content>
    </div>
    <footer>
      Respect | Copyright &copy; 2022 Author xxx
    </footer>
  </Layout>
);

export default App;