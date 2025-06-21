import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacilty from './Section/MedicalFacilty';
import OutStandingDoctor from './Section/OutStandingDoctor';
import Handbook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './Section/HomeFooter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function SampleNextArrow(props) {
  const { className, onClick } = props;
  return <div className={`${className} custom-arrow next-arrow`} onClick={onClick}>▶</div>;
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return <div className={`${className} custom-arrow prev-arrow`} onClick={onClick}>◀</div>;
}

class HomePage extends Component {
  render() {
    const settings = {
      dots: false,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 }},
        { breakpoint: 768, settings: { slidesToShow: 2 }},
        { breakpoint: 480, settings: { slidesToShow: 1 }}
      ]
    };

    return (
      <div>
        <HomeHeader />
        <Specialty sliderSettings={settings} />
        <MedicalFacilty  sliderSettings={settings} />
            <OutStandingDoctor sliderSettings={settings} />
         <Handbook sliderSettings={settings} />
         <About/>
         <HomeFooter/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(HomePage);
