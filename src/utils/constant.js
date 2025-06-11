export const path = {
    HOME: '/',
    HOMEPAGE :'/home',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system'
};

export const LANGUAGES = {
    VI: 'vi',
    EN: 'en',
    JP:'jp'
};
 
export const CRUD_ACTIONS = {
    CREATE: "CREATE",
    EDIT: "EDIT",
    DELETE: "DELETE",
    READ: "READ"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}



// CommonUtils.js	Các hàm tiện ích dùng chung, ví dụ: định dạng ngày, xử lý chuỗi...
// constant.js	Chứa các hằng số toàn cục, ví dụ như: GENDER, ROLES, LANGUAGES
// emitter.js	Một event emitter custom dùng để gửi sự kiện giữa các component (giống pub/sub)
// index.js	Có thể là file export chung cho toàn bộ các utils (giúp import gọn hơn)
// KeyCodeUtils.js	Xử lý liên quan đến phím bấm (key codes), ví dụ: Enter, ESC, Ctrl+C,...
// LanguageUtils.js	Dùng để quản lý hoặc chuyển đổi ngôn ngữ trong hệ thống (i18n-related)
// ToastUtil.js	Chứa hàm để gọi toast message (ví dụ: thành công, lỗi, cảnh báo)
// axios.js	Cấu hình sẵn axios (baseURL, interceptors, token, v.v.) để gọi API