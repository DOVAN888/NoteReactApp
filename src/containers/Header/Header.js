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
        selectedLang :this.props.language||'vi',// dong bo voi redux
        openLangMenu:false
    }

    //  Danh sách ngôn ngữ có sẵn
    LANGUAGES = [
        { code: 'vi', label: 'Tiếng Việt', icon: vn },
        { code: 'en', label: 'English', icon: en },
        { code: 'jp', label: '日本語', icon: jp }
    ];


    //  Khi click chọn ngôn ngữ
    handleLangSelect = (code) => {
        this.setState({ selectedLang: code, openLangMenu: false });
        this.props.changeLanguageAppRedux(code); //  Dispatch Redux để đổi ngôn ngữ
    };

    //  Cũng cho phép đổi qua click trong các block riêng (ví dụ ở banner)
    changeLanguage = (lang) => {
        this.setState({ selectedLang: lang });
        this.props.changeLanguageAppRedux(lang);
    }
    render() {
        const { processLogout } = this.props;
            const { selectedLang, openLangMenu } = this.state;
        const currentLang = this.LANGUAGES.find(l => l.code === selectedLang);

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

             <div className='right-content'>
                            {/* <div className='support'><i className="fa-solid fa-circle-question"></i> <FormattedMessage id="home-header.support" /></div> */}
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
                  <i class="fa-solid fa-right-from-bracket"></i>
                </div>
             </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
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
