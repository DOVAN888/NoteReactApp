import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { userService } from '../../services';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword :false,
        }
    }
/// ham onchan name ,password
    handleOnChangeInputUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangeInputPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    // ham onclick 
    handleLogin = async () => {
        await userService.handleLogin(this.state.username, this.state.password);
    }
    // hien paswword bang con mat 

    handleShowHidePassword=()=>{
        this.setState({
            isShowPassword: !this.state.isShowPassword
            
             })
    }

    render() {
        return (
            <React.Fragment>
                <div className='login-background'>
                    <div className='login-container'>
                        <div className='login-content'>
                            <div className='col-12 text-login'>Login</div>
                            <div className='col-12 form-group login-input'>
                                <label>Username</label>
                                <input
                                    type='text'
                                    name='username'
                                    className='form-control'
                                    placeholder='Enter your username'
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeInputUsername(event)}
                                />
                            </div>
                         <div className='col-12 form-group login-input'>
                                <label>Password</label>
                                <div className='custom-input-password'>
                                    <input
                                        type={this.state.isShowPassword?'text':'password'}
                                        name='password'
                                        className='form-control'
                                        placeholder='Enter your password'
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnChangeInputPassword(event)}
                                    />
                                    <span onClick={()=>this.handleShowHidePassword()}>
                                        <i class={ this.state.isShowPassword?'fa-solid fa-eye':'fa-solid fa-eye-slash'}></i>
                                    </span>
                                 
                                </div>
                            </div>

                            <button className='btn-login'onClick={()=>this.handleLogin()}>Login</button>
                            <div className='col-12'>
                                <span className='forgot-password'>Forgot your password?</span>
                            </div>
                            <div className='col-12 text-center mt-5'>
                                <span className='text-other-login'>Or login with</span>
                            </div>
                            <div className='col-12 social-login'>
                                <i className="fab fa-google-plus-g google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
