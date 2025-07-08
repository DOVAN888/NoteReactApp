import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor:{}
        }
    }

   async componentDidMount() {
       if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
           let res = await userService.getDetailInfordoctor(id)
           if (res.data && res.data.errCode === 0) {
               this.setState({
                detailDoctor: res.data.data
                });

           }
           console.log(res)

            
        }
        
    }

    componentDidUpdate(prevProps,prevState,snapshot) {
        
    }
    render() {
        
         console.log(this.props.match.params.id)
        console.log("check state", this.state)
        let {language} = this.props
        let { detailDoctor } = this.state
       let nameVi = '', nameEn = '';

            if (detailDoctor && detailDoctor.positionData) {
                nameVi = `${detailDoctor.positionData?.valueVi || ''}, ${detailDoctor.lastName || ''} ${detailDoctor.firstName || ''}`;
                nameEn = `${detailDoctor.positionData?.valueEn || ''}, ${detailDoctor.firstName || ''} ${detailDoctor.lastName || ''}`;
            }

        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left' style={{backgroundImage :`url(${detailDoctor &&detailDoctor.image? detailDoctor.image:''})`}}>
                            

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                              {language === LANGUAGES.VI?nameVi:nameEn}
                            </div>
                            <div className='down'>
                                {detailDoctor && detailDoctor.markdown && detailDoctor.markdown.description &&
                                    
                                    <span>
                                        {detailDoctor.markdown.description}
                                </span>
                                } 
                            </div>

                        </div>

                    </div>
                    <div className='schedule-doctor'>

                    </div>
                    <div className="detail-infor-doctor">
                        {detailDoctor &&
                            detailDoctor.markdown &&
                            detailDoctor.markdown.contentHTML && (
                            <div
                                dangerouslySetInnerHTML={{
                                __html: detailDoctor.markdown.contentHTML,
                                }}
                            ></div>
                        )}
                        </div>

                    <div className='comment-doctor'>

                    </div>
            </div>
             </>
        );
    }
}

const mapStateToProps = state => {
    return {
     language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
