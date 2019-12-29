import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Menu, Icon } from 'antd';
import {Route, Link,Switch, withRouter, Redirect} from 'react-router-dom'
import employeePage from './components/employeePage';
import parkingLotPage from './components/parkingLotPage';
import parkingClerkPage from './components/parkingClerkPage';
import orderPage from './components/orderPage';
import dashboardPage from './components/dashboardPage';
import { getCurrentUser } from './util/APIUtils';
import Login from './user/login/Login';
import { Layout, notification } from 'antd';
import { ACCESS_TOKEN, USER_ROLE } from './constants';
import AppHeader from './common/AppHeader';
import Slider from './components/slider';
import PrivateRoute from './common/PrivateRoute';


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
  
  loadCurrentUser(history) {
    this.setState({
      isLoading: true
    });

    getCurrentUser()
    .then(response => 
      {
        if(response.roles.filter(role=>(role.name=='ROLE_MANAGER'||role.name=='ROLE_ADMIN')).length>0){
        this.setState({
          currentUser: response.name,
          isAuthenticated: true,
          isLoading: false
        });
        notification.success({
          message: 'BinLu Parking System',
          description: `Welcome，${response.name}。`,
        });
        if(response.roles.filter(role=>(role.name=='ROLE_MANAGER')).length>0){
          localStorage.setItem(USER_ROLE,'ROLE_MANAGER')
        }
        if(response.roles.filter(role=>(role.name=='ROLE_ADMIN')).length>0){
          localStorage.setItem(USER_ROLE,'ROLE_ADMIN')
        }
        this.props.history.push('/employeePage');
        }else{
        notification.error({
          message: 'BinLu Parking System',
          description: 'Invalid username or password. Please try again.'
        });
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(USER_ROLE);

        this.setState({
          currentUser: null,
          isAuthenticated: false
        });

        history.push("/login");
      }
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
      if(error.status === 401) {
        notification.error({
            message: 'BinLu Parking System',
            description: 'Invalid username or password. Please try again.'
        });                    
      } else if(error.status === 403) {
        notification.error({
            message: 'BinLu Parking System',
            description: 'Access denied. You do not have sufficient permission'
        });                    
      }else{
        notification.error({
            message: 'BinLu Parking System',
            description: error.message || 'System Error. Please contact technical support.'
        });                                            
    }
    });
  }

  componentDidMount() {
    //this.loadCurrentUser();
  }
  
  handleLogin(history) {
  
    this.loadCurrentUser(history);
    //this.props.history.push("/");
  }
  
  handleLogout(history) {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_ROLE)

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    history.push("/login");
    
    notification["success"]({
      message: 'BinLu Parking System',
      description: "Successfully logout."
    });
  }

  render() {
    return (

      <Layout>
	  <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />
        <Slider isLogin={this.state.isAuthenticated}/>
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
              <Route path="/" exact component={()=>
			  <div>
			  <h1 style={{textAlign: 'center',marginTop:'15rem',color:'#1890ff', fontSize:'2rem'}}>
			  Welcome to BinLu Parking System
			  </h1>
			  <audio autoplay><source src="./audio/Welcome.mp3"></source></audio>
			  </div>
			  
			  }></Route>
              <PrivateRoute path="/employeePage" authenticated={this.state.isAuthenticated} component={employeePage}></PrivateRoute>
              <PrivateRoute path="/parkingLotPage" authenticated={this.state.isAuthenticated} component={parkingLotPage}></PrivateRoute>
              <PrivateRoute path="/parkingClerkPage" authenticated={this.state.isAuthenticated} component={parkingClerkPage}></PrivateRoute>
              <PrivateRoute path="/dashboardPage" authenticated={this.state.isAuthenticated} component={dashboardPage}></PrivateRoute>
              <PrivateRoute path="/orderPage" authenticated={this.state.isAuthenticated} component={orderPage}></PrivateRoute> 
              <PrivateRoute path="/nav3Page" authenticated={this.state.isAuthenticated} component={()=><p style={{textAlign: 'center',marginTop:'15rem',color:'#1890ff', fontSize:'2rem'}}>Nav3 Page</p>}></PrivateRoute>
			        <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
              {/* <Redirect paht="*" to="/login"></Redirect> */}
          </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App);