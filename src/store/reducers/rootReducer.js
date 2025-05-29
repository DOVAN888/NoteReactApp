// 🎯 Kết hợp các reducer và cấu hình lưu trữ Redux state (redux-persist)

import { combineReducers } from 'redux';                     // Hàm dùng để gộp tất cả reducer lại thành 1 reducer lớn
import { connectRouter } from 'connected-react-router';     // Kết nối router với Redux để theo dõi navigation

// 🧩 Import từng reducer quản lý phần riêng của Redux state
import appReducer from "./appReducer";
//import adminReducer from "./adminReducer";
import userReducer from "./userReducer";

// 📦 Import các công cụ để thiết lập redux-persist
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'; // Dùng để gộp state khi khôi phục từ localStorage
import storage from 'redux-persist/lib/storage';            // Sử dụng localStorage làm nơi lưu trữ
import { persistReducer } from 'redux-persist';             // Hàm gói reducer để kích hoạt tính năng lưu trữ

// ⚙️ Cấu hình lưu trữ chung (dùng cho tất cả reducer nếu cần)
const persistCommonConfig = {
    storage: storage,                         // Dùng localStorage (hoặc có thể thay bằng sessionStorage)
    stateReconciler: autoMergeLevel2          // Gộp state cấp độ 2 khi load lại từ localStorage
};


// 🧾 Cấu hình riêng cho reducer user (có thể khác field)
const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo','language']
};

// 📦 Trả về một rootReducer đã kết hợp tất cả reducer
export default (history) => combineReducers({
    router: connectRouter(history),                               // Gắn router vào Redux (để theo dõi URL hiện tại)
    user: persistReducer(userPersistConfig, userReducer),         // Gắn redux-persist cho userReducer
    app: appReducer                                                // Reducer cho UI, không cần persist
});
