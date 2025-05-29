import React, { Component } from 'react';
import Slider from "react-slick";
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import './OutStandingDoctor.scss';

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
                doctors: [
            { id: 1, name: "Giáo sư, Tiến Sĩ Hỏi Dân IT", clinic: "Cơ Xương Khớp 5", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
            { id: 2, name: "Giáo sư, Tiến Sĩ Hỏi Dân IT", clinic: "Cơ Xương Khớp 6", avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
            { id: 3, name: "Giáo sư, Tiến Sĩ Hỏi Dân IT", clinic: "Cơ Xương Khớp", avatar: "https://randomuser.me/api/portraits/men/13.jpg" },
            { id: 4, name: "Giáo sư, Tiến Sĩ Hỏi Dân IT", clinic: "Cơ Xương Khớp 2", avatar: "https://randomuser.me/api/portraits/men/14.jpg" },
            { id: 5, name: "Giáo sư, Tiến Sĩ Hỏi Dân IT", clinic: "Cơ Xương Khớp 1", avatar: "https://randomuser.me/api/portraits/men/15.jpg" }
            ]

    };
  }

  render() {
   
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
               <Slider
                    {...this.props.sliderSettings}
                    slidesToShow={Math.min(this.state.doctors.length, 4)}
                    >

            {this.state.doctors.map((doctor) => (
              <div className='doctor-card' key={doctor.id}>
                <div className='img-container'>
                  <img src={doctor.avatar} alt="avatar" className='doctor-avatar' />
                </div>
                <div className='doctor-info'>
                  <div className='doctor-name'>{doctor.name}</div>
                  <div className='doctor-clinic'>{doctor.clinic}</div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  language: state.app.language
});

export default connect(mapStateToProps)(injectIntl(OutStandingDoctor));
