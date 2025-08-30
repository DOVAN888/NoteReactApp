import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils/constant';
import { CommonUtils } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUserRedux from './TableManageUserRedux';
import { toast } from 'react-toastify';
import Select from 'react-select';

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      gender: '',
      position: '',
      role: '',
      previewImgURL: '',
      isOpen: false,
      image: null,
      editUser: null,
      action: ''
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

 componentDidUpdate(prevProps) {
  const { language } = this.props;

  if (prevProps.language !== language ||
      prevProps.genderRedux !== this.props.genderRedux) {
    const genderOptions = this.buildOptions(this.props.genderRedux);
    this.setState({ genderArr: genderOptions });
  }

  if (prevProps.language !== language ||
      prevProps.positionRedux !== this.props.positionRedux) {
    const positionOptions = this.buildOptions(this.props.positionRedux);
    this.setState({ positionArr: positionOptions });
  }

  if (prevProps.language !== language ||
      prevProps.roleRedux !== this.props.roleRedux) {
    const roleOptions = this.buildOptions(this.props.roleRedux);
    this.setState({ roleArr: roleOptions });
  }
}


  buildOptions = (arr) => {
    const { language } = this.props;
    return arr.map(item => ({
      label: language === LANGUAGES.VI ? item.valueVi : item.valueEn,
      value: item.key
    }));
  };

  handleEditUserFromTable = (user) => {
    let imageBase64 = '';

    if (user.image) {
      try {
        imageBase64 = new Buffer(user.image, 'base64').toString('binary');
      } catch (error) {
        console.error('⚠️ Lỗi chuyển đổi ảnh base64:', error);
      }
    }

    this.setState({
      editUser: user,
      email: user.email || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      address: user.address || '',
      gender: user.gender || '',
      phoneNumber: user.phonenumber || '',
      role: user.roleId || '',
      position: user.positionId || '',
      image: '',
      previewImgURL: imageBase64,
      password: '',
      action: CRUD_ACTIONS.EDIT
    }, () => {
      if (this.formRef?.current) {
        this.formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let ObjectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: ObjectUrl,
        image: base64
      });
    }
  };

  checkValidateInput = () => {
    const { email, password, phoneNumber, firstName, lastName, address, editUser } = this.state;
    if (!email || (!editUser && !password) || !phoneNumber || !firstName || !lastName || !address) {
      toast.error(' Please fill in all required fields.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('📧 Invalid email format.');
      return false;
    }

    if (!editUser && password.length < 6) {
      toast.error('🔒 Password must be at least 6 characters.');
      return false;
    }

    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error('📱 Phone number must be exactly 9 digits.');
      return false;
    }

    return true;
  };

  openPreviewImgUrl = () => {
    if (!this.state.previewImgURL) return;
    this.setState({ isOpen: true });
  };

  handleSaveUser = async () => {
    if (!this.checkValidateInput()) return;

    const userData = {
      id: this.state.editUser?.id,
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      gender: this.state.gender,
      phonenumber: this.state.phoneNumber,
      roleId: this.state.role,
      positionId: this.state.position,
      image: this.state.image || null
    };

    try {
      let res;
      if (this.state.editUser) {
        res = await this.props.editUserRedux(userData);
      } else {
        res = await this.props.createNewUser(userData);
      }

      if (res && res.errCode === 0) {
        toast.success(this.state.editUser ? '✏️ Update success!' : '✅ Create success!');
        await this.props.fetchUserRedux();
        this.setState({
          action: CRUD_ACTIONS.CREATE,
          editUser: null,
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          address: '',
          gender: '',
          position: '',
          role: '',
          previewImgURL: '',
          image: null
        });
      } else {
        toast.error(res?.message || '❌  Error. Something went wrong.');
      }
    } catch (error) {
      toast.error('🚨 Server Error!');
    }
  };

  render() {
    return (
      <div className='user-redux-container'>
        <div className='title'>User Redux</div>
        <div className='user-redux-body' ref={this.formRef}>
          <div className='container'>
            <div className='row'>
              <div className='col-12 my-3 fw-bold fs-3'>
                <FormattedMessage id="manage-user.add" />
              </div>

              {/* Email */}
              <div className='col-6'>
                <label><FormattedMessage id="manage-user.email" /></label>
                <input
                  className='form-control'
                  type='text'
                  name='email'
                  value={this.state.email}
                  onChange={this.handleChange}
                  disabled={this.state.action === CRUD_ACTIONS.EDIT}
                />
              </div>

              {/* Password */}
              <div className='col-6'>
                <label><FormattedMessage id="manage-user.password" /></label>
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                  disabled={this.state.action === CRUD_ACTIONS.EDIT}
                />
              </div>

              {/* First Name */}
              <div className='col-6'>
                <label><FormattedMessage id="manage-user.firstName" /></label>
                <input
                  className='form-control'
                  type='text'
                  name='firstName'
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>

              {/* Last Name */}
              <div className='col-6'>
                <label><FormattedMessage id="manage-user.lastName" /></label>
                <input
                  className='form-control'
                  type='text'
                  name='lastName'
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>

              {/* Phone */}
              <div className='col-6'>
                <label><FormattedMessage id="manage-user.phoneNumber" /></label>
                <input
                  className='form-control'
                  type='text'
                  name='phoneNumber'
                  value={this.state.phoneNumber}
                  onChange={this.handleChange}
                />
              </div>

              {/* Address */}
              <div className='col-6'>
                <label><FormattedMessage id="manage-user.address" /></label>
                <input
                  className='form-control'
                  type='text'
                  name='address'
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </div>

              {/* Gender */}
              <div className='col-3'>
                <label><FormattedMessage id="manage-user.gender" /></label>
                <Select
                  value={this.state.genderArr.find(option => option.value === this.state.gender)}
                  options={this.state.genderArr}
                  onChange={(selected) => this.setState({ gender: selected.value })}
                />
              </div>

              {/* Position */}
              <div className='col-3'>
                <label><FormattedMessage id="manage-user.position" /></label>
                <Select
                  value={this.state.positionArr.find(option => option.value === this.state.position)}
                  options={this.state.positionArr}
                  onChange={(selected) => this.setState({ position: selected.value })}
                />
              </div>

              {/* Role */}
              <div className='col-3'>
                <label><FormattedMessage id="manage-user.role" /></label>
                <Select
                  value={this.state.roleArr.find(option => option.value === this.state.role)}
                  options={this.state.roleArr}
                  onChange={(selected) => this.setState({ role: selected.value })}
                />
              </div>

              {/* Upload image */}
              <div className='col-3'>
                <label><FormattedMessage id="manage-user.image" /></label>
                <div className='preview-img-container'>
                  <input
                    className='form-control'
                    type='file'
                    id='previewImg'
                    hidden
                    onChange={this.handleOnChangeImage}
                  />
                  <label className='label-upload' htmlFor='previewImg'>
                    Upload <i className="fa-solid fa-cloud-arrow-up"></i>
                  </label>
                  <div
                    className='preview-image'
                    style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                    onClick={this.openPreviewImgUrl}
                  />
                </div>
              </div>

              {/* Button */}
              <div className='col-12 mb-5'>
                <button
                  className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning px-4" : "btn btn-primary px-4"}
                  onClick={this.handleSaveUser}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.update" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>

              {/* Table */}
              <div className='col-12 mb-5'>
                <TableManageUserRedux
                  fetchUserRedux={this.props.fetchUserRedux}
                  onEditUser={this.handleEditUserFromTable}
                />
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  genderRedux: state.admin.genders,
  positionRedux: state.admin.positions,
  roleRedux: state.admin.roles,
  createUser: state.admin.UserRedux,
  isLoadingGender: state.admin.isLoadingGender
});

const mapDispatchToProps = dispatch => ({
  getGenderStart: () => dispatch(actions.fetchGenderStart()),
  getPositionStart: () => dispatch(actions.fetchPositionStart()),
  getRoleStart: () => dispatch(actions.fetchRoleStart()),
  createNewUser: (data) => dispatch(actions.createNewUser(data)),
  fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
  editUserRedux: (data) => dispatch(actions.editUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
