import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './TableManageUserRedux.scss';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

class TableManageUserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
      markdownText: '' // ✅ gộp chung vào 1 this.state duy nhất
    };
    this.mdParser = new MarkdownIt(); // ✅ định nghĩa Markdown parser
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userGetAll !== this.props.userGetAll) {
      this.setState({
        usersRedux: this.props.userGetAll
      });
    }
  }

  handleEditUser = (editItem) => {
    if (this.props.onEditUser) {
      this.props.onEditUser(editItem);
    }
  };

  handleDeleteUser = (userItem) => {
    if (window.confirm(`Bạn có chắc muốn xóa user: ${userItem.email}?`)) {
      this.props.deleteUserRedux(userItem.id);
    }
  };
// markadown 
  handleEditorChange = ({ html, text }) => {
    this.setState({ markdownText: text });
  };

  render() {
    const { isLoadingUsers, fetchUsersError } = this.props;
    const arrUsers = this.state.usersRedux;

    return (
      <div>
        <h4>Danh sách người dùng</h4>

        {isLoadingUsers && (
          <p style={{ color: 'blue' }}>🔄 Đang tải dữ liệu người dùng...</p>
        )}

        {fetchUsersError && (
          <p style={{ color: 'red' }}>❌ Không thể tải danh sách người dùng. Vui lòng thử lại sau.</p>
        )}

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
                      <button className="btn-edit" onClick={() => this.handleEditUser(item)}>
                        <i className="fas fa-edit"></i>
                      </button>
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

        <h4>Markdown Editor</h4>
        <MdEditor
          style={{ height: '400px' }}
          renderHTML={(text) => this.mdParser.render(text)}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGetAll: state.admin.usersGetAll,
    isLoadingUsers: state.admin.isLoadingUsers,
    fetchUsersError: state.admin.fetchUsersError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUserRedux);
