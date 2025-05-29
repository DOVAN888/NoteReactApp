import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper"; // Import hàm hỗ trợ xử lý redirect URL sau login
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect"; // Import hàm tạo middleware kiểm tra xác thực khi routing

const locationHelper = locationHelperBuilder({}); // Tạo instance để xử lý truy vấn URL redirect sau khi login

export const userIsAuthenticated = connectedRouterRedirect({ // Nếu đã đăng nhập thì cho truy cập route
    authenticatedSelector: state => state.user.isLoggedIn, // Kiểm tra trạng thái đăng nhập từ Redux
    wrapperDisplayName: 'UserIsAuthenticated', // Tên hiển thị cho debug tool
    redirectPath: '/login' // Nếu chưa login thì redirect về trang login
});

export const userIsNotAuthenticated = connectedRouterRedirect({ // Nếu đã login thì chặn truy cập route (ví dụ: login page)
    authenticatedSelector: state => !state.user.isLoggedIn, // Nếu chưa đăng nhập thì cho vào (ngược lại với trên)
    wrapperDisplayName: 'UserIsNotAuthenticated', // Tên hiển thị cho debug tool
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/', // Nếu đã login thì về trang chính hoặc trang trước đó
    allowRedirectBack: false // Không cho quay lại trang cũ sau khi redirect
});
