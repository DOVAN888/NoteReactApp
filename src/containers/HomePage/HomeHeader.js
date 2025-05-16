import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
class HomeHeader extends Component {

    render() {
        

        return (
            <>
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i class="fa-solid fa-bars"></i>
                        <div className='header-logo'></div>
                      </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div><b>Chuyen khoa </b></div>
                            <div className='subs-title'>Tim bac sy chuyen khoa </div>
                        </div>
                        <div className='child-content'>
                            <div><b>Co so y te </b></div>
                            <div className='subs-title'>Chon benh vien  phong kham </div>
                        </div>
                        <div className='child-content'>
                            <div><b>Bac si  </b></div>
                            <div className='subs-title'>chon bac si gioi </div>
                        </div>
                        <div className='child-content'>
                            <div><b>Goi kham</b></div>
                            <div className='subs-title'>kham suc khoe tong quat</div>
                        </div>
                      </div>
                    <div className='right-content'>
                        <div className='support'><i className="fa-solid fa-circle-question"></i> Ho tro</div> 
                        <div className='flag'>VN</div>

                      </div>
                </div>
                </div>
                <div className='home-header-banner'>
                    <div className='title1'></div>
                    <div className='title2'></div>
                    <div className='search'></div>
                    <div className='options'></div>
                </div>
        </>
        );
    }

}


// doan nay la redux
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
