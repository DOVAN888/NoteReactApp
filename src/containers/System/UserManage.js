import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import userService from '../../services/userService';
import ModalComponent from './ModalUser';
import { assign } from 'lodash';
import { emiter } from '../../utils/emitter';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],             // Danh sách người dùng
            isOpenModalUser: false,  // Trạng thái modal
            modalMode: 'add',        // Chế độ modal ('add' | 'edit')
            currentUser: null        // User đang chỉnh sửa (nếu có)
        };
    }

    // Gọi sau khi component render lần đầu
    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    // Lấy tất cả người dùng từ backend
    getAllUsersFromReact = async () => {
        try {
            let response = await userService.getAllUsers('ALL');
            if (response && response.data && response.data.errCode === 0) {
                this.setState({
                    arrUsers: response.data.users
                });
            }
        } catch (error) {
            console.error('❌ Lỗi khi lấy danh sách users:', error);
        }
    };

    // Mở modal thêm user
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
            modalMode: 'add',
            currentUser: null
        });
    };

    // Mở modal để edit user
    handleEditUser = (user) => {
        this.setState({
            isOpenModalUser: true,
            modalMode: 'edit',
            currentUser: user
        });
    };

    // Toggle modal (đóng/mở)
    toggleUserModal = () => {
        this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
    };



    // ham set state ve rong sau khi chay thanh conga 
    handleResetForm = () => {
    this.setState({
        userData: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        
        }
    });
};

   // Hàm xử lý tạo user mới userdata chinh bang this.state ben thang con 
    handleCreateUser = async (userData) => {
        console.log(userData)
        try {
            let res = await userService.createNewUser(userData);
            console.log(res)
            if (res && res.data && res.data.errCode === 0) {
                await this.getAllUsersFromReact(); // Cập nhật danh sách
                this.setState({ isOpenModalUser: false });
                this.handleResetForm(); 
                // emitter.emit('EVENT_CLEAR_MODAL_DATA)// xoa  du lieu tren form sau khi tao xog
            } else {
                alert(res.data?.message || 'Tạo user thất bại');
            }
        } catch (error) {
            console.error('❌ Lỗi tạo user:', error);
        }
    };


    // ham edit user 
 handleUpdateUser = async (userData) => {
    try {
        // Gọi API cập nhật user từ service
        let res = await userService.updateUser(userData);
        console.log(res)

        if (res && res.data && res.data.errCode === 0) {
            // Nếu thành công, gọi lại API để lấy danh sách mới
            await this.getAllUsersFromReact();

            // Đóng modal sau khi update
            this.setState({ isOpenModalUser: false });

            alert('✅ User updated successfully!');
        } else {
            alert(res.data?.message || '❌ Failed to update user.');
        }
    } catch (error) {
        console.error('❌ Error updating user:', error);
        alert('🚨 Server error during update.');
    }
};


    // ham xu ly xoa du lieu 
    handleDeleteUser = async (userId) => {
    // ✅ Hiển thị hộp thoại xác nhận
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return; // ❌ Nếu người dùng bấm "Hủy", dừng hàm luôn

    try {
        let res = await userService.deleteUser(userId);
        if (res && res.data && res.data.errCode === 0) {
            alert('✅ User deleted successfully');
            await this.getAllUsersFromReact(); // Cập nhật lại danh sách
        } else {
            alert(res.data?.message || '❌ Delete failed');
        }
    } catch (error) {
        console.error('❌ Error deleting user:', error);
    }
};


    render() {
        const { arrUsers, isOpenModalUser, modalMode, currentUser } = this.state;

        return (
            <div className="users-container">
                {/* Modal thêm/sửa user */}
                <ModalComponent
                    isOpen={isOpenModalUser}
                    toggleModal={this.toggleUserModal}
                    mode={modalMode}
                    userData={currentUser}
                    onCreateUser={this.handleCreateUser}
                    onEditUser={this.handleUpdateUser } // để sau xử lý edit
                />

                {/* Tiêu đề */}
                <div className="title text-center">Manage Users with Tuong</div>

                {/* Nút thêm user */}
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={this.handleAddNewUser}>
                        <i className="fas fa-plus me-2"></i> Add new users
                    </button>
                </div>

                {/* Bảng danh sách người dùng */}
                <div className="user-table mt-4 mx-1">
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
                            {arrUsers && arrUsers.length > 0 &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit"
                                                    onClick={() => this.handleEditUser(item)}>
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button className="btn-delete" onClick={()=>this.handleDeleteUser(item.id)}>
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

// Redux connect
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
