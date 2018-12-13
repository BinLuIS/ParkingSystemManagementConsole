import React, { Component } from 'react'
import '../App.css';
import { Menu, Icon, Layout} from 'antd';
import {Route, Link,Switch, withRouter} from 'react-router-dom'


const { Header, Sider, Content } = Layout;
export default class slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
          collapsed: false
        }
    }
    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
  render() {
    if(this.props.isLogin)
    return (
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
    )
    else
    return(<div></div>)
  }
}
