import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import * as actions from '../../../store/actions';
import ProfileDoctor from './ProfileDoctor'; // ✅ Đã dùng

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }

  async componentDidMount() {
    if (this.props.match?.params?.id) {
      const id = this.props.match.params.id;
      const res = await userService.getDetailInfordoctor(id);
      if (res.data?.errCode === 0) {
        this.setState({ detailDoctor: res.data.data });
      }

      // Lấy thêm dữ liệu lịch và các mã
      this.props.fetchAllTimesStart();
      this.props.fetchSchedulesByDoctor(id);
    }

    this.props.fetchAllCode('PRICE');
    this.props.fetchAllCode('PAYMENT');
    this.props.fetchAllCode('PROVINCE');
  }

  render() {
    const {
      language,
      allTimes,
      allSchedules,
      allPrices,
      allPayments,
      allProvinces
    } = this.props;

    const { detailDoctor } = this.state;

    // Tính giá, hình thức thanh toán, tỉnh thành từ allCodes
    let priceItem = null, paymentItem = null, provinceItem = null;
    if (detailDoctor?.doctor_infor) {
      priceItem = allPrices.find(p => p.key === detailDoctor.doctor_infor.priceId);
      paymentItem = allPayments.find(p => p.key === detailDoctor.doctor_infor.paymentId);
      provinceItem = allProvinces.find(p => p.key === detailDoctor.doctor_infor.provinceId);
    }

    const nameClinic = detailDoctor?.doctor_infor?.nameClinic || '';
    const addressClinic = detailDoctor?.doctor_infor?.addressClinic || '';
    const note = detailDoctor?.doctor_infor?.note || '';

    return (
      <>
        <HomeHeader isShowBanner={false} />

        <div className='doctor-detail-container'>
          {/* ✅ Hiển thị ảnh, tên, mô tả, giá bằng component tái sử dụng */}
          <ProfileDoctor
            doctor={detailDoctor}
            language={language}
            priceItem={priceItem}
          />

          {/* ✅ Lịch khám */}
          <div className='schedule-doctor'>
            <DoctorSchedule
              doctorId={detailDoctor.id}
              allTimes={allTimes}
              allSchedules={allSchedules}
              language={language}
              priceItem={priceItem}
              paymentItem={paymentItem}
              provinceItem={provinceItem}
              nameClinic={nameClinic}
              addressClinic={addressClinic}
              note={note}
              detailDoctor={detailDoctor}
              provinces={this.props.allProvinces}
            />
          </div>

          {/* ✅ Nội dung HTML chi tiết bác sĩ */}
          <div className="detail-infor-doctor">
            {detailDoctor?.markdown?.contentHTML && (
              <div dangerouslySetInnerHTML={{ __html: detailDoctor.markdown.contentHTML }} />
            )}
          </div>

          <div className='comment-doctor'>
            {/* Future: Hiển thị bình luận người dùng */}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  language: state.app.language,
  allTimes: state.admin.allTimes,
  allSchedules: state.admin.allSchedules,
  allPrices: state.admin.allPrices,
  allPayments: state.admin.allPayments,
  allProvinces: state.admin.allProvinces,
});

const mapDispatchToProps = dispatch => ({
  fetchAllTimesStart: () => dispatch(actions.fetchAllTimesStart()),
  fetchSchedulesByDoctor: (doctorId) => dispatch(actions.fetchSchedulesByDoctor(doctorId)),
  fetchAllCode: (type) => dispatch(actions.fetchAllCodeStart(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
