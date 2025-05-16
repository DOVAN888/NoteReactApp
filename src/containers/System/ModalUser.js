import React, { Component } from 'react';
import './ModalUser.scss';
import _ from 'lodash'
// ✅ Import các component cần thiết từ Reactstrap để tạo Modal đẹp
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Input, FormGroup, Label
} from 'reactstrap';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        // ✅ Khởi tạo state để quản lý dữ liệu của form
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        };
    }

    // ✅ Khi component mount lên, nếu là mode edit → gán dữ liệu user vào state
   componentDidUpdate(prevProps) {
    const { mode, userData } = this.props;

    // Khi mode là edit và userData thay đổi thì cập nhật lại state
    if (mode === 'edit' && userData && userData !== prevProps.userData) {
        this.setState({
            id: userData.id,
            email: userData.email,
            password: 'HARDCODED',
            firstName: userData.firstName,
            lastName: userData.lastName,
            address: userData.address
        });
    }

    // Nếu chuyển sang chế độ create thì reset state
    if (mode === 'add' && mode !== prevProps.mode) {
        this.setState({
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        });
    }
}


    // ✅ Xử lý thay đổi input → gán vào state tương ứng
    handleOnChangeInput = (e, field) => {
        this.setState({
            [field]: e.target.value
        });
    };

    // ✅ Khi nhấn nút Create hoặc Save → gọi hàm từ props để gửi dữ liệu ra ngoài
handleSubmit = () => {
    const { email, password, firstName, lastName, address, id } = this.state;
    const { mode, onEditUser, onCreateUser } = this.props;

    // ✅ Kiểm tra dữ liệu bắt buộc
    if (!email || !password || !firstName || !lastName || !address) {
        alert('⚠️ Please fill in all required fields!');
        return;
    }

    // ✅ Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('⚠️ Invalid email format!');
        return;
    }

    // ✅ Tạo userData cần gửi đi
    let userData = {
        email,
        password,
        firstName,
        lastName,
        address,
    };

    // Nếu là edit thì thêm id vào userData
    if (mode === 'edit') {
        userData.id = id;
        onEditUser(userData);
    } else {
        onCreateUser(userData);
    }
};


    render() {
        // ✅ Props nhận từ cha (UserManage.js)
        const { isOpen, toggleModal, mode } = this.props;

        return (
            <Modal
                isOpen={isOpen}         //  Hiển thị modal nếu isOpen = true
                toggle={toggleModal}    // ✅ Toggle dùng để đóng modal
                backdrop="static"       // ✅ Không cho click ra ngoài để đóng
                keyboard={false}        // ✅ Không cho nhấn ESC để đóng
                size="lg"               // ✅ Cỡ modal lớn
                centered                // ✅ Canh giữa màn hình
            >
                {/* ✅ Header với nút [X] tự động sử dụng toggle */}
                <ModalHeader className='center' toggle={toggleModal}>
                    {mode === 'edit' ? 'Edit User' : 'Create New User'}
                </ModalHeader>

                {/* ✅ Phần thân modal chứa các input */}
                <ModalBody>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={this.state.email}
                            onChange={(e) => this.handleOnChangeInput(e, 'email')}
                            disabled={mode === 'edit'} // Không cho sửa email khi edit
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={this.state.password}
                            onChange={(e) => this.handleOnChangeInput(e, 'password')}
                            disabled={mode === 'edit'} // Không sửa mật khẩu khi edit
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>First Name</Label>
                        <Input
                            type="text"
                            value={this.state.firstName}
                            onChange={(e) => this.handleOnChangeInput(e, 'firstName')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Last Name</Label>
                        <Input
                            type="text"
                            value={this.state.lastName}
                            onChange={(e) => this.handleOnChangeInput(e, 'lastName')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Address</Label>
                        <Input
                            type="text"
                            value={this.state.address}
                            onChange={(e) => this.handleOnChangeInput(e, 'address')}
                        />
                    </FormGroup>
                </ModalBody>

                {/* ✅ Footer với hai nút action */}
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={this.handleSubmit}>
                        {mode === 'edit' ? 'Save Changes' : 'Add new'}
                    </Button>
                    <Button color="secondary" className='px-3' onClick={toggleModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalUser;
// componentDidMount	Sau render lần đầu	Gán dữ liệu ban đầu vào form
// componentDidUpdate	Khi props thay đổi	Cập nhật lại form khi chuyển từ add sang edit, hoặc đổi user