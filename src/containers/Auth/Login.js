import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
//import { userService } from '../../services';
import userService from '../../services/userService';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage:''
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
    this.setState({ errMessage: '' });

    try {
        let response = await userService.handleLogin(this.state.username, this.state.password);
        const data = response?.data || response; // nếu bạn đã dùng axios interceptor thì bỏ .data

        if (data && data.errCode !== 0) {
            this.setState({
                errMessage: data.message || 'Something went wrong!'
            });
        }

        if (data && data.errCode === 0) {
            this.props.userLoginSuccess(data.user)// luu user vao cua hang redux 
            console.log('🎉 Login thành công!');
             this.props.navigate('/system/user-manage'); 
            // ví dụ: this.props.adminLoginSuccess(data.user);
        }

    } catch (error) {
        if (error.response?.data?.message) {
            this.setState({ errMessage: error.response.data.message });
        } else {
            this.setState({ errMessage: 'Something went wrong!' });
        }
    }
};


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
                           {this.state.errMessage && (
                            <div className='col-12' style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                        )}
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
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);







// Login.js (gọi dispatch)
//     ↓
// actions/userActions.js (tạo action object)
//     ↓
// reducers/appReducer.js (cập nhật state)
//     ↓
// rootReducer.js (kết hợp reducer)
//     ↓
// store/index.js (tạo store + persist)
//     ↓
// Provider → App nhận state mới

