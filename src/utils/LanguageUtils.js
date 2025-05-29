import messages_vi from '../translations/vi.json';
import messages_en from '../translations/en.json';
import messages_jp from '../translations/jp.json';

const flattenMessages = ((nestedMessages, prefix = '') => {
    if (nestedMessages == null) {
        return {}
    }
    return Object.keys(nestedMessages).reduce((messages, key) => {
        const value = nestedMessages[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            Object.assign(messages, {[prefixedKey]: value})
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey))
        }

        return messages
    }, {})
});

const messages = {
    'vi': flattenMessages(messages_vi),
    'en': flattenMessages(messages_en),
    'jp': flattenMessages(messages_jp)
};


export default class LanguageUtils {
    static getMessageByKey(key, lang) {
        return messages[lang][key]
    }

    static getFlattenedMessages() {
        return messages;
    }
}


// constant.js	Chứa các hằng số như LANGUAGES, path, dateFormat, ...
// LanguageUtils.js	Flatten và xử lý chuỗi i18n (ngôn ngữ) từ vi.json, en.json, jp.json v.v.
// CommonUtils.js	Các hàm tiện ích như formatDate, validateInput, ...
// emitter.js	Cung cấp custom EventEmitter (giúp giao tiếp giữa các component)
// ToastUtil.js	Hàm gọi toast.success, toast.error, ...
// KeyCodeUtils.js	Hàm xử lý keyPress, mã phím như Enter, ESC, ...
// index.js	Có thể dùng để export tất cả utils cùng lúc, giúp import gọn hơn

