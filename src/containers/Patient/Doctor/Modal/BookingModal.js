import React from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button, Input, FormGroup, Label
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import ProfileDoctor from '../ProfileDoctor';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import { toast } from 'react-toastify';

class BookingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',            // Họ tên bệnh nhân
      phone: '',           // Số điện thoại
      gender: 'M',         // Giới tính
      birthDate: '',       // Năm sinh
      province: null,      // Tỉnh thành (dạng object Select)
      district: '',        // Quận huyện
      address: '',         // Địa chỉ cụ thể
      reason: ''           // Lý do khám
    };
  }

  // ✅ Hàm xử lý khi nhấn "Xác nhận"
  handleConfirmBooking = () => {
  const {
    name, phone, gender, birthDate,
    province, district, address, reason
  } = this.state;
  const { selectedTime, doctorData, onHide } = this.props;

  // ✅ Validation đơn giản
  if (!name || !phone || !birthDate || !address || !reason || !province) {
    toast.error('Vui lòng nhập đầy đủ thông tin bắt buộc!');
    return;
  }

  if (!selectedTime || !doctorData?.id) {
    toast.error('Không tìm thấy thông tin bác sĩ hoặc lịch hẹn!');
    return;
  }

  // Tạo payload gửi đi
  const data = {
    patientName: name,
    phoneNumber: phone,
    gender,
    birthDate,
    province: province?.value || '',
    district,
    address,
    reason,
    time: selectedTime,
    doctorId: doctorData?.id,
  };

  // Gọi Redux action
  this.props.createBooking(data)
    .then(() => {
      toast.success('Đặt lịch thành công!');
      onHide(); // ✅ Đóng modal
      this.setState({
        name: '',
        phone: '',
        gender: 'M',
        birthDate: '',
        province: null,
        district: '',
        address: '',
        reason: ''
      });
    })
    .catch(() => {
      toast.error('Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại!');
    });
};


  render() {
    const {
      show,
      onHide,
      selectedTime,
      doctorData,
      provinces = [],
      language = 'vi'
    } = this.props;

    return (
      <Modal isOpen={show} toggle={onHide} centered>
        <ModalHeader toggle={onHide} className="custom-modal-header">
          <FormattedMessage id="booking.title" />
        </ModalHeader>

        <ModalBody>
          {/* 👨‍⚕️ Thông tin bác sĩ */}
          <ProfileDoctor
            doctor={doctorData}
            language={language}
            priceItem={{ valueVi: 250000 }}
          />

          <hr />

          {/* 🕐 Thời gian khám */}
          <p><strong><FormattedMessage id="booking.time" />:</strong> {selectedTime}</p>

          {/* 🔹 Đặt cho ai */}
          <FormGroup tag="fieldset">
            <legend><FormattedMessage id="booking.who" /></legend>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="forWhom" defaultChecked />{" "}
                <FormattedMessage id="booking.self" />
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="forWhom" />{" "}
                <FormattedMessage id="booking.family" />
              </Label>
            </FormGroup>
          </FormGroup>

          {/* 🧑‍💼 Họ tên */}
          <FormGroup>
            <Label><FormattedMessage id="booking.name" /></Label>
            <FormattedMessage id="booking.name">
              {placeholder => (
                <Input
                  placeholder={placeholder}
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              )}
            </FormattedMessage>
          </FormGroup>

          {/* 📞 Số điện thoại */}
          <FormGroup>
            <Label><FormattedMessage id="booking.phone" /></Label>
            <FormattedMessage id="booking.phone">
              {placeholder => (
                <Input
                  placeholder={placeholder}
                  value={this.state.phone}
                  onChange={(e) => this.setState({ phone: e.target.value })}
                />
              )}
            </FormattedMessage>
          </FormGroup>

          {/* ⚥ Giới tính */}
          <FormGroup tag="fieldset">
            <legend><FormattedMessage id="booking.gender" /></legend>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={this.state.gender === 'M'}
                  onChange={() => this.setState({ gender: 'M' })}
                />{" "}
                <FormattedMessage id="booking.male" />
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={this.state.gender === 'F'}
                  onChange={() => this.setState({ gender: 'F' })}
                />{" "}
                <FormattedMessage id="booking.female" />
              </Label>
            </FormGroup>
          </FormGroup>

          {/* 📅 Năm sinh */}
          <FormGroup>
            <Label><FormattedMessage id="booking.birth" /></Label>
            <Input
              type="date"
              value={this.state.birthDate}
              onChange={(e) => this.setState({ birthDate: e.target.value })}
            />
          </FormGroup>

          {/* 🗺️ Tỉnh / Thành */}
          <FormGroup>
            <Label><FormattedMessage id="booking.province" /></Label>
            <Select
              value={this.state.province}
              onChange={(selected) => this.setState({ province: selected })}
              options={provinces
                .filter(item => item.type === 'PROVINCE')
                .map(item => ({
                  value: item.key,
                  label: language === 'vi' ? item.valueVi : item.valueEn
                }))}
              placeholder={language === 'vi' ? '-- Chọn Tỉnh/Thành --' : '-- Select Province --'}
            />
          </FormGroup>

          {/* 🏘️ Quận huyện */}
          <FormGroup>
            <Label><FormattedMessage id="booking.district" /></Label>
            <Input
              value={this.state.district}
              onChange={(e) => this.setState({ district: e.target.value })}
            />
          </FormGroup>

          {/* 🏠 Địa chỉ */}
          <FormGroup>
            <Label><FormattedMessage id="booking.address" /></Label>
            <FormattedMessage id="booking.address">
              {placeholder => (
                <Input
                  placeholder={placeholder}
                  value={this.state.address}
                  onChange={(e) => this.setState({ address: e.target.value })}
                />
              )}
            </FormattedMessage>
          </FormGroup>

          {/* 💬 Lý do khám */}
          <FormGroup>
            <Label><FormattedMessage id="booking.reason" /></Label>
            <Input
              type="textarea"
              value={this.state.reason}
              onChange={(e) => this.setState({ reason: e.target.value })}
            />
          </FormGroup>

          {/* 💳 Thanh toán */}
          <FormGroup check>
            <Label check>
              <Input type="radio" checked readOnly />{" "}
              <FormattedMessage id="booking.paymentOnsite" />
            </Label>
          </FormGroup>
        </ModalBody>

        {/* ✅ Footer xác nhận / hủy */}
        <ModalFooter>
          <Button color="secondary" onClick={onHide}>
            <FormattedMessage id="booking.cancel" />
          </Button>
          <Button color="primary" className="confirm" onClick={this.handleConfirmBooking}>
            <FormattedMessage id="booking.confirm" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

// 📦 Map Redux state
const mapStateToProps = state => ({
  isBookingLoading: state.admin.isBookingLoading,
  bookingData: state.admin.bookingData,
  bookingError: state.admin.bookingError
});

// 🎯 Map Redux action
const mapDispatchToProps = dispatch => ({
  createBooking: (data) => dispatch(actions.createBookingStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
