// HomeFooter.js

import React, { Component } from "react";
import "./HomeFooter.scss";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <div className="footer-content">
          <div className="footer-left">
            <img
              src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg"
              alt="BookingCare logo"
              className="logo"
            />
            <div className="company-info">
              <p><strong>Công ty Cổ phần Công nghệ BookingCare</strong></p>
              <p>28 Thánh Thái, Dịch Vọng, Cầu Giấy, Hà Nội</p>
              <p>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</p>
              <div className="certifications">
                <img src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" alt="Đã đăng ký BCT" />
                <img src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" alt="Đã đăng ký BCT" />
              </div>
            </div>
          </div>
          <div className="footer-right">
            <div>
              <p><strong>Trụ sở tại Hà Nội</strong></p>
              <p>28 Thánh Thái, Dịch Vọng, Cầu Giấy, Hà Nội</p>
            </div>
            <div>
              <p><strong>Văn phòng tại TP HỒ CHÍ MINH</strong></p>
              <p>6/6 Cách Mạng Tháng Tám, P. Bến Thành, Quận 1</p>
            </div>
            <div>
              <p><strong>Hỗ trợ khách hàng</strong></p>
              <p>support@bookingcare.vn (7h - 18h)</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Vantuong React APP doctor</p>
        </div>
      </div>
    );
  }
}

export default HomeFooter;
