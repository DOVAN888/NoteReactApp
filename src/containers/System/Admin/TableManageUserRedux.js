import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './TableManageUserRedux.scss';
import 'react-markdown-editor-lite/lib/index.css';
import Pagination from './Pagination';

class TableManageUserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
      currentPage: 1,
      recordsPerPage: 8
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userGetAll !== this.props.userGetAll) {
      this.setState({
        usersRedux: this.props.userGetAll,
        currentPage: 1 // reset page khi load user mới
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

  render() {
    const { isLoadingUsers, fetchUsersError } = this.props;
    const { usersRedux, currentPage, recordsPerPage } = this.state;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentUsers = usersRedux.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(usersRedux.length / recordsPerPage);

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
          <>
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
                {currentUsers && currentUsers.length > 0 ? (
                  currentUsers.map((item) => (
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

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => this.setState({ currentPage: page })}
            />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userGetAll: state.admin.usersGetAll,
  isLoadingUsers: state.admin.isLoadingUsers,
  fetchUsersError: state.admin.fetchUsersError
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
  deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUserRedux);
