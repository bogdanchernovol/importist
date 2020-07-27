import React, { Component } from 'react';
import {Col, Layout, Menu, Row, Sider} from '../../utils/antd';
import './styles.less';

class AppLayout extends Component {
    constructor(props){
        super(props);
        this.state = this.initState();
    }

    render() {
      return (
          <Layout className='app-layout'>
            <Sider width={250} className='app-sider'>
              <Row className='sider-logo-container'>
                  <Col span={4} className='sider-logo'></Col>
                  <Col span={20} className='sider-logo-caption'>IMPORTIST</Col>
              </Row>
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className='app-sider-menu'>
                <Menu.Item key="1" className='app-menu-item'>
                  <img src={''} className='app-sider-icon' alt=''/>
                  <span>All Messages</span>
                </Menu.Item>
                <Menu.Item key="2" className='app-menu-item'>
                  <span>All Projects</span>
                </Menu.Item>
              </Menu>
              <div className='app-menu-container'>
                <p className='view-selected'>VIEW SELECTED</p>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className='app-sider-menu'>
                  <Menu.Item key="1" className='app-menu-item'>
                    <img src={''} className='app-sider-icon' alt=''/>
                    <span>My Products</span>
                  </Menu.Item>
                  <Menu.Item key="2" className='app-menu-item'>
                    <img src={''} className='app-sider-icon' alt=''/>
                    <span>Suppliers</span>
                  </Menu.Item>
                  <Menu.Item key="3" className='app-menu-item'>
                    <img src={''} className='app-sider-icon' alt=''/>
                    <span>Messages</span>
                  </Menu.Item>
                  <Menu.Item key="4" className='app-menu-item'>
                    <img src={''} className='app-sider-icon' alt=''/>
                    <span>Project Settings</span>
                  </Menu.Item>
                </Menu>
              </div>
            </Sider>
            {this.props.children}
          </Layout>
      );
    }

    initState = () =>{
        return {
        }
    }
};

export default AppLayout;
