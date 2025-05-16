import actionTypes from '../actions/actionTypes';
// ✅ Import các hằng số đại diện cho các loại hành động (actions), ví dụ: USER_LOGIN_SUCCESS, LOGOUT...

const initialState = {
    isLoggedIn: false,   // Trạng thái ban đầu: chưa đăng nhập
    userInfo: null       // Chưa có thông tin người dùng
};

// 🧠 Hàm reducer: nhận vào state hiện tại và action -> trả về state mới
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            // ✅ Khi đăng nhập thành công
            return {
                ...state,
                isLoggedIn: true,              // Đánh dấu là đã đăng nhập
                userInfo: action.userInfo      // Lưu thông tin người dùng vào Redux state
            };

        case actionTypes.USER_LOGIN_FAIL:
            // ❌ Khi đăng nhập thất bại
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            };

        case actionTypes.PROCESS_LOGOUT:
            // 🔓 Khi logout (thoát tài khoản)
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            };

        default:
            // ⚠️ Trường hợp không khớp với bất kỳ action nào
            return state;
    }
};

export default appReducer;
// 📦 Export để sử dụng trong combineReducers
