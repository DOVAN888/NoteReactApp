import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MedicalFacilty.scss"; // File CSS bạn đang dùng
import '../HomePage';
//import SpecialtyImg from "../../../assets/medicalFacilty/1.jpg"


// doi ngon ngu 
import { FormattedMessage } from 'react-intl'; // Thêm ở đầu file nếu chưa có


// mui ten 

class MedicalFacilty extends Component {
  constructor(props) {
    super(props);
   this.state = {
        images: [
            { imageUrl: "https://picsum.photos/id/1015/300/200" },
            { imageUrl: "https://picsum.photos/id/1016/300/200" },
            { imageUrl: "https://picsum.photos/id/1018/300/200" },
            { imageUrl: "https://picsum.photos/id/1020/300/200" },
            { imageUrl: "https://picsum.photos/id/1024/300/200" }
        ]
        };

  }

    render() {
      
  

    return (
                <div className='section-medicalFacilty'>
              <div className='section-header'>
                    <span className='title-section'>
                        <FormattedMessage id="homepage.medical-facility-title" />
                    </span>
                    <button className='btn-section'>
                        <FormattedMessage id="homepage.search" />
                    </button>
                </div>

                <div className='medicalFacilty-content'>
                    <Slider {...this.props.sliderSettings}>
                    {this.state.images.map((img, index) => (
                        <div key={index}>
                        <img src={img.imageUrl} alt={`Slide ${index + 1}`} className="slide-img" />
                        <h5>medicalFatilty</h5>
                        </div>
                    ))}
                    </Slider>
                </div>
                </div>

    );
  }
}

export default MedicalFacilty;
