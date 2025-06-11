import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    createUserError: false,  // để báo lỗi
       users: [],             // thêm dòng này để chứa danh sách user
    userRedux: null ,      //  nếu bạn muốn lưu riêng user vừa tạo
    fetchUsersError: false,
    usersGetAll: [],
     getEditUser:[]
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // --- GENDER ------------------------------------------------------------------------------------
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender: true,
            };

        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.dataGenderRedux || [],
                isLoadingGender: false,
            };

        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,
                genders: [],
                isLoadingGender: false,
            };

        // --- POSITION ------------------------------------------------------------------------------
        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,
                isLoadingGender: true, // reuse same loading flag if needed
            };

        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.dataPositionRedux || [],
                isLoadingGender: false,
            };

        case actionTypes.FETCH_POSITION_FAILED:
            return {
                ...state,
                positions: [],
                isLoadingGender: false,
            };

        // --- -------------------------ROLE ----------------------------------------------------------------
        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
                isLoadingGender: true,
            };

        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.dataRoleRedux || [],
                isLoadingGender: false,
            };

        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state,
                roles: [],
                isLoadingGender: false,
            };
        
        
        // -----create new user------------------------------------------------------------------------
        case actionTypes.CREATE_USER_START:
      return {
        ...state,
        isCreatingUser: true,
        createUserError: false
      };

    case actionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        isCreatingUser: false,
        createUserError: false,
        userRedux: [...state.users, action.payload] // thêm user mới vào danh sách
      };

    case actionTypes.CREATE_USER_FAILED:
      return {
        ...state,
        isCreatingUser: false,
        createUserError: true
      };
        // ----------------------getALL user -------------------
        case actionTypes.FETCH_ALL_USERS_START:
            return {
                ...state,
                isLoadingUsers: true,
                fetchUsersError: false
            };

            case actionTypes.FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                isLoadingUsers: false,
                fetchUsersError: false,
               usersGetAll: action.usersGetAll // Cập nhật danh sách user từ backend
            };

            case actionTypes.FETCH_ALL_USERS_FAILED:
            return {
                ...state,
                isLoadingUsers: false,
                fetchUsersError: true
            };
        
        //-------------------edit user----------------------------
            case actionTypes.SET_EDIT_USER:
                    return {
                        ...state,
                        getEditUser: action.payload
                    };

                    case actionTypes.EDIT_USER_START:
                    return {
                        ...state,
                        isEditingUser: true,
                        editUserError: false
                    };

                    case actionTypes.EDIT_USER_SUCCESS:
                    return {
                        ...state,
                        isEditingUser: false,
                        editUserError: false,
                       usersGetAll: [
                            action.payload,
                            ...state.usersGetAll.filter(user => user.id !== action.payload.id)
                            ],

                        getEditUser: null  // ✅ Clear edit mode sau khi update
                    };
                    case actionTypes.EDIT_USER_FAILED:
                    return {
                        ...state,
                        isEditingUser: false,
                        editUserError: true
                    };
        //--------------------delete user -------------------------------
          //  Thêm xử lý xóa user thành công
        case actionTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
                // Bạn có thể để nguyên nếu sau khi xóa, gọi lại fetchAllUserStart() rồi cập nhật state
            };

        //  Thêm xử lý xóa user thất bại (nếu muốn)
        case actionTypes.DELETE_USER_FAILED:
            return {
                ...state
            };
        
        default:
            return state;
    }
};

export default adminReducer;
