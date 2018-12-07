import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import {Route, Link,Switch} from 'react-router-dom'
import WelcomePage from './components/WelcomePage';
import TablePage from './components/TablePage'

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
            <Link to = "/welcomePage">
              <Icon type="welcomePage" />
              <span>Welcome Page</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
            <Link to = "/tablePage">
              <Icon type="table" />
              <span>Table Page</span>
          </Link>
            </Menu.Item>
            <Menu.Item key="3">
            <Link to = "/nav3Page">
              <Icon type="upload" />
              <span>nav 3</span>
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
            <span>This is a Title</span>
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            {/* <p style={{textAlign: 'center',marginTop:'15rem',color:'#1890ff', fontSize:'2rem'}}>Welcome to our new Web APP</p> */}
            <Switch>
              <Route path="/" exact component={()=><h1>home page</h1>}></Route>
              <Route path="/welcomePage" component={WelcomePage}></Route>
              <Route path="/tablePage" component={TablePage}></Route>
              <Route path="/nav3Page" component={()=><p style={{textAlign: 'center',marginTop:'15rem',color:'#1890ff', fontSize:'2rem'}}>Nav3 Page</p>}></Route>
          </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
