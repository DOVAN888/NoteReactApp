import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { FormattedMessage, injectIntl } from 'react-intl';

//  Import cờ quốc gia
import vn from '../../assets/flags/vn.png';
import en from '../../assets/flags/en.png';
import jp from '../../assets/flags/jp.png';
import { changeLanguageApp } from '../../store/actions/appActions';

class HomeHeader extends Component {
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

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push('/home');
        }
    };

    render() {
        const { openLangMenu } = this.state;
        const currentLang = this.LANGUAGES.find(l => l.code === this.props.language) || this.LANGUAGES[0];
        const { intl } = this.props;
        const placeholderText = intl.formatMessage({ id: 'home-header.search.placeholder' });

        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        {/* Logo + menu */}
                        <div className='left-content'>
                            <i className="fa-solid fa-bars"></i>
                            <div
                                className='header-logo'
                                onClick={this.returnToHome}
                            ></div>
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
                            <div className='support'>
                                <i className="fa-solid fa-circle-question"></i> <FormattedMessage id="home-header.support" />
                            </div>
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
                {this.props.isShowBaner === true &&
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
                                {/* Các option-child giữ nguyên */}
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
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (lang) => dispatch(changeLanguageApp(lang))
    };
};

// Sửa cú pháp export đúng:
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomeHeader)));
