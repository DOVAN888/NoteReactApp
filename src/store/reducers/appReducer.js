import actionTypes from '../actions/actionTypes';

//  Dữ liệu mặc định cho modal xác nhận
const initContentOfConfirmModal = {
    isOpen: false,        // Modal đang đóng
    messageId: "",        // ID của thông báo (nếu có)
    handleFunc: null,     // Hàm xử lý khi xác nhận (OK)
    dataFunc: null        // Dữ liệu truyền vào hàm xử lý
}

//  Trạng thái mặc định ban đầu của ứng dụng
const initialState = {
    started: true,                     // Ứng dụng đã khởi động xong
    language: 'vi',                    // Ngôn ngữ mặc định là Tiếng Việt
    systemMenuPath: '/system/user-manage', // Trang mặc định khi vào hệ thống
    contentOfConfirmModal: {
        ...initContentOfConfirmModal  // Khởi tạo modal xác nhận rỗng
    }
}

// Hàm reducer để xử lý thay đổi state dựa theo action
const appReducer = (state = initialState, action) => {
    switch (action.type) {

        //  Khi ứng dụng khởi động xong
        case actionTypes.APP_START_UP_COMPLETE: 
            return {
                ...state,
                started: true  // Cập nhật state là đã khởi động
            }

        //  Khi set nội dung cho modal xác nhận
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL: 
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,         // Giữ lại phần cũ
                    ...action.contentOfConfirmModal        // Ghi đè bằng dữ liệu mới từ action
                }
            }
            
        // changeLangue 
        case actionTypes.CHANGE_LANGUAGE: 
            console.log('chek action',action)
            return {
                ...state,
                language:action.language
            }
        
        //  Mặc định: không thay đổi state nếu không khớp action
        default:
            return state;
    }
}

// Export reducer ra ngoài để combine vào rootReducer
export default appReducer;
