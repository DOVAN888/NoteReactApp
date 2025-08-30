import axios from '../axios';

const handleLogin = (email, password) => {
  return axios.post('/api/login', { email, password });
};

// ✅ Lấy tất cả người dùng (GET truyền params qua query string)
const getAllUsers = (inputId) => {
  // template string 
  return axios.get(`/api/get-all-users?id=${inputId}`);

};

// tao create user 
const createNewUser = (userData) => {
  // Gửi request POST tới API backend
  console.log('check userdata from service ',userData)
  return axios.post('api/create-new-users', userData);
 
};

// ham edit user
const updateUser = (userData) => {
  console.log(" data gửi tới backend:", userData);
  return axios.put('/api/edit-users', userData); // trả về nguyên axios response
};


// ham xoa user
const deleteUser = (userId) => {
    return axios.delete('/api/delete-users', {
        data: { id: userId } // axios yêu cầu phải để `data` khi gửi body cho DELETE data la tenn duoc axios cap nen ko phai la dat ten gi cung duoc ma la no co din roi 
    });
};
// lay dong allcode nhu gender ,position 
const getAllCodeSercice = (inputData) => {
   return axios.get(`/api/allcode?type=${inputData}`);
}

// lay bac si noi bat
export const getTopDoctorService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

// lay tat ca bac si co roleId = R2
export const getAllDoctorService = () => {
  return axios.get(`/api/get-all-doctors`);
};
// luu bac si chi tiet mardown 

export const saveDetailDoctorService= (data) => {
  return axios.post('/api/save-info-doctors', data);// truyen luon cuc data len phia service 
  
};
export const getDetailInfordoctor = (inputId) => {
     return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);

}
 // save doctor time 
export const saveDoctorSchedule = (data) => {
  return axios.post('/api/bulk-create-schedule', data);
};

// get all bydoctor time 
export const getSchedulesByDoctor = (doctorId) => {
  return axios.get(`/api/get-schedules-by-doctor`, {
    params: { doctorId }  // Gửi doctorId qua query param
  });
};
// delete bydoctor time 
export const deleteSchedulesByDate = (doctorId, date) => {
  return axios.delete(`/api/delete-schedules-by-date`, {
    params: { doctorId, date }  // Gửi query param đúng
  });
};
// post booking 
export const postBookingAppointment = (data) => {
    console.log('check userdata from service ',data)
   return axios.post('api/create-booking',data);
}
const userService = {
  handleLogin, getAllUsers, createNewUser, deleteUser, updateUser,
  getAllCodeSercice, getTopDoctorService, getAllDoctorService, saveDetailDoctorService,
  getDetailInfordoctor,saveDoctorSchedule,getSchedulesByDoctor,deleteSchedulesByDate,postBookingAppointment
};

export default userService;
