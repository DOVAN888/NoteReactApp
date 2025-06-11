import actionTypes from './actionTypes';
import userService from '../../services/userService';
import { toast } from 'react-toastify';

// -------------------GENDER---------------------------------------
export const fetchGenderStart = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_GENDER_START });
    try {
      let res = await userService.getAllCodeSercice('gender');
      const result = res.data;
      if (result && result.errCode === 0) {
        dispatch(fetchGenderSuccess(result.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.error('fetchGender error:', e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  dataGenderRedux: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

// ---------------------POSITION--------------------------
export const fetchPositionStart = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_POSITION_START });
    try {
      let res = await userService.getAllCodeSercice('position');
      const result = res.data;
      if (result && result.errCode === 0) {
        dispatch(fetchPositionSuccess(result.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.error('fetchPosition error:', e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  dataPositionRedux: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

// -----------------------ROLE------------------------------
export const fetchRoleStart = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ROLE_START });
    try {
      let res = await userService.getAllCodeSercice('role');
      const result = res.data;
      if (result && result.errCode === 0) {
        dispatch(fetchRoleSuccess(result.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.error('fetchRole error:', e);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  dataRoleRedux: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});


// ✅ -----------------Action tạo user-----------------------
export const createNewUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_USER_START });

    try {
      const res = await userService.createNewUser(data);
      const result = res.data;

      if (result && result.errCode === 0) {
        dispatch({
          type: actionTypes.CREATE_USER_SUCCESS,
          payload: result.data
        });
      } else {
        dispatch({ type: actionTypes.CREATE_USER_FAILED });
      }

      return result; // ✅ return để bên React biết kết quả
    } catch (e) {
      dispatch({ type: actionTypes.CREATE_USER_FAILED });
      return { errCode: -1, message: 'Lỗi server', error: e.message };
    }
  };
};



// Action thành công
export const saveUserSuccess = (userData) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  payload: userData
});

//  Action thất bại
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED
});

//---------------------edit--------------------------
// ✅ -----------------Action chỉnh sửa user-----------------------
export const editUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.EDIT_USER_START });

    try {
      const res = await userService.updateUser(data);
        const result = res.data;
        console.log('Update result:', result);
        if (!result) {
  console.error('⚠️ Không nhận được response từ editUserRedux');
}

      if (result && result.errCode === 0) {
        dispatch({
          type: actionTypes.EDIT_USER_SUCCESS,
          payload: result.user
        });
      } else {
        dispatch({ type: actionTypes.EDIT_USER_FAILED });
      }

      return result; // ✅ return để bên React biết kết quả
    } catch (e) {
      dispatch({ type: actionTypes.EDIT_USER_FAILED });
      return { errCode: -1, message: 'Lỗi server', error: e.message };
    }
  };
};
// ✅ Set user đang chỉnh sửa (local)
export const setEditUser = (editUserData) => ({
  type: actionTypes.SET_EDIT_USER,
  payload: editUserData
});

// Action thành công
export const editUserSuccess = (editUserData) => ({
  type: actionTypes.EDIT_USER_SUCCESS,
  payload: editUserData
});

// Action thất bại
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED
});

// -------------------lay du lieu user ----------------
// ------------------- Lấy dữ liệu user ----------------
export const fetchAllUserStart = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ALL_USERS_START });
    try {
        let res = await userService.getAllUsers('ALL');
        //console.log("check res getALl user",res)
      const result = res.data;

      if (result && result.errCode === 0) {
        dispatch(fetchAllUsersSuccess(result.users));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      dispatch(fetchAllUsersFailed());
      console.error('fetchAllUser error:', e);
    }
  };
};

export const fetchAllUsersSuccess = (userData) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  usersGetAll: userData,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});
//------------Delete user ----------------------------------------
export const deleteUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_USER_START });

    try {
        let res = await userService.deleteUser(userId); // gọi API xóa
        console.log("chek res delete",res)

      if (res.data && res.data.errCode === 0) {
        dispatch(deteteUserSucess()); // ✅ gọi hàm tạo action
        toast.success("🗑️ User deleted successfully!");
        dispatch(fetchAllUserStart()); // cập nhật lại danh sách user
      } else {
        dispatch(deleteUserFailed()); // ✅ gọi hàm tạo action lỗi
        toast.error("❌ Failed to delete user.");
      }
    } catch (e) {
      dispatch(deleteUserFailed()); // fallback lỗi
      toast.error("🚨 Server error while deleting user.");
      console.error("Delete user error:", e);
    }
  };
};

//  Action thành công khi xóa user (thường không cần userData)
export const deteteUserSucess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS
});

//  Action thất bại khi xóa user
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED
});