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
import { ACCESS_TOKEN, MANAGER_ID } from './constants';
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
  
  loadCurrentUser(history) {
    this.setState({
      isLoading: true
    });

    getCurrentUser()
    .then(response => 
      {
        if(response.roles.filter(role=>role.name=='ROLE_MANAGER').length>0){
        this.setState({
          currentUser: response.name,
          isAuthenticated: true,
          isLoading: false
        });
        notification.success({
          message: 'Parking System',
          description: "You're successfully logged in.",
        });
        
        console.log(history)
        this.props.history.push('/parkingClerkPage');
        console.log(history)
      }else{
        notification.error({
          message: 'Parking System',
          description: 'Your Username or Password is incorrect. Please try again!'
        });
        localStorage.removeItem(ACCESS_TOKEN);

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

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    history.push("/login");
    
    notification["success"]({
      message: 'Parking System',
      description: "You're successfully logged out."
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
			  歡迎登入冰露泊車
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