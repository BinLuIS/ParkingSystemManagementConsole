import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';
import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <h1 className="page-title">登入</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: '冰露泊車',
                            description: '請核對您的用戶名稱及密碼, 並再次嘗試'
                        });                    
                    } else {
                        notification.error({
                            message: '冰露泊車',
                            description: error.message || '系統出現錯誤, 請再嘗試'
                        });                                            
                    }
                });
            }
        });
    }
	

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: '請輸入您的用戶名稱或電郵地址' }],
                    })(
                    <Input 
                        prefix={<Icon type="user" />}
                        size="large"
                        name="usernameOrEmail" 
                        placeholder="登入名稱" />    
                    )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '請輸入您的密碼' }],
                })(
                    <Input 
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="密碼"  />                        
                )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">登入</Button>
                    <br></br>
					<center><font size="5"><i>讓客人享受泊車</i></font></center>
                </FormItem>
            </Form>
        );
    }
}

// Or <Link to="/signup">register now!</Link>


export default Login;