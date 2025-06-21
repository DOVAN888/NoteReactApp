import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './TableManageUserRedux.scss';

// 👉 Import SimpleMDE Editor
import SimpleMDE from 'react-simplemde-editor';
import 'simplemde/dist/simplemde.min.css';

class TableManageUserRedux extends Component {
  constructor(props) {
    super(props);

    // 👉 Khởi tạo state gồm:
    // - usersRedux: lưu danh sách user từ redux
    // - markdownText: nội dung markdown đang nhập trong editor
    this.state = {
      usersRedux: [],
      markdownText: ''
    };
  }

  // ✅ Khi component được mount lần đầu → gọi action fetch danh sách user
  componentDidMount() {
    this.props.fetchUserRedux();
  }

  // ✅ Khi props thay đổi → nếu danh sách user thay đổi thì cập nhật vào state
  componentDidUpdate(prevProps) {
    if (prevProps.userGetAll !== this.props.userGetAll) {
      this.setState({
        usersRedux: this.props.userGetAll
      });
    }
  }

  // ✅ Hàm xử lý khi click nút edit user → gọi hàm cha truyền qua props
  handleEditUser = (editItem) => {
    if (this.props.onEditUser) {
      this.props.onEditUser(editItem);
    }
  };

  // ✅ Hàm xử lý xóa user → xác nhận rồi dispatch action xóa
  handleDeleteUser = (userItem) => {
    if (window.confirm(`Bạn có chắc muốn xóa user: ${userItem.email}?`)) {
      this.props.deleteUserRedux(userItem.id);
    }
  };

  // ✅ Cập nhật state khi nội dung trong SimpleMDE thay đổi
  handleEditorChange = (value) => {
    this.setState({ markdownText: value });
  };

  // ✅ Giao diện render chính
  render() {
    const { isLoadingUsers, fetchUsersError } = this.props;
    const arrUsers = this.state.usersRedux;

    return (
      <div>
        <h4>Danh sách người dùng</h4>

        {/* 🔄 Hiển thị trạng thái đang load */}
        {isLoadingUsers && (
          <p style={{ color: 'blue' }}>🔄 Đang tải dữ liệu người dùng...</p>
        )}

        {/* ❌ Hiển thị lỗi nếu fetch thất bại */}
        {fetchUsersError && (
          <p style={{ color: 'red' }}>❌ Không thể tải danh sách người dùng. Vui lòng thử lại sau.</p>
        )}

        {/* ✅ Hiển thị bảng danh sách người dùng nếu không lỗi */}
        {!isLoadingUsers && !fetchUsersError && (
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers && arrUsers.length > 0 ? (
                arrUsers.map((item) => (
                  <tr key={item.id}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      {/* 🖊 Nút edit */}
                      <button className="btn-edit" onClick={() => this.handleEditUser(item)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      {/* 🗑 Nút delete */}
                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Không có người dùng nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* ✍️ SimpleMDE Markdown Editor */}
        <h4>SimpleMDE Editor</h4>
        <SimpleMDE
          value={this.state.markdownText}
          onChange={this.handleEditorChange}
          options={{
            spellChecker: false,
            placeholder: "Viết nội dung markdown ở đây..."
          }}
        />
      </div>
    );
  }
}

// ✅ Lấy dữ liệu từ Redux store → props
const mapStateToProps = (state) => {
  return {
    userGetAll: state.admin.usersGetAll,
    isLoadingUsers: state.admin.isLoadingUsers,
    fetchUsersError: state.admin.fetchUsersError
  };
};

// ✅ Truyền action từ Redux → props
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUserRedux);
