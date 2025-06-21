import React, { Component } from "react"; // import React và Component
import { connect } from 'react-redux'; // kết nối Redux để lấy state ngôn ngữ
import { IntlProvider } from "react-intl"; // component cung cấp i18n toàn app

import '@formatjs/intl-pluralrules/polyfill'; // polyfill cho plural (số nhiều)
import '@formatjs/intl-pluralrules/locale-data/en'; // plural cho tiếng Anh
import '@formatjs/intl-pluralrules/locale-data/vi'; // plural cho tiếng Việt

import '@formatjs/intl-relativetimeformat/polyfill'; // polyfill cho "x phút trước"
import '@formatjs/intl-relativetimeformat/locale-data/en'; // relative time cho tiếng Anh
import '@formatjs/intl-relativetimeformat/locale-data/vi'; // relative time cho tiếng Việt

import { LanguageUtils } from '../utils' // utils chứa hàm xử lý flatten messages từ vi.json, en.json...

const messages = LanguageUtils.getFlattenedMessages(); // lấy object chứa messages đa ngôn ngữ

class IntlProviderWrapper extends Component { // component bọc toàn bộ app để cung cấp i18n
    render() {
        const { children, language } = this.props; // lấy ngôn ngữ hiện tại từ props (Redux)
        return (
            <IntlProvider
                locale={language} // đặt locale hiện tại (vi, en, jp...)
                messages={messages[language]} // truyền danh sách messages tương ứng với locale
                defaultLocale="vi" // fallback nếu không có locale// render các component con bên trong (App)
            >
                {children} 
            </IntlProvider>
        );
    }
}

const mapStateToProps = state => { // map state Redux để lấy ngôn ngữ hiện tại
    return {
        language: state.app.language // lấy từ state.app.language trong Redux store
    };
};

export default connect(mapStateToProps, null)(IntlProviderWrapper); // kết nối Redux và export component
