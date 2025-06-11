import React, { Component, Fragment } from 'react'; // React Class Component và Fragment
import { connect } from 'react-redux'; // Kết nối với Redux store
import { Route, Switch } from 'react-router-dom'; // Tạo router và switch giữa các route
import { ConnectedRouter as Router } from 'connected-react-router'; // Router kết nối với Redux
import { history } from '../redux'; // Đối tượng history dùng chung trong app
import { ToastContainer } from 'react-toastify'; // Hiển thị popup toast message
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import icon font-awesome
import CustomScrollbars from '../components/CustomScrollbars';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication'; // HOC kiểm tra trạng thái login
import { path } from '../utils'; // Các đường dẫn định nghĩa sẵn
import Home from '../routes/Home'; // Trang Home
import Login from './Auth/Login'; // Component Login
import System from '../routes/System'; // Trang hệ thống quản trị

import HomePage from './HomePage/HomePage';

import { CustomToastCloseButton } from '../components/CustomToast'; // Nút đóng toast tuỳ chỉnh
//import ConfirmModal from '../components/ConfirmModal'; // Modal xác nhận toàn cục

class App extends Component {
    handlePersistorState = () => { // Kiểm tra xem redux-persist đã khởi động chưa
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() { // Chạy sau khi component mount → gọi check persist
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment> {/* Bao toàn bộ bằng Fragment thay vì <div> */}
                <Router history={history}> {/* Router điều hướng dựa trên history từ Redux */}
                    <div className="main-container">
                        
                        {/* {this.props.isLoggedIn && <Header />} Nếu đã đăng nhập thì hiển thị Header */}

                        <div className="content-container">
                            <CustomScrollbars style={{height:'100vh',width:'100%'}}>
                            <Switch> {/* Duyệt route và render component tương ứng */}
                                <Route path={path.HOME} exact component={Home} /> {/* Trang Home */}
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} /> {/* Trang Login, chỉ vào nếu chưa login */}
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} /> {/* Trang System, chỉ vào nếu đã login */}
                                <Route path={path.HOMEPAGE} component={HomePage} /> {/* Route mặc định fallback */}
                                </Switch>
                                </CustomScrollbars>
                        </div>

                        <ToastContainer // Hiển thị toast thông báo (thành công, lỗi, v.v.)
                           className="toast-container"
                                toastClassName="toast-item"
                                bodyClassName="toast-item-body"
                                autoClose={2000}             // ✅ Tự đóng sau 3 giây
                                hideProgressBar={true}
                                pauseOnHover={false}
                                pauseOnFocusLoss={true}
                                closeOnClick={false}
                                draggable={false}
                                closeButton={<CustomToastCloseButton />}
                        />
                    </div>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = state => { // Lấy dữ liệu từ Redux store
    return {
        started: state.app.started, // Trạng thái app đã khởi động
        isLoggedIn: state.user.isLoggedIn // Đã đăng nhập hay chưa
    };
};

const mapDispatchToProps = dispatch => { // Chỗ định nghĩa action để dispatch (chưa dùng)
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App); // Kết nối App với Redux store
