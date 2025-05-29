import { logger } from "redux-logger"; // 📋 Import logger để xem log action Redux (chỉ dùng trong development)

import thunkMiddleware from "redux-thunk"; // ⚙ Middleware hỗ trợ các action bất đồng bộ (async function)

import { routerMiddleware } from 'connected-react-router'; // 🔁 Middleware để đồng bộ route với Redux store

import { createBrowserHistory } from 'history'; // 📜 Tạo lịch sử trình duyệt để điều hướng bằng JavaScript

import { createStore, applyMiddleware, compose } from 'redux'; // 🏗 Core Redux functions để tạo store và middleware

import { createStateSyncMiddleware } from 'redux-state-sync'; // 🔄 Đồng bộ state Redux giữa nhiều tab trình duyệt

import { persistStore } from 'redux-persist'; // 💾 Lưu Redux state vào localStorage để giữ nguyên sau reload

import createRootReducer from './store/reducers/rootReducer'; // 🧠 Root reducer kết hợp tất cả reducers nhỏ

import actionTypes from './store/actions/actionTypes'; // 📦 Tập hợp các action type để tránh sai chính tả


// ────────────────────────────────────────────────
// ⚙️ Kiểm tra môi trường (dev/prod)
const environment = process.env.NODE_ENV || "development";
let isDevelopment = environment === "development";

// 🛑 Tắt log Redux (dù đang dev)
// Nếu bạn muốn bật log, hãy đổi dòng dưới thành: isDevelopment = true;
isDevelopment = false;

// ────────────────────────────────────────────────
// 🌐 Tạo đối tượng lịch sử dùng cho router + redux
export const history = createBrowserHistory({
  basename: process.env.REACT_APP_ROUTER_BASE_NAME // nếu dùng subfolder
});

// ────────────────────────────────────────────────
// ⚙️ Cấu hình Redux-State-Sync để đồng bộ action
const reduxStateSyncConfig = {
  whitelist: [
    actionTypes.APP_START_UP_COMPLETE // chỉ đồng bộ những action trong danh sách này
  ]
};

// ────────────────────────────────────────────────
// 🧠 Tạo root reducer có gắn router
const rootReducer = createRootReducer(history);

// 🧱 Tạo danh sách middleware
const middleware = [
  routerMiddleware(history),                 // middleware điều khiển router
  thunkMiddleware,                           // middleware xử lý async
  createStateSyncMiddleware(reduxStateSyncConfig), // đồng bộ giữa các tab
];

// Nếu đang trong môi trường phát triển thì thêm logger vào middleware
if (isDevelopment) middleware.push(logger);

// ────────────────────────────────────────────────
// 🧰 Kết hợp DevTools (nếu có) hoặc dùng compose gốc
const composeEnhancers = (isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

// ────────────────────────────────────────────────
// 🏗 Tạo Redux store với reducer và middleware
const reduxStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

// ✔ Xuất trực tiếp dispatch để dùng ngoài component
export const dispatch = reduxStore.dispatch;

// ────────────────────────────────────────────────
// 💾 Tạo persistor để lưu state redux vào localStorage
export const persistor = persistStore(reduxStore);

// 🚀 Xuất store để dùng trong Provider
export default reduxStore;




// createStore(...)	Tạo Redux Store
// middleware[]	Quản lý logic giữa dispatch và reducer
// logger	Ghi log redux (dev)
// persistStore(...)	Lưu dữ liệu Redux qua reload
// history + routerMiddleware	Đồng bộ router và Redux
// createStateSyncMiddleware	Sync Redux state giữa các tab