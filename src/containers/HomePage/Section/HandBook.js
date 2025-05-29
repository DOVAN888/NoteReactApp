import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Handbook.scss"; // File CSS bạn đang dùng
import '../HomePage';
//import SpecialtyImg from "../../../assets/handbook/1.jpg"


// doi ngon ngu 
import { FormattedMessage } from 'react-intl'; // Thêm ở đầu file nếu chưa có


// mui ten 

class Handbook extends Component {
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
                <div className='section-handbook'>
              <div className='section-header'>
                    <span className='title-section'>
                        <FormattedMessage id="homepage.handbook-title" />
                    </span>
                    <button className='btn-section'>
                        <FormattedMessage id="homepage.All Articles" />
                    </button>
                </div>

                            <div className='handbook-content'>
                <Slider  {...this.props.sliderSettings}
                    slidesToShow={Math.min(this.state.images.length, 2)}
                >
                {this.state.images.map((img, index) => (
                    <div key={index}>
                    <div className="handbook-item">
                        <div className="left-img">
                        <img src={img.imageUrl} alt={`Slide ${index + 1}`} />
                        </div>
                        <div className="right-text">
                        7 Phòng khám Răng uy tín tại TP.HCM - Review Nha khoa
                        </div>
                    </div>
                    </div>
                ))}
                </Slider>


                    </div>


                </div>

    );
  }
}

export default Handbook;
