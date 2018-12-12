import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Menu, Icon } from 'antd';
import {Route, Link,Switch, withRouter} from 'react-router-dom'
import employeePage from './components/employeePage';
import parkingLotPage from './components/parkingLotPage';
import parkingClerkPage from './components/parkingClerkPage';
import orderPage from './components/orderPage';
import dashboardPage from './components/dashboardPage';
import { getCurrentUser } from './util/APIUtils';
import Login from './user/login/Login';
import { Layout, notification } from 'antd';
import { ACCESS_TOKEN } from './constants';
import AppHeader from './common/AppHeader';


const { Header, Sider, Content } = Layout;
class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
	  collapsed: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
	{console.log(this.props)}
    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }
  

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  
  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response.name,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }
  
  handleLogin() {
    notification.success({
      message: 'Parking System',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }
  
  handleLogout(redirectTo="/login", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'Parking System',
      description: description,
    });
  }

  render() {
    return (

      <Layout>
	  <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />
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
             BinLuIS Parking Management System
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 750,
          }}
          >
          <body background="parking_lot.jpg"></body>
            <Switch>
              <Route path="/" exact component={()=><h1 style={{textAlign: 'center',marginTop:'15rem',color:'#1890ff', fontSize:'2rem'}}>歡迎登入冰露泊車</h1>}></Route>
              <Route path="/employeePage" component={employeePage}></Route>
              <Route path="/parkingLotPage" component={parkingLotPage}></Route>
              <Route path="/parkingClerkPage" component={parkingClerkPage}></Route>
              <Route path="/dashboardPage" component={dashboardPage}></Route>
              <Route path="/orderPage" component={orderPage}></Route> 
              <Route path="/nav3Page" component={()=><p style={{textAlign: 'center',marginTop:'15rem',color:'#1890ff', fontSize:'2rem'}}>Nav3 Page</p>}></Route>
			  <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
          </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App);
