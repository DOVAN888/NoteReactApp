// About.js

import React, { Component } from "react";
import "./About.scss"; // hoặc đổi thành About.scss nếu bạn đã tạo riêng
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-about">
        <div className="section-header">
          <span className="title-section">
            <FormattedMessage id="homepage.video-title" />
          </span>
          <button className="btn-section">
            <FormattedMessage id="homepage.more-button" />
          </button>
        </div>

        <div className="about-content">
          <div className="video-container">
            <iframe
              width="560"
              height="315"
               src="https://www.youtube.com/embed/vnuvfqdwiZk?autoplay=1&mute=1&loop=1&playlist=vnuvfqdwiZk"
               title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div className="text-description">
            Ngày mình còn là sinh viên, đi học tại giảng đường đại học, có rất nhiều câu hỏi mà các thầy cô không giúp mình trả lời được, ví dụ như:  
            <br />
            “Để trở thành một lập trình viên website thì cần học những gì?”,  
            <br />
            “Học công nghệ thông tin, ra trường thường làm những gì?”, v.v.
          </div>
        </div>
      </div>
    );
  }
}

export default About;
