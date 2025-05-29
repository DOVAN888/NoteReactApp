const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
  SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE:' CHANGE_LANGUAGE',


    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
      PROCESS_LOGOUT: 'PROCESS_LOGOUT',
})

export default actionTypes;


// File/Thư mục	Vai trò chính
// actionTypes.js	Định nghĩa tên các action
// appActions.js	Viết các hàm tạo action để dispatch
// appReducer.js	Xử lý action và cập nhật state tương ứng
// rootReducer.js	Kết hợp tất cả reducer lại thành root reducer
// store	Nơi khai báo toàn bộ logic Redux của ứng dụng