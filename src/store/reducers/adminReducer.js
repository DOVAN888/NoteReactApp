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
    getEditUser: [],
    // outanding doctor
    outstandingDoctors: [],
    isLoadingDoctors: false,
    allDoctors: [],
    isSavingDoctor: false,
    allTimes: [],
    //
    isSavingSchedule: false,
     saveScheduleSuccess: false,
    saveScheduleError: false,
    saveScheduleMessage: '',
    //
    allSchedules: [],
    isFetchingSchedules: false,
    //delete time date
     isDeletingSchedules: false,
    deleteScheduleSuccess: false,
    deleteScheduleMessage: '',

  // full allcode get stype
    allPrices: [],
  allPayments: [],
  allProvinces: [],
  isLoadingAllCode: false,
  // booking
   isBookingLoading: false,
  bookingData: null,
  bookingError: null
    
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
        
        
        //-------------outanding doctor -----------------------------------

                            case actionTypes.FETCH_OUTSTANDING_DOCTORS_START:
                            return {
                                ...state,
                                isLoadingDoctors: true
                            };

                            case actionTypes.FETCH_OUTSTANDING_DOCTORS_SUCCESS:
                            return {
                                ...state,
                                outstandingDoctors: action.data || [],
                                isLoadingDoctors: false
                            };

                            case actionTypes.FETCH_OUTSTANDING_DOCTORS_FAILED:
                            return {
                                ...state,
                                outstandingDoctors: [],
                                isLoadingDoctors: false
                            };

        //------------all  doctor -----------------------------------
                        case actionTypes.FETCH_ALL_DOCTORS_START:
                    return {
                        ...state,
                        isLoadingDoctors: true,
                    };

                    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
                    return {
                        ...state,
                        allDoctors: action.data,
                        isLoadingDoctors: false,
                    };

                    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
                    return {
                        ...state,
                        allDoctors: [],
                        isLoadingDoctors: false,
                    };
        // phan luu thong tin detail infor 
             case actionTypes.SAVE_DETAIL_DOCTOR_START:
                return {
                    ...state,
                    isSavingDoctor: true,
                };

                case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS:
                return {
                    ...state,
                    isSavingDoctor: false,
                };

                case actionTypes.SAVE_DETAIL_DOCTOR_FAILED:
                return {
                    ...state,
                    isSavingDoctor: false,
                };

        // phan time lich hen ========================================================-
         case actionTypes.FETCH_ALL_TIMES_START:
            return {
                ...state
            };

            case actionTypes.FETCH_ALL_TIMES_SUCCESS:
            return {
                ...state,
                allTimes: action.data   // ✅ Cập nhật allTimes từ action payload
            };

            case actionTypes.FETCH_ALL_TIMES_FAILED:
            return {
                ...state,
                allTimes: []    // ✅ Nếu fail thì set mảng rỗng
            };
        // phan lu dat lich slot time =========================================================================
         case actionTypes.SAVE_SCHEDULE_START:
      return {
        ...state,
        isSavingSchedule: true,
        saveScheduleSuccess: false,
        saveScheduleError: false,
        saveScheduleMessage: ''
      };

    case actionTypes.SAVE_SCHEDULE_SUCCESS:
      return {
        ...state,
        isSavingSchedule: false,
        saveScheduleSuccess: true,
        saveScheduleError: false,
        saveScheduleMessage: action.message
      };

    case actionTypes.SAVE_SCHEDULE_FAILED:
      return {
        ...state,
        isSavingSchedule: false,
        saveScheduleSuccess: false,
        saveScheduleError: true,
        saveScheduleMessage: 'Failed to save schedule.'
      };

       // ===== FETCH SCHEDULES BY DOCTOR =====
    case actionTypes.FETCH_SCHEDULES_BY_DOCTOR_START:
      return {
        ...state,
        isFetchingSchedules: true
      };

    case actionTypes.FETCH_SCHEDULES_BY_DOCTOR_SUCCESS:
      return {
        ...state,
        isFetchingSchedules: false,
        allSchedules: action.schedules
      };

    case actionTypes.FETCH_SCHEDULES_BY_DOCTOR_FAILED:
      return {
        ...state,
        isFetchingSchedules: false,
        allSchedules: []
      };

         // 🔹 Delete schedules by date cases...================================================
    case actionTypes.DELETE_SCHEDULES_BY_DATE_START:
      return {
        ...state,
        isDeletingSchedules: true,
        deleteScheduleSuccess: false,
        deleteScheduleMessage: ''
      };

    case actionTypes.DELETE_SCHEDULES_BY_DATE_SUCCESS:
      return {
        ...state,
        isDeletingSchedules: false,
        deleteScheduleSuccess: true,
        deleteScheduleMessage: action.message || 'Deleted successfully'
      };

    case actionTypes.DELETE_SCHEDULES_BY_DATE_FAILED:
      return {
        ...state,
        isDeletingSchedules: false,
        deleteScheduleSuccess: false,
        deleteScheduleMessage: 'Failed to delete schedules'
      };


      //==================================================-full allcode get by type
        case actionTypes.FETCH_ALLCODE_START:
      return {
        ...state,
        isLoadingAllCode: true,
      };

    // FETCH_ALLCODE_SUCCESS
    case actionTypes.FETCH_ALLCODE_SUCCESS:
      if (action.codeType === 'PRICE') {
        return {
          ...state,
          allPrices: action.data,
          isLoadingAllCode: false,
        };
      }
      if (action.codeType === 'PAYMENT') {
        return {
          ...state,
          allPayments: action.data,
          isLoadingAllCode: false,
        };
      }
      if (action.codeType === 'PROVINCE') {
        return {
          ...state,
          allProvinces: action.data,
          isLoadingAllCode: false,
        };
      }
      return {
        ...state,
        isLoadingAllCode: false,
      };

    // FETCH_ALLCODE_FAILED
    case actionTypes.FETCH_ALLCODE_FAILED:
      if (action.codeType === 'PRICE') {
        return {
          ...state,
          allPrices: [],
          isLoadingAllCode: false,
        };
      }
      if (action.codeType === 'PAYMENT') {
        return {
          ...state,
          allPayments: [],
          isLoadingAllCode: false,
        };
      }
      if (action.codeType === 'PROVINCE') {
        return {
          ...state,
          allProvinces: [],
          isLoadingAllCode: false,
        };
      }
      return {
        ...state,
        isLoadingAllCode: false,
      };

      // post booking =========================================================
    case actionTypes.CREATE_BOOKING_START:
      return {
        ...state,
        isBookingLoading: true,
        bookingError: null
      };

    case actionTypes.CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        isBookingLoading: false,
        bookingData: action.data,
        bookingError: null
      };

    case actionTypes.CREATE_BOOKING_FAILED:
      return {
        ...state,
        isBookingLoading: false,
        bookingData: null,
        bookingError: action.error
      };


        default:
            return state;
    }
};

export default adminReducer;
