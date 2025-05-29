                +----------------+
                |     User       |
                | clicks/selects |
                +--------+-------+
                         |
                         v
               +---------+---------+
               |    dispatch()     |
               +---------+---------+
                         |
                         v
              +----------+-----------+
              |     Action Creator   |
              +----------+-----------+
                         |
                         v
              +----------+-----------+
              |       Reducer        |
              |  (cập nhật state)    |
              +----------+-----------+
                         |
                         v
              +----------+-----------+
              |   Store (Redux)      |
              +----------+-----------+
                         |
                         v
         +---------------+----------------+
         |      Component re-render       |
         +--------------------------------+



✅ 1. Người dùng thao tác giao diện
Ví dụ: họ chọn option "EN" trong dropdown:

jsx
コピーする
編集する
<select onChange={(e) => this.handleChangeLanguage(e.target.value)}>
  <option value="vi">VN</option>
  <option value="en">EN</option>
</select>
✅ 2. Gọi hàm xử lý và dispatch action
js
コピーする
編集する
handleChangeLanguage = (lang) => {
  this.props.changeLanguageApp(lang); // Gửi action lên Redux
};
✅ 3. Action creator tạo action
Trong appActions.js:

js
コピーする
編集する
export const changeLanguageApp = (language) => ({
  type: actionTypes.CHANGE_LANGUAGE,
  language
});
✅ 4. Reducer xử lý action và cập nhật state
Trong appReducer.js:

js
コピーする
編集する
case actionTypes.CHANGE_LANGUAGE:
  return {
    ...state,
    language: action.language
  };
✅ 5. Store cập nhật → Component nhận state mới
Component nào kết nối với Redux (qua connect hoặc useSelector) sẽ được re-render với state.language mới.

✅ 6. Giao diện thay đổi theo dữ liệu mới
Ví dụ: Hiển thị lại label, flag, hoặc đổi toàn bộ ngôn ngữ theo state.language.

