import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import ScheduleTable from './ScheduleTable';
import './ManageSchedule.scss';

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: '',
      selectedDate: '',
      selectedTimes: [],
      listDoctors: []
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllTimesStart();

    const { userInfo } = this.props;
    if (userInfo?.roleId === 'R2') {
      console.log('Doctor login auto fetch schedules, doctorId:', userInfo.id);
      this.props.fetchSchedulesByDoctor(userInfo.id);
    }
  }

componentDidUpdate(prevProps) {
  const { allDoctors, language, userInfo, saveScheduleSuccess,deleteScheduleSuccess  } = this.props;
  const { selectedDoctor } = this.state; // 💡 Lấy selectedDoctor từ state hiện tại

  // 🔔 Nếu thay đổi doctor list, language, hoặc user → build lại listDoctors
  if (
    prevProps.allDoctors !== allDoctors ||
    prevProps.language !== language ||
    prevProps.userInfo !== userInfo
  ) {
    let doctorList = allDoctors?.data || [];
    if (userInfo?.roleId === 'R2') {
      doctorList = doctorList.filter(doc => doc.id === userInfo.id);
    }
    const doctorSelect = this.buildDoctorOptions(doctorList);
    this.setState({ listDoctors: doctorSelect });
  }

  // 🔔 Nếu save schedule thành công → reset selectedTimes + fetch schedule mới
  if (saveScheduleSuccess && prevProps.saveScheduleSuccess !== saveScheduleSuccess) {
    toast.success('Schedule saved successfully!');
    this.setState({ selectedTimes: [] });

    // 👇 Xác định doctorId chính xác để fetch lại lịch khám
    const doctorId = userInfo?.roleId === 'R2'
      ? userInfo.id
      : selectedDoctor?.value;

    if (doctorId) {
      this.props.fetchSchedulesByDoctor(doctorId);
    }
    }
     if (deleteScheduleSuccess && prevProps.deleteScheduleSuccess !== deleteScheduleSuccess) {
    toast.success('Deleted schedules successfully!');
  }
}


  buildDoctorOptions = (data) => {
    const { language } = this.props;
    return data.map((doctor) => ({
      label: language === LANGUAGES.VI
        ? `${doctor.lastName} ${doctor.firstName}`
        : `${doctor.firstName} ${doctor.lastName}`,
      value: doctor.id
    }));
  };

  handleDoctorChange = (selectedOption) => {
    console.log('Doctor selected from dropdown:', selectedOption);

    this.setState({ selectedDoctor: selectedOption });

    const { userInfo } = this.props;
    if (userInfo?.roleId === 'R1' && selectedOption) {
      console.log('Admin is fetching schedules for doctorId:', selectedOption.value);
      this.props.fetchSchedulesByDoctor(selectedOption.value);
    }
  };

  handleSelectTime = (key) => {
    let selectedTimes = [...this.state.selectedTimes];
    if (selectedTimes.includes(key)) {
      selectedTimes = selectedTimes.filter(t => t !== key);
    } else {
      selectedTimes.push(key);
    }
    this.setState({ selectedTimes });
  };

  handleSave = () => {
    const { selectedDoctor, selectedDate, selectedTimes } = this.state;
    const { userInfo } = this.props;

    const doctorId = userInfo?.roleId === 'R2' ? userInfo.id : selectedDoctor?.value;

    console.log('Attempt to save schedule with:', {
      doctorId,
      selectedDate,
      selectedTimes
    });

    if (!doctorId || !selectedDate || selectedTimes.length === 0) {
      toast.error('Please select doctor, date and at least one time slot!');
      return;
    }

    const scheduleData = {
      doctorId,
      date: selectedDate,
      times: [...selectedTimes]
    };

    this.props.saveDoctorSchedule(scheduleData);

    if (userInfo?.roleId === 'R2') {
      console.log('Doctor self-refresh schedules after save');
      this.props.fetchSchedulesByDoctor(userInfo.id);
    }
    };
    
 // handleDelete date time by doctor
    handleDelete = (date) => {
  const { selectedDoctor } = this.state;
  const { userInfo } = this.props;

  const doctorId = userInfo?.roleId === 'R2' ? userInfo.id : selectedDoctor?.value;

  if (!doctorId || !date) {
    toast.error('Missing doctor or date for delete!');
    return;
  }

  this.props.deleteSchedulesByDate(doctorId, date);
};


  render() {
    const { selectedDoctor, selectedDate, selectedTimes, listDoctors } = this.state;
    const { allTimes, language, isSavingSchedule, userInfo, allSchedules } = this.props;

    console.log('Render ManageSchedule, current allSchedules:', allSchedules);

    return (
      <div className="schedule-container">
        <div className="title">
          <FormattedMessage id="manage-schedule.title" />
        </div>

        {isSavingSchedule && <div className="loading">Saving schedule...</div>}

        {userInfo?.roleId === 'R1' && (
          <div className="form-group">
            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
            <Select
              value={selectedDoctor}
              onChange={this.handleDoctorChange}
              options={listDoctors}
              placeholder="-- Choose Doctor --"
            />
          </div>
        )}

        <div className="form-group">
          <label><FormattedMessage id="manage-schedule.choose-date" /></label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => this.setState({ selectedDate: e.target.value })}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="time-slots">
          {allTimes && allTimes.length > 0 && allTimes.map((timeItem, idx) => {
            const timeLabel = language === LANGUAGES.VI ? timeItem.valueVi : timeItem.valueEn;
            const isSelected = selectedTimes.includes(timeItem.key);

            return (
              <button
                key={idx}
                className={`btn-time ${isSelected ? 'selected' : ''}`}
                onClick={() => this.handleSelectTime(timeItem.key)}
                disabled={!selectedDate}
              >
                {timeLabel}
              </button>
            );
          })}
        </div>

        <button className="btn-save mt-2" onClick={this.handleSave}>
          <FormattedMessage id="manage-schedule.save-button" />
        </button>

        <div className="section-divider" />
        <h3 className="mt-4"><FormattedMessage id="schedule-list.title" defaultMessage="Danh sách lịch khám" /></h3>

        {userInfo?.roleId === 'R1' && (
          <div className="form-group">
            <Select
              value={selectedDoctor}
              onChange={this.handleDoctorChange}
              options={listDoctors}
              placeholder="-- Chọn bác sĩ để xem lịch --"
            />
          </div>
        )}

        <ScheduleTable
            schedules={allSchedules}
            allTimes={this.props.allTimes}  // ⚠️ thêm dòng này!
                language={this.props.language}
                onDelete={this.handleDelete}
            />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  allDoctors: state.admin.allDoctors,
  language: state.app.language,
  userInfo: state.user.userInfo,
  allTimes: state.admin.allTimes,
  isSavingSchedule: state.admin.isSavingSchedule,
  saveScheduleSuccess: state.admin.saveScheduleSuccess,
    allSchedules: state.admin.allSchedules,
    deleteScheduleSuccess :state.admin.deleteScheduleSuccess 
  
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllDoctors: () => dispatch(actions.fetchAllDoctorsStart()),
  fetchAllTimesStart: () => dispatch(actions.fetchAllTimesStart()),
  saveDoctorSchedule: (data) => dispatch(actions.saveDoctorSchedule(data)),
    fetchSchedulesByDoctor: (doctorId) => dispatch(actions.fetchSchedulesByDoctor(doctorId)),
  deleteSchedulesByDate: (doctorId, date) => dispatch(actions.deleteSchedulesByDate(doctorId, date))

});

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
