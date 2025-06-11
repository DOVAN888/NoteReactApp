import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { changeLanguageApp } from '../../store/actions/appActions'; // ✅ Import action đổi ngôn ngữ
import vn from '../../assets/flags/vn.png';
import en from '../../assets/flags/en.png';
import jp from '../../assets/flags/jp.png';
import { FormattedMessage, injectIntl } from 'react-intl'; // ✨ Hỗ trợ đổi ngôn ngữ quốc tế

class Header extends Component {
    state = {
        openLangMenu: false
    };

    LANGUAGES = [
        { code: 'vi', label: 'Tiếng Việt', icon: vn },
        { code: 'en', label: 'English', icon: en },
        { code: 'jp', label: '日本語', icon: jp }
    ];

    handleLangSelect = (code) => {
        this.setState({ openLangMenu: false });
        this.props.changeLanguageAppRedux(code);
    };

    render() {
        const { processLogout, language,userInfo } = this.props;
        const { openLangMenu } = this.state;
        const currentLang = this.LANGUAGES.find(l => l.code === language) || this.LANGUAGES[0];
        console.log('check userInfo:', userInfo);


        return (
            <div className="header-container">
                
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className='right-content'>
                    <span className='welcome'>
                        <FormattedMessage id="home-header.welcome" />
                        { userInfo && userInfo.firstName ? userInfo.firstName:''}!
                    </span>
                    <div className='lang-dropdown'>
                        <div className='lang-toggle' onClick={() => this.setState({ openLangMenu: !openLangMenu })}>
                            <img src={currentLang.icon} alt={currentLang.code} />
                        </div>
                        {openLangMenu && (
                            <div className='lang-menu'>
                                {this.LANGUAGES.map(lang => (
                                    <div key={lang.code} className='lang-item' onClick={() => this.handleLangSelect(lang.code)}>
                                        <img src={lang.icon} alt={lang.code} />
                                        <span>{lang.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Logout'>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
         userInfo:state.user.userInfo,
         language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (lang) => dispatch(changeLanguageApp(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
