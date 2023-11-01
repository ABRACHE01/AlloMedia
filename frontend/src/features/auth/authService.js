import axios from 'axios'
import jwtDecode from "jwt-decode"
import Cookies from "js-cookie"

axios.defaults.withCredentials = true;
const API_URL = 'http://localhost:3000/api/';


// Register user
const register = async (userData) => {

    const response = await axios.post(API_URL+ 'auth', userData)

    if (response.data) {
      return response.data
    }
}

const login = async (userData) => {


    const response = await axios.post(API_URL + 'auth/login', userData);
  
    if(response.data){

    const token = Cookies.get('al_ui');
    if (token) {

      const decodedToken = jwtDecode(token);
      localStorage.setItem('user', JSON.stringify(decodedToken));
      localStorage.setItem('isAuth', JSON.stringify(true));

    } 
    return response.data;
   
  }
  
};

const logout = async() => {
  const response = await axios.get(API_URL + 'auth/logout');
  if(response.data){
    localStorage.removeItem('user');
    localStorage.removeItem('isAuth');

    return response.data
  }

};

const sendEmforgetPass = async(userData) =>{

    const response = await axios.post(API_URL + 'auth/forget' ,userData)
    if (response.data) {
      return response.data
    }

}

const resetForgottenPass = async(userData ) =>{

  const {token ,  newPassword , repeat_newPassword } = userData ;
  const Data = { newPassword , repeat_newPassword };


    const response = await axios.post(API_URL + `auth/newPass/${token}` , Data )
    if (response.data) {
      return response.data
    }

}

//reset password 
const sendEmResetPass = async(role) =>{

  const response = await axios.post(API_URL + `user/${role}/profileResetPass` )
  if (response.data) {
    return response.data
  }

}

const resetLogedPass = async(userData ) =>{

  const {token , role ,oldPassword , newPassword , repeat_newPassword } = userData ;
  const Data = { newPassword , repeat_newPassword , oldPassword };


    const response = await axios.post(API_URL + `user/${role}/newPassloggedin/${token}` , Data )
    if (response.data) {
      return response.data
    }

}

// const profile = async(role) =>{
//   const response = await axios.get(API_URL + `user/${role}/me` )
//   if (response.data) {
//     return response.data
//   }
// }

  const authService = {
    login,
    register,
    logout,
    sendEmforgetPass,
    sendEmResetPass,
    resetLogedPass,
    resetForgottenPass,
  }

  export default authService
