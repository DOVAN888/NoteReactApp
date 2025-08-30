import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';


/**
 * DoctorExtraInfor is a React component that displays additional information about a doctor,
 * including clinic details, pricing, and payment information. It also provides functionality
 * to toggle the visibility of additional notes.
 *
 * Props:
 * @property {string} nameClinic - The name of the clinic.
 * @property {string} addressClinic - The address of the clinic.
 * @property {Object} provinceItem - The province information object containing localized values.
 * @property {Object} priceItem - The price information object containing localized values.
 * @property {Object} paymentItem - The payment information object containing localized values.
 * @property {string} note - Additional notes or details about the doctor.
 * @property {string} language - The current language setting (e.g., 'vi' for Vietnamese, 'en' for English).
 *
 * State:
 * @property {boolean} showNote - A flag indicating whether the additional note is visible.
 *
 * Methods:
 * @method handleToggleNote - Toggles the visibility of the additional note.
 * @method formatPrice - Formats the price based on the provided language and removes non-numeric characters.
 *
 * Usage:
 * This component is used to display detailed information about a doctor in a structured format.
 * It supports Localization for displaying text and formatting prices.
 */
class DoctorExtraInfor extends Component {  // 🔔 Đổi tên class
  constructor(props) {
    super(props);
    this.state = {
      showNote: false
    };
  }

  handleToggleNote = () => {
    this.setState((prevState) => ({ showNote: !prevState.showNote }));
    };
    // format price 
formatPrice = (price,language) => {
  if (!price) return '';
  const priceNumber = parseInt(price.replace(/\D/g, ''));  // Lấy số từ chuỗi
  return new Intl.NumberFormat(language === LANGUAGES.VI ? 'vi-VN' : 'en-US').format(priceNumber);
};
  render() {
    const {
      nameClinic,
      addressClinic,
      provinceItem,
      priceItem,
      paymentItem,
      note,
      language
    } = this.props;

    return (
      <div className="doctor-extra-infor">  {/* Có thể đổi tên class nếu muốn consistent */}
        <p><strong><FormattedMessage id="doctor-schedule.clinic-name" />:</strong> {nameClinic || ''}</p>
        <p><strong><FormattedMessage id="doctor-schedule.clinic-address" />:</strong> {addressClinic || ''}</p>
        <p><strong><FormattedMessage id="doctor-schedule.province" />:</strong> {provinceItem ? (language === LANGUAGES.VI ? provinceItem.valueVi : provinceItem.valueEn) : ''}</p>
        <p><strong><FormattedMessage id="doctor-schedule.payment" />:</strong> {paymentItem ? (language === LANGUAGES.VI ? paymentItem.valueVi : paymentItem.valueEn) : ''}</p>

                <p>
        <strong><FormattedMessage id="doctor-schedule.price" />:</strong>{' '}
        {priceItem
            ? `${this.formatPrice(language === LANGUAGES.VI ? priceItem.valueVi : priceItem.valueEn)} ${language === LANGUAGES.VI ? 'VND' : 'USD'}`
            : ''
        }
        </p>


        <p style={{ cursor: 'pointer', color: 'blue' }} onClick={this.handleToggleNote}>
          <FormattedMessage id={this.state.showNote ? "doctor-schedule.hide-detail" : "doctor-schedule.show-detail"} />
        </p>

        {this.state.showNote && (
          <p><strong><FormattedMessage id="doctor-schedule.price" />:</strong> {note || ''}</p>
        )}
      </div>
    );
  }
}

export default DoctorExtraInfor;  // 🔔 Đổi tên export
