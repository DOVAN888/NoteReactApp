import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage, injectIntl } from 'react-intl'; // ✨ Hỗ trợ đổi ngôn ngữ quốc tế

//  Import cờ quốc gia
import vn from '../../assets/flags/vn.png';
import en from '../../assets/flags/en.png';
import jp from '../../assets/flags/jp.png';
import { changeLanguageApp } from '../../store/actions/appActions'; // ✅ Import action đổi ngôn ngữ

class HomeHeader extends Component {
    state = {
        //selectedLang: this.props.language || 'vi', // đồng bộ với Redux ban đầu
        openLangMenu: false
    };

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

   

    render() {
       
        const {  openLangMenu } = this.state;
        const currentLang = this.LANGUAGES.find(l => l.code === this.props.language) || this.LANGUAGES[0];
        const { intl } = this.props;
        const placeholderText = intl.formatMessage({ id: 'home-header.search.placeholder' });
         // console.log('check userInfo:',this.props.userInfo);
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        {/* Logo + menu */}
                        <div className='left-content'>
                            <i className="fa-solid fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>

                        {/* Menu giữa */}
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.speciality" /></b></div>
                                <div className='subs-title'>
                                    <FormattedMessage id="home-header.subs.speciality" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.health-facility" /></b></div>
                                <div className='subs-title'>
                                    <FormattedMessage id="home-header.subs.health-facility" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div className='subs-title'>
                                    <FormattedMessage id="home-header.subs.doctor" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.checkup-package" /></b></div>
                                <div className='subs-title'>
                                    <FormattedMessage id="home-header.subs.checkup-package" />
                                </div>
                            </div>
                        </div>

                        {/* Ngôn ngữ */}
                        <div className='right-content'>
                            <div className='support'><i className="fa-solid fa-circle-question"></i> <FormattedMessage id="home-header.support" /></div>
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
                        </div>
                    </div>
                </div>

                {/* Banner */}
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="banner.title1" /></div>
                        <div className='title2'><FormattedMessage id="banner.title2" /></div>
                        <div className='search'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type='text' placeholder={placeholderText} />
                        </div>
                    </div>

                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-solid fa-hospital"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage id="home-header.option.speciality" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-solid fa-mobile-retro"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage id="home-header.option.remote" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-solid fa-house-medical-circle-check"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage id="home-header.option.general" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-solid fa-microscope"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage id="home-header.option.test" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-solid fa-head-side-virus"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage id="home-header.option.mental" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-solid fa-tooth"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage id="home-header.option.dental" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
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
        changeLanguageAppRedux: (lang) => dispatch(changeLanguageApp(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomeHeader));
