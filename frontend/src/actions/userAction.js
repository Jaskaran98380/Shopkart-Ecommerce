import axios from "axios";
import {LOGIN_REQUEST , LOGIN_SUCCESS , LOGIN_FAIL , SIGNUP_REQUEST , SIGNUP_SUCCESS , SIGNUP_FAIL ,
    LOADUSER_REQUEST , LOADUSER_SUCCESS , LOADUSER_FAIL , LOGOUT_SUCCESS , LOGOUT_FAIL ,
    UPDATE_PROFILE_REQUEST , UPDATE_PROFILE_SUCCESS , UPDATE_PROFILE_FAIL ,
    UPDATE_PASSWORD_REQUEST , UPDATE_PASSWORD_SUCCESS , UPDATE_PASSWORD_FAIL , UPDATE_PASSWORD_RESET , 
    FORGOT_PASSWORD_REQUEST , FORGOT_PASSWORD_SUCCESS , FORGOT_PASSWORD_FAIL , 
    RESET_PASSWORD_REQUEST , RESET_PASSWORD_SUCCESS , RESET_PASSWORD_FAIL , 
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL, CLEAR_ERRORS} from "../constants/userConstants"

//LOGIN
export const login = (email,password)=>async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST});
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.post('api/v1/login' , {email , password} , config);

        dispatch({type:LOGIN_SUCCESS , payload:data.user});
       
    }
    catch(error){
        dispatch({type:LOGIN_FAIL , payload:error.response.data.message});
    }
}

//SIGNUP
export const signUp = (formData)=>async(dispatch)=>{
    try{
        dispatch({type:SIGNUP_REQUEST});
        const config = {headers:{"Content-Type":"multipart/form-data"}}
        const {data} = await axios.post('api/v1/register' , formData , config);

        dispatch({type:SIGNUP_SUCCESS , payload:data.user});
    }
    catch(error){
        dispatch({type:SIGNUP_FAIL , payload:error.response.data.message});
    }
}

//LOADUSER
export const loadUser = ()=>async(dispatch)=>{
    try{
        dispatch({type:LOADUSER_REQUEST});
        const {data} = await axios.get('/api/v1/me');
        console.log(data);
        dispatch({type:LOADUSER_SUCCESS , payload:data.user});
    }
    catch(error){
        dispatch({type:LOADUSER_FAIL , payload:error.response.data.message});
    }
}

//LOGOUT
export const logout = ()=>async(dispatch)=>{
    try{
         await axios.get('/api/v1/logout');

        dispatch({type:LOGOUT_SUCCESS});
       
    }
    catch(error){
        dispatch({type:LOGOUT_FAIL , payload:error.response.data.message});
    }
}

//UPDATE USER PROFILE
export const updateProfile = (formData)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PROFILE_REQUEST});
        const config = {headers:{"Content-Type":"multipart/form-data"}}
        const {data} = await axios.put('/api/v1/profile/update' , formData , config);

        dispatch({type:UPDATE_PROFILE_SUCCESS , payload:data.success});
    }
    catch(error){
        dispatch({type:UPDATE_PROFILE_FAIL , payload:error.response.data.message});
    }
}

//UPDATE PASSWORD
export const updatePassword = (passwords)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PASSWORD_REQUEST});
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.put('/api/v1/password/update' , passwords , config);

        dispatch({type:UPDATE_PASSWORD_SUCCESS , payload:data.success});
    }
    catch(error){
        dispatch({type:UPDATE_PASSWORD_FAIL , payload:error.response.data.message});
    }
}

//FORGOT PASSWORD
export const forgotPassword = (email)=>async(dispatch)=>{
    try{
        dispatch({type:FORGOT_PASSWORD_REQUEST});
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.post('/api/v1/password/forgot' , email , config);

        dispatch({type:FORGOT_PASSWORD_SUCCESS , payload:data.message});
    }
    catch(error){
        dispatch({type:FORGOT_PASSWORD_FAIL , payload:error.response.data.message});
    }
}

//RESET PASSWORD
export const resetPassword = (token , passwords)=>async(dispatch)=>{
    try{
        dispatch({type:RESET_PASSWORD_REQUEST});
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.put(`/api/v1/password/reset/${token}` , passwords , config);

        dispatch({type:RESET_PASSWORD_SUCCESS , payload:data.success});
    }
    catch(error){
        dispatch({type:RESET_PASSWORD_FAIL , payload:error.response.data.message});
    }
}

// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const { data } = await axios.get(`/api/v1/admin/getAllUsers`);
  
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
  };
  
  // get  User Details
  export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/v1/admin/user/${id}`);
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };
  
  // Update User
  export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `/api/v1/admin/user/${id}`,
        userData,
        config
      );
  
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete User
  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
  
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };