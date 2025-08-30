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





// ham lay ba si noi bat out tanding =============================================================================
export const fetchOutstandingDoctorsStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_OUTSTANDING_DOCTORS_START });
         const limit = 10;
      let res = await userService.getTopDoctorService(limit); // ← API call
      let result = res.data
      console.log("check outtanding api",res)
      if (result && result.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_OUTSTANDING_DOCTORS_SUCCESS,
          data: result.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_OUTSTANDING_DOCTORS_FAILED });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_OUTSTANDING_DOCTORS_FAILED });
      console.error("Fetch failed: ", e);
    }
  };
};
// Khi lấy bác sĩ nổi bật thành công, truyền dữ liệu vào action
export const fetchOutstandingDoctorsSuccess = (doctors) => ({
  type: actionTypes.FETCH_OUTSTANDING_DOCTORS_SUCCESS,
  data: doctors
});

// Khi lấy bác sĩ nổi bật thất bại
export const fetchOutstandingDoctorsFailed = () => ({
  type: actionTypes.FETCH_OUTSTANDING_DOCTORS_FAILED
});

// get all bac si 

// Gọi API lấy tất cả bác sĩ========================================================================
export const fetchAllDoctorsStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_START });

      let res = await userService.getAllDoctorService(); // ✅ gọi hàm getAllDoctors
      let result = res.data;

      if (result && result.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          data: result.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
      console.error("Fetch all doctors failed: ", e);
    }
  };
};

// Thành công
export const fetchAllDoctorsSuccess = (doctors) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  data: doctors,
});

// Thất bại
export const fetchAllDoctorsFailed = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
});

// save detail info doctor===========================================
export const saveDetailDoctorStart = (doctorData) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_START });

      let res = await userService.saveDetailDoctorService(doctorData);
      console.log("📦 Response save doctor:", res);

      if (res && res.data && res.data.errCode === 0) {
        toast.success("✅ Doctor information saved successfully.");
        dispatch(saveDetailDoctorSuccess());
      } else {
        toast.error("❌ Failed to save doctor information.");
        dispatch(saveDetailDoctorFailed());
        console.error('Save doctor failed:', res?.data?.errMessage || 'Unknown error');
      }
    } catch (e) {
      dispatch(saveDetailDoctorFailed());
      toast.error("🚨 An unexpected error occurred while saving doctor information.");
      console.error('Save doctor error:', e);
    }
  };
};


export const saveDetailDoctorSuccess = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});

export const saveDetailDoctorFailed = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
});

//================================----------------------------===============================================
// lay thoi gian lich kham benh // Gọi API lấy TIME lịch khám bệnh
export const fetchAllTimesStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_TIMES_START });

      let res = await userService.getAllCodeSercice("TIME");  // ✅ API backend nhận type = "TIME"

     
      let result = res.data;
      // console.log('check action service',result)

      if (result && result.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_TIMES_SUCCESS,
          data: result.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_ALL_TIMES_FAILED });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_ALL_TIMES_FAILED });
      console.error("Fetch all times failed: ", e);
    }
  };
};

// Thành công
export const fetchAllTimesSuccess = (times) => ({
  type: actionTypes.FETCH_ALL_TIMES_SUCCESS,
  data: times,
});

// Thất bại
export const fetchAllTimesFailed = () => ({
  type: actionTypes.FETCH_ALL_TIMES_FAILED,
});



// Action saveDoctorSchedule========================================================================--
export const saveDoctorSchedule = (scheduleData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.SAVE_SCHEDULE_START });

      let res = await userService.saveDoctorSchedule(scheduleData); // Gọi API lưu schedule

      let result = res.data;
      // console.log('check save schedule result:', result);

      if (result && result.errCode === 0) {
        dispatch({
          type: actionTypes.SAVE_SCHEDULE_SUCCESS,
          message: result.message
        });
      } else {
        dispatch({ type: actionTypes.SAVE_SCHEDULE_FAILED });
      }
    } catch (e) {
      dispatch({ type: actionTypes.SAVE_SCHEDULE_FAILED });
      console.error('Save doctor schedule failed:', e);
    }
  };
};

// Action đơn giản nếu cần export riêng
export const saveDoctorScheduleSuccess = (message) => ({
  type: actionTypes.SAVE_SCHEDULE_SUCCESS,
  message
});

export const saveDoctorScheduleFailed = () => ({
  type: actionTypes.SAVE_SCHEDULE_FAILED
});

// ========================================================================
// Action get all schedules by doctor (lấy lịch khám theo bác sĩ)
export const fetchSchedulesByDoctor = (doctorId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_SCHEDULES_BY_DOCTOR_START });

      let res = await userService.getSchedulesByDoctor(doctorId); // Gọi API lấy schedule theo doctorId
       console.log('API getSchedulesByDoctor response:', res.data);

      let result = res.data;

      if (result && result.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_SCHEDULES_BY_DOCTOR_SUCCESS,
          schedules: result.data
        });
      } else {
        dispatch({ type: actionTypes.FETCH_SCHEDULES_BY_DOCTOR_FAILED });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_SCHEDULES_BY_DOCTOR_FAILED });
      console.error('Fetch schedules by doctor failed:', e);
    }
  };
};

export const fetchSchedulesByDoctorSuccess = (schedules) => ({
  type: actionTypes.FETCH_SCHEDULES_BY_DOCTOR_SUCCESS,
  schedules
});

export const fetchSchedulesByDoctorFailed = () => ({
  type: actionTypes.FETCH_SCHEDULES_BY_DOCTOR_FAILED
});

// ========================================================================
// Action delete schedules by doctor + date
export const deleteSchedulesByDate = (doctorId, date) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.DELETE_SCHEDULES_BY_DATE_START });

      let res = await userService.deleteSchedulesByDate(doctorId, date);
      console.log('API deleteSchedulesByDate response:', res.data);

      let result = res.data;

      if (result && result.errCode === 0) {
        dispatch({
          type: actionTypes.DELETE_SCHEDULES_BY_DATE_SUCCESS,
          message: result.message || 'Deleted successfully'
        });

        // Có thể fetch lại schedules mới nhất ngay sau khi xóa thành công:
        dispatch(fetchSchedulesByDoctor(doctorId));
      } else {
        dispatch({ type: actionTypes.DELETE_SCHEDULES_BY_DATE_FAILED });
      }
    } catch (e) {
      dispatch({ type: actionTypes.DELETE_SCHEDULES_BY_DATE_FAILED });
      console.error('Delete schedules by date failed:', e);
    }
  };
};

// Action đơn giản nếu cần export riêng
export const deleteSchedulesByDateSuccess = (message) => ({
  type: actionTypes.DELETE_SCHEDULES_BY_DATE_SUCCESS,
  message
});

export const deleteSchedulesByDateFailed = () => ({
  type: actionTypes.DELETE_SCHEDULES_BY_DATE_FAILED
});

// 🔹 Action fetchAllCodeStart để lấy allcode theo type =========================================================================
export const fetchAllCodeStart = (type) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALLCODE_START, codeType: type });

      let res = await userService.getAllCodeSercice(type);
      const result = res.data;

      if (result && result.errCode === 0) {
        dispatch(fetchAllCodeSuccess(type, result.data));
      } else {
        dispatch(fetchAllCodeFailed(type));
      }
    } catch (e) {
      console.error(`fetchAllCode ${type} error:`, e);
      dispatch(fetchAllCodeFailed(type));
    }
  };
};

// 🔹 Success action
export const fetchAllCodeSuccess = (codeType, data) => ({
  type: actionTypes.FETCH_ALLCODE_SUCCESS,
  codeType,
  data,
});

// 🔹 Failed action
export const fetchAllCodeFailed = (codeType) => ({
  type: actionTypes.FETCH_ALLCODE_FAILED,
  codeType,
});

//booking create 
export const createBookingStart = (bookingData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.CREATE_BOOKING_START });

      const res = await userService.postBookingAppointment(bookingData); // Gọi API backend
      const result = res.data;

      if (result && result.errCode === 0) {
        dispatch(createBookingSuccess(result.data));
      } else {
        dispatch(createBookingFailed(result.message || 'Booking failed'));
      }
    } catch (e) {
      console.error('❌ createBooking error:', e);
      dispatch(createBookingFailed('Internal Server Error'));
    }
  };
};

// 🔹 Thành công
export const createBookingSuccess = (data) => ({
  type: actionTypes.CREATE_BOOKING_SUCCESS,
  data,
});

// 🔹 Thất bại
export const createBookingFailed = (errorMessage) => ({
  type: actionTypes.CREATE_BOOKING_FAILED,
  errorMessage,
});