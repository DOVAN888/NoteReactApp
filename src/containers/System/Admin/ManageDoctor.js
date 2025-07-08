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

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: '',
      contentHTML: '',
      description: '',
      selectedDoctor: null,
      listDoctors: [],
    };
    this.mdParser = new MarkdownIt();
  }

  // Build dữ liệu select cho react-select
  buildDataInputSelect = (inputData) => {
    let result = [];
    const { language } = this.props;

    if (inputData && inputData.length > 0) {
      inputData.forEach((item) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }

    return result;
  };

  componentDidMount() {
    this.props.fetchAllDoctors();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.allDoctors !== this.props.allDoctors ||
      prevProps.language !== this.props.language
    ) {
      const dataSelect = this.buildDataInputSelect(this.props.allDoctors.data);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handSaveContentMarkdown = () => {
  const { selectedDoctor, contentHTML, contentMarkdown, description } = this.state;

  if (!selectedDoctor || !selectedDoctor.value) {
    alert('Vui lòng chọn bác sĩ hợp lệ');
    return;
  }

  if (!this.props.saveDetailDoctor) {
    console.error('❌ saveDetailDoctor prop is undefined!');
    return;
  }

  this.props.saveDetailDoctor({
    contentHTML,
    contentMarkdown,
    description,
    doctorId: selectedDoctor.value
  });
};

  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  handleOnChangeDesc = (event) => {
    this.setState({ description: event.target.value });
  };

  render() {
    const { isSavingDoctor } = this.props;

    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <h4>Tạo thông tin bác sĩ</h4>
        </div>

        <div className="more-infor">
          <div className="content-left form-group">
            <label>Chọn bác sĩ</label>
            <Select
              value={this.state.selectedDoctor}
              options={this.state.listDoctors}
              onChange={this.handleChange}
            />
          </div>

          <div className="content-right">
            <label>Thông tin giới thiệu</label>
            <textarea
              className="form-control"
              rows="4"
              value={this.state.description}
              onChange={this.handleOnChangeDesc}
            ></textarea>
          </div>
        </div>

        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: '400px' }}
            renderHTML={(text) => this.mdParser.render(text)}
            onChange={this.handleEditorChange}
            view={{ menu: true, md: true, html: true }}
          />
        </div>

        <button
          className="save-content-doctor"
          onClick={this.handSaveContentMarkdown}
          disabled={isSavingDoctor}
        >
          {isSavingDoctor ? 'Đang lưu...' : 'Lưu thông tin'}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    isSavingDoctor: state.admin.isSavingDoctor, // Thêm biến isSavingDoctor từ reducer
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctorsStart()),
   saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctorStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
