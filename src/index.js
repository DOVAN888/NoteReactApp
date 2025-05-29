import React from 'react';                                      //  Import thư viện React
import ReactDOM from 'react-dom';                               //  Dùng để render React vào DOM
import 'react-toastify/dist/ReactToastify.css';                 //  Import CSS của thư viện toast thông báo
import './styles/styles.scss';                                  //  Import file SCSS tổng cho toàn bộ ứng dụng

import App from './containers/App';                             //  Import component App chính
import * as serviceWorker from './serviceWorker';               //  Import serviceWorker (dùng cho offline/PWA)
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";    //  Wrapper để cung cấp ngôn ngữ (i18n) toàn ứng dụng

import { Provider } from 'react-redux';                         //  Wrapper của Redux để cung cấp store toàn cục
import reduxStore, { persistor } from './redux';                //  Import Redux store và persistor (dùng với redux-persist)


// 👉 Hàm để render ứng dụng vào DOM
const renderApp = () => {
    ReactDOM.render(
        <Provider store={reduxStore}>                          {/*Cung cấp Redux store cho toàn bộ ứng dụng */}
            <IntlProviderWrapper>                              {/*  Cung cấp messages và ngôn ngữ cho toàn bộ app */}
                <App persistor={persistor}/>                   {/*  Truyền persistor nếu dùng redux-persist */}
            </IntlProviderWrapper>
        </Provider>,
        document.getElementById('root')                        //  Render vào phần tử có id="root" trong index.html
    );
};

renderApp();                                                   //  Gọi hàm để khởi chạy ứng dụng

//  Nếu bạn muốn app hoạt động offline và tải nhanh hơn, bạn có thể đổi unregister() thành register()
//  Tuy nhiên, điều này có thể gây ra lỗi cache nếu không xử lý kỹ
// Tìm hiểu thêm: https://bit.ly/CRA-PWA
serviceWorker.unregister();                                     //  Tắt service worker (không hoạt động offline)
