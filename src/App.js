import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import {Route, Link,Switch} from 'react-router-dom'
import employeePage from './components/employeePage';
import parkingLotPage from './components/parkingLotPage';
import parkingClerkPage from './components/parkingClerkPage';
import orderPage from './components/orderPage';
import dashboardPage from './components/dashboardPage';

const { Header, Sider, Content } = Layout;
class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          
            <Menu.Item key="1">
            <Link to = "/employeePage">
              <Icon type="team" />
              <span>員工管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
            <Link to = "/parkingLotPage">
              <Icon type="car" />
              <span>停車場管理</span>
          </Link>
            </Menu.Item>
            <Menu.Item key="3">
            <Link to = "/parkingClerkPage">
              <Icon type="user" />
              <span>停車員管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
            <Link to = "/dashboardPage">
              <Icon type="table" />
              <span>停車場Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
            <Link to = "/orderPage">
              <Icon type="form" />
              <span>訂單管理</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            <Switch>
              <Route path="/" exact component={()=><h1>home page</h1>}></Route>
              <Route path="/employeePage" component={employeePage}></Route>
              <Route path="/parkingLotPage" component={parkingLotPage}></Route>
              <Route path="/parkingClerkPage" component={parkingClerkPage}></Route>
              <Route path="/dashboardPage" component={dashboardPage}></Route>
              <Route path="/orderPage" component={orderPage}></Route> 
              <Route path="/nav3Page" component={()=><p style={{textAlign: 'center',marginTop:'15rem',color:'#1890ff', fontSize:'2rem'}}>Nav3 Page</p>}></Route>
          </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
