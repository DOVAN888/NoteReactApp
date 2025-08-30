import React, { Component } from 'react';
import Slider from "react-slick";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Navigate } from 'react-router-dom';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import './OutStandingDoctor.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: []
    };
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.doctors !== this.props.doctors) {
      this.setState({
        arrDoctors: this.props.doctors
      });
    }
  }

  convertBufferToBase64(bufferData) {
    if (!bufferData || !Array.isArray(bufferData)) return '';
    const typedArray = new Uint8Array(bufferData);
    let binary = '';
    typedArray.forEach(byte => binary += String.fromCharCode(byte));
    return window.btoa(binary);
  }

  // ham di chuyen den detail doctor
 handleViewDetailDoctor = (doctor) => {
  if (this.props.history) {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  }
};

  render() {
    const { sliderSettings, language } = this.props;
    const { arrDoctors } = this.state;

    return (
      <div className='section-outstanding-doctor'>
        <div className='section-header'>
          <span className='title-section'>
            <FormattedMessage id="homepage.outstanding-doctor-title" />
          </span>
          <button className='btn-section'>
            <FormattedMessage id="homepage.more-button" />
          </button>
        </div>
 
        <div className='outstanding-content'>
  {arrDoctors.length > 0 && (
    <Slider
      {...sliderSettings}
      slidesToShow={Math.min(arrDoctors.length, 4)}
    >
      {arrDoctors.map((item, index) => {
        let nameVi = `${item.positionData?.valueVi || ''}, ${item.lastName || ''} ${item.firstName || ''}`;
        let nameEn = `${item.positionData?.valueEn || ''}, ${item.firstName || ''} ${item.lastName || ''}`;
        
        let imageBase64 = ''
          if (item.image) {

                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
              }

        return (
          <div className='doctor-card' key={item.id}>
            <div className='img-container'>
              <img src={imageBase64} alt="avatar" className='doctor-avatar' />
            </div>
            <div className='doctor-info'>
              <div className='doctor-name'>
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className='doctor-clinic'>{item.clinic || '...'}</div>

              {/* Nút chuyển trang chi tiết */}
              <button
                className="view-detail-button"
                onClick={() => this.handleViewDetailDoctor(item)}
              >
                    <FormattedMessage id="homepage.outstanding-doctor-detail" />
               
              </button>
            </div>
          </div>
        );
      })}
    </Slider>
  )}
</div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  language: state.app.language,
  doctors: state.admin.outstandingDoctors
});

const mapDispatchToProps = dispatch => ({
  loadTopDoctors: () => dispatch(actions.fetchOutstandingDoctorsStart())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(OutStandingDoctor)));
