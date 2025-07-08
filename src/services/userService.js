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

const userService = {
  handleLogin, getAllUsers, createNewUser, deleteUser, updateUser,
  getAllCodeSercice, getTopDoctorService, getAllDoctorService, saveDetailDoctorService,
  getDetailInfordoctor
};

export default userService;
