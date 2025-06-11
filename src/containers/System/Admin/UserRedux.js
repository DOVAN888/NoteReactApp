import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import { LANGUAGES,CRUD_ACTIONS } from '../../../utils/constant';
import { CommonUtils } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUserRedux from './TableManageUserRedux';
import { toast } from 'react-toastify';

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
      action:''
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      const arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders.length > 0 ? arrGenders[0].key : ''
      });
    }

    if (prevProps.positionRedux !== this.props.positionRedux) {
      const arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position: arrPositions.length > 0 ? arrPositions[0].key : ''
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      const arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles.length > 0 ? arrRoles[0].key : ''
      });
    }
  }

handleEditUserFromTable = (user) => {
  // Xử lý ảnh: nếu đã có prefix thì giữ nguyên, nếu không thì thêm prefix vào
   let imageBase64 = '';

  if (user.image) {
    try {
      imageBase64 = new Buffer(user.image, 'base64').toString('binary');
      // hoặc: Buffer.from(user.image, 'base64').toString('binary'); nếu dùng Node.js >= 6
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
    image:'',
    previewImgURL: imageBase64,  // ✅ Đảm bảo ảnh luôn đúng định dạng
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

    // ham load anh 
  handleOnChangeImage = async(event) => {
  let data = event.target.files;
  let file = data[0];
  if (file) {

      let base64 = await CommonUtils.getBase64(file)
      console.log('check base',base64)
    let ObjectUrl = URL.createObjectURL(file);

    // Đọc file thành babase64 se64
    // let reader = new FileReader();
    // reader.onloadend = () => {
      this.setState({
        previewImgURL: ObjectUrl,
        image: base64  // base64 string (dùng để gửi lên server)
      });
   // };
    //reader.readAsDataURL(file); // đọc thành base64
  }
};

// vaildate 
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


    // ham tao luu user
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
        toast.success(this.state.editUser ? '✏️ Update sucess!' : '✅ Create Sucess!');
        await this.props.fetchUserRedux();
          this.setState({
              action: CRUD_ACTIONS.CREATE,  // ✅ chuyển lại chế độ "Lưu user"
          editUser: null,
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          address: '',
          gender: this.state.genderArr[0]?.key || '',
          position: this.state.positionArr[0]?.key || '',
          role: this.state.roleArr[0]?.key || '',
          previewImgURL: '',
          image: null
        });
      } else {
        toast.error(res?.message || '❌  Error .Something went wrong. .');
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
                        <div className='col-12 my-3 fw-bold'>
                            <FormattedMessage id="manage-user.add" />
                        </div>

                        {/* Nhập Email */}
                        {/* Nhập Email */}
                                <div className='col-6'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input
                                    className='form-control'
                                    type='text'
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT} // ✅ khóa khi sửa
                                />
                                </div>

                                {/* Nhập Password */}
                                <div className='col-6'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input
                                    className='form-control'
                                    type='password'
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT} // ✅ khóa khi sửa
                                />
                                </div>
                    

                        {/* Nhập Họ (firstName) */}
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

                        {/* Nhập Tên (lastName) */}
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

                        {/* Nhập Số điện thoại */}
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

                        {/* Nhập Địa chỉ */}
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
  

                        {/* Select giới tính */}
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.gender" /></label>
                            <select
                                className="form-select"
                                name="gender"
                                value={this.state.gender}
                                onChange={this.handleChange}
                            >
                                <option value="">Choose...</option>
                                {this.state.genderArr.map((item, index) => (
                                    <option key={index} value={item.key}>
                                        {item.value_vi}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Select vị trí công việc */}
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.position" /></label>
                            <select
                                className='form-select'
                                name="position"
                                value={this.state.position}
                                onChange={this.handleChange}
                            >
                                <option value="">Choose...</option>
                                {this.state.positionArr.map((item, index) => (
                                    <option key={index} value={item.key}>
                                        {item.value_vi}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Select quyền */}
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.role" /></label>
                            <select
                                className='form-select'
                                name="role"
                                value={this.state.role}
                                onChange={this.handleChange}
                            >
                                <option value="">Choose...</option>
                                {this.state.roleArr.map((item, index) => (
                                    <option key={index} value={item.key}>
                                        {item.value_vi}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 👉 Upload ảnh và preview ảnh */}
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
                                    Tải ảnh <i className="fa-solid fa-cloud-arrow-up"></i>
                                </label>
                                <div
                                    className='preview-image'
                                    style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                    onClick={() => this.openPreviewImgUrl()}
                                ></div>
                            </div>
                        </div>

                        {/* Nút lưu */}
                        <div className='col-12 mb-5'>
                       <button
                            className={
                            this.state.action === CRUD_ACTIONS.EDIT
                                ? "btn btn-warning px-4 "
                                : "btn btn-primary px-4"
                            }
                            onClick={() => this.handleSaveUser()}
                        >
                            {this.state.action === CRUD_ACTIONS.EDIT ? (
                            <FormattedMessage id="manage-user.update" />
                            ) : (
                            <FormattedMessage id="manage-user.save" />
                            )}
                        </button>

                        </div>

                        <div className='col-12 mb-5'>
                                <TableManageUserRedux
                                        fetchUserRedux={this.props.fetchUserRedux}
                                        onEditUser={this.handleEditUserFromTable}
                                    />
                        </div>
                    </div>
                    </div>

          {/* Your form inputs and structure remain the same... */}
      
        </div>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    action ={this.state.action}
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
