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
          人体の構造は、私たちの生命活動を支える驚異的なシステムです。  
          <br />
          解剖学では、心臓、肺、脳などの臓器や、血管、神経系などの仕組みを詳細に学びます。  
          <br />
          医学を学ぶ上で、身体の構造を理解することは診断・治療の基盤となります。  
          <br />
          この知識は医師、看護師、理学療法士などの医療従事者にとって不可欠です。
        </div>

        </div>
      </div>
    );
  }
}

export default About;
