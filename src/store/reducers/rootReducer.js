// 🎯 Kết hợp các reducer và cấu hình lưu trữ Redux state (redux-persist)

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from './appReducer';
import userReducer from './userReducer';
import adminReducer from './adminReducer';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// ⚙️ Cấu hình lưu trữ dùng chung
const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

// 🧾 Cấu hình riêng cho userReducer
const userPersistConfig = {
  ...persistCommonConfig,
  key: 'user',
  whitelist: ['isLoggedIn', 'userInfo'],
};

// 🧾 Cấu hình riêng cho appReducer (để lưu ngôn ngữ)
const appPersistConfig = {
  ...persistCommonConfig,
  key: 'app',
  whitelist: ['language'],
};

// ✅ Kết hợp tất cả reducer
const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    admin: adminReducer, // Không cần persist nếu không lưu gì
  });

export default rootReducer;
