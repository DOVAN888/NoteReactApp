import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './TableManageUserRedux.scss';
import { LANGUAGES } from '../../../utils/constant';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import userService from '../../../services/userService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.mdParser = new MarkdownIt();
    this.state = {
      contentMarkdown: '',
      contentHTML: '',
      description: '',
      selectedDoctor: null,
      listDoctors: [],
      selectedPrice: null,
      selectedPayment: null,
      selectedProvince: null,
      listPrice: [],
      listPayment: [],
      listProvince: [],
      clinicName: '',
      clinicAddress: '',
      note: '',
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllCode('PRICE');
    this.props.fetchAllCode('PAYMENT');
    this.props.fetchAllCode('PROVINCE');
  }

  componentDidUpdate(prevProps) {
    const {
      allDoctors,
      allPrices,
      allPayments,
      allProvinces,
      language,
    } = this.props;

    if (prevProps.allDoctors !== allDoctors || prevProps.language !== language) {
      const doctorOptions = this.buildDoctorOptions(allDoctors?.data || []);
      this.setState({ listDoctors: doctorOptions });
    }

    if (prevProps.allPrices !== allPrices || prevProps.language !== language) {
      const priceOptions = this.buildSelectOptions(allPrices);
      this.setState({ listPrice: priceOptions });
    }

    if (prevProps.allPayments !== allPayments || prevProps.language !== language) {
      const paymentOptions = this.buildSelectOptions(allPayments);
      this.setState({ listPayment: paymentOptions });
    }

    if (prevProps.allProvinces !== allProvinces || prevProps.language !== language) {
      const provinceOptions = this.buildSelectOptions(allProvinces);
      this.setState({ listProvince: provinceOptions });
    }
  }

  buildDoctorOptions = (data) => {
    const { language } = this.props;
    return data.map((doctor) => ({
      label:
        language === LANGUAGES.VI
          ? `${doctor.lastName} ${doctor.firstName}`
          : `${doctor.firstName} ${doctor.lastName}`,
      value: doctor.id,
    }));
  };

  buildSelectOptions = (data) => {
    const { language } = this.props;
    return data.map((item) => ({
      label: language === LANGUAGES.VI ? item.valueVi : item.valueEn,
      value: item.key,
    }));
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleSaveContentMarkdown = () => {
    const {
      selectedDoctor,
      contentHTML,
      contentMarkdown,
      description,
      selectedPrice,
      selectedPayment,
      selectedProvince,
      clinicName,
      clinicAddress,
      note,
    } = this.state;

    if (!selectedDoctor) {
      toast.error('Please select a doctor.');
      return;
    }

    if (!description || !contentHTML || !contentMarkdown) {
      toast.error('Please fill in all required fields.');
      return;
    }

    this.props.saveDetailDoctor({
      doctorId: selectedDoctor.value,
      contentHTML,
      contentMarkdown,
      description,
      priceId: selectedPrice?.value,
      paymentId: selectedPayment?.value,
      provinceId: selectedProvince?.value,
      clinicName,
      clinicAddress,
      note,
    });
  };

  handleChangeSelectDoctor = async (selectedDoctor) => {
    this.setState({ selectedDoctor });

    try {
      const res = await userService.getDetailInfordoctor(selectedDoctor.value);
      if (res.data && res.data.errCode === 0 && res.data.data) {
        const markdown = res.data.data.markdown || {};
        const info = res.data.data.doctor_infor || {};

        this.setState({
          contentHTML: markdown.contentHTML || '',
          contentMarkdown: markdown.contentMarkdown || '',
          description: markdown.description || '',
          selectedPrice: this.state.listPrice.find(
            (item) => item.value === info.priceId
          ) || null,
          selectedPayment: this.state.listPayment.find(
            (item) => item.value === info.paymentId
          ) || null,
          selectedProvince: this.state.listProvince.find(
            (item) => item.value === info.provinceId
          ) || null,
          clinicName: info.nameClinic || '',
          clinicAddress: info.addressClinic || '',
          note: info.note || '',
        });
      } else {
        this.setState({
          contentHTML: '',
          contentMarkdown: '',
          description: '',
          selectedPrice: null,
          selectedPayment: null,
          selectedProvince: null,
          clinicName: '',
          clinicAddress: '',
          note: '',
        });
      }
    } catch (error) {
      console.error('❌ Error fetching doctor details:', error);
    }
  };

  handleOnChangeInput = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  render() {
    const { isSavingDoctor } = this.props;
    const {
      listDoctors,
      selectedDoctor,
      description,
      contentMarkdown,
      listPrice,
      listPayment,
      listProvince,
      selectedPrice,
      selectedPayment,
      selectedProvince,
      clinicName,
      clinicAddress,
      note,
    } = this.state;

    return (
      <div className="container manage-doctor-container">
        <h4 className="text-center font-weight-bold mb-4">
          <FormattedMessage id="manageDoctor.title" />
        </h4>

        <div className="row">
          <div className="col-md-6 form-group">
            <label><FormattedMessage id="manageDoctor.chooseDoctor" /></label>
            <Select
              value={selectedDoctor}
              options={listDoctors}
              onChange={this.handleChangeSelectDoctor}
              placeholder={<FormattedMessage id="manageDoctor.chooseDoctor" />}
            />
          </div>
          <div className="col-md-6 form-group">
            <label><FormattedMessage id="manageDoctor.intro" /></label>
            <textarea
              className="form-control"
              rows="2"
              value={description}
              onChange={(e) => this.handleOnChangeInput(e, 'description')}
              
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 form-group">
            <label><FormattedMessage id="manageDoctor.choosePrice" /></label>
            <Select
              value={selectedPrice}
              options={listPrice}
              onChange={(selected) => this.setState({ selectedPrice: selected })}
               placeholder={<FormattedMessage id="manageDoctor.choosePrice" />}
            />
            
          </div>
          <div className="col-md-4 form-group">
            <label><FormattedMessage id="manageDoctor.choosePayment" /></label>
            <Select
              value={selectedPayment}
              options={listPayment}
              onChange={(selected) => this.setState({ selectedPayment: selected })}
              placeholder={<FormattedMessage id="manageDoctor.choosePayment" />}
            />
          </div>
          <div className="col-md-4 form-group">
            <label><FormattedMessage id="manageDoctor.chooseProvince" /></label>
            <Select
              value={selectedProvince}
              options={listProvince}
              onChange={(selected) => this.setState({ selectedProvince: selected })}
               placeholder={<FormattedMessage id="manageDoctor.chooseProvince" />}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 form-group">
            <label><FormattedMessage id="manageDoctor.clinicName" /></label>
            <input
              type="text"
              className="form-control"
              value={clinicName}
              onChange={(e) => this.handleOnChangeInput(e, 'clinicName')}
            />
          </div>
          <div className="col-md-4 form-group">
            <label><FormattedMessage id="manageDoctor.clinicAddress" /></label>
            <input
              type="text"
              className="form-control"
              value={clinicAddress}
              onChange={(e) => this.handleOnChangeInput(e, 'clinicAddress')}
            />
          </div>
          <div className="col-md-4 form-group">
            <label><FormattedMessage id="manageDoctor.note" /></label>
            <input
              type="text"
              className="form-control"
              value={note}
              onChange={(e) => this.handleOnChangeInput(e, 'note')}
            />
          </div>
        </div>

        <div className="form-group">
          <MdEditor
            style={{ height: '400px' }}
            renderHTML={(text) => this.mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={contentMarkdown}
          />
        </div>

        <div className="btn mt-2 mb-5">
          <button
            className="btn btn-primary"
            onClick={this.handleSaveContentMarkdown}
            disabled={isSavingDoctor}
          >
            {isSavingDoctor ? 'Saving...' : <FormattedMessage id="manageDoctor.save" />}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allDoctors: state.admin.allDoctors,
  allPrices: state.admin.allPrices,
  allPayments: state.admin.allPayments,
  allProvinces: state.admin.allProvinces,
  isSavingDoctor: state.admin.isSavingDoctor,
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllDoctors: () => dispatch(actions.fetchAllDoctorsStart()),
  saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctorStart(data)),
  fetchAllCode: (type) => dispatch(actions.fetchAllCodeStart(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
