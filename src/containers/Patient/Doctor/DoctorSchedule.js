import React, { Component } from 'react';
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import DoctorExtraInfor from './DoctorExtraInfor';  // 👈 Import component đã tách
import BookingModal from './Modal/BookingModal';
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: '',
      showModal: false,
      selectedTime:''// để lưu giờ khám đã chọn
    };
  }

  componentDidMount() {
    this.midnightTimer = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        this.forceUpdate();
      }
    }, 60000);
  }

  componentWillUnmount() {
    if (this.midnightTimer) {
      clearInterval(this.midnightTimer);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.allSchedules !== this.props.allSchedules &&
      this.props.allSchedules.length > 0
    ) {
      const uniqueDates = [...new Set(this.props.allSchedules.map(item => item.date))];
      const today = new Date().toISOString().split('T')[0];
      const futureDates = uniqueDates.filter(date => date >= today);
      const firstDate = futureDates[0] || '';
      if (firstDate !== this.state.selectedDate) {
        this.setState({ selectedDate: firstDate });
      }
    }
  }

  handleDateChange = (e) => {
    this.setState({ selectedDate: e.target.value });
  };

  // ham showmodal 
  handleSelectTime = (timeLabel) => {
    this.setState({
      showModal: true,
      selectedTime:timeLabel
    })
  }

  // ham dong modal 
  handleCloseModal = () => {
    this.setState({
      showModal: false,
      selectedTime:''
    })
  }
  render() {
    const {
      allSchedules,
      allTimes,
      language,
      priceItem,
      paymentItem,
      provinceItem,
      nameClinic,
      addressClinic,
      note,
      detailDoctor,
        provinces
    } = this.props;
    const { selectedDate } = this.state;

    const uniqueDates = [...new Set(allSchedules.map(item => item.date))];
    const today = new Date().toISOString().split('T')[0];
    const futureDates = uniqueDates.filter(date => date >= today);
    const schedulesByDate = allSchedules.filter(sch => sch.date === selectedDate);
    const times = schedulesByDate.length > 0 ? schedulesByDate[0].times : [];

    return (
      <div className="doctor-schedule-container">
        <div className="schedule-header">
          <span>🗓️ <FormattedMessage id="doctor-schedule.title" /></span>

          {futureDates.length > 1 ? (
            <select
              className="date-select"
              value={selectedDate}
              onChange={this.handleDateChange}
            >
              {futureDates.map((date, idx) => (
                <option key={idx} value={date}>{date}</option>
              ))}
            </select>
          ) : futureDates.length === 1 ? (
            <span className="single-date">{futureDates[0]}</span>
          ) : (
            <span><FormattedMessage id="doctor-schedule.no-schedule" /></span>
          )}
        </div>

        <div className="schedule-content">
          <div className="time-slots">
            {allTimes && allTimes.length > 0 && allTimes
              .filter(timeItem => times.includes(timeItem.key))
              .map((timeItem, idx) => {
                const timeLabel = language === LANGUAGES.EN ? timeItem.valueEn : timeItem.valueVi;

                let disabled = false;
                if (selectedDate === today) {
                  const now = new Date();
                  const [startHour, startMinute] = timeLabel.split(' - ')[0].split(':').map(Number);
                  const nowMinutes = now.getHours() * 60 + now.getMinutes();
                  const slotStartMinutes = startHour * 60 + startMinute;
                  if (nowMinutes >= slotStartMinutes) {
                    disabled = true;
                  }
                }

                return (
                  <button key={idx} className="time-slot-btn" disabled={disabled} onClick={()=>this.handleSelectTime(timeLabel)}>
                    {timeLabel}
                  </button>
                );
              })}
            {times.length === 0 && (
              <span><FormattedMessage id="doctor-schedule.no-schedule" /></span>
            )}
          </div>

          {/* 👇 Gọi DoctorExtraInfor để hiển thị clinic-info */}
          <DoctorExtraInfor
            nameClinic={nameClinic}
            addressClinic={addressClinic}
            provinceItem={provinceItem}
            priceItem={priceItem}
            paymentItem={paymentItem}
            note={note}
            language={language}
          />
          <BookingModal
            show={this.state.showModal}
            onHide={this.handleCloseModal}
            selectedTime={this.state.selectedTime}
            doctorData={this.props.detailDoctor}
                provinces={provinces}
          />
        </div>

        <div className="note">
          <small><FormattedMessage id="doctor-schedule.note" /></small>
        </div>
      </div>
    );
  }
}

export default DoctorSchedule;
