import {LOGIN_REQUEST , LOGIN_SUCCESS , LOGIN_FAIL , SIGNUP_REQUEST , SIGNUP_SUCCESS , SIGNUP_FAIL ,
    LOADUSER_REQUEST , LOADUSER_SUCCESS , LOADUSER_FAIL , CLEAR_ERRORS, LOGOUT_SUCCESS, LOGOUT_FAIL , 
    UPDATE_PROFILE_REQUEST , UPDATE_PROFILE_SUCCESS , UPDATE_PROFILE_FAIL , UPDATE_PROFILE_RESET , 
    UPDATE_PASSWORD_REQUEST , UPDATE_PASSWORD_SUCCESS , UPDATE_PASSWORD_FAIL , UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST , FORGOT_PASSWORD_SUCCESS , FORGOT_PASSWORD_FAIL , 
    RESET_PASSWORD_REQUEST , RESET_PASSWORD_SUCCESS , RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL} from "../constants/userConstants"

export const userReducer = (state = { user: {} }, action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
            case SIGNUP_REQUEST:
                case LOADUSER_REQUEST:
          return {
            loading: true,
            isAuthenticated:false
          }
        case LOGIN_SUCCESS:
            case SIGNUP_SUCCESS:
                case LOADUSER_SUCCESS:
          return {
            loading: false,
            isAuthenticated:true,
            user:action.payload
          }
        case LOGIN_FAIL:
            case SIGNUP_FAIL:
          return {
            ...state,
            loading: false,
            isAuthenticated:false,
            user:null,
            error: action.payload,
          };
          case LOADUSER_FAIL:
            return{
                loading: false,
                isAuthenticated:false,
                user:null,
                error: action.payload,
            }
            case LOGOUT_SUCCESS:
              return{
                loading:false,
                user:null,
                isAuthenticated:false,
              }
              case LOGOUT_FAIL:
                return{
                  ...state,
                  loading:false,
                  error:action.payload
                }
            
    
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return state;
      }
}


export const profileReducer = (state = {}, action)=>{
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
          case UPDATE_USER_REQUEST:
            case DELETE_USER_REQUEST:
          return {
            ...state,
            loading: true, 
          }
     case UPDATE_PROFILE_SUCCESS:
     case UPDATE_PASSWORD_SUCCESS:
      case UPDATE_USER_SUCCESS:
          return {
            ...state,
            loading: false,
            isUpdated:action.payload
          }
          case DELETE_USER_SUCCESS:
            return {
              ...state,
              loading: false,
              isDeleted: action.payload.success,
              message: action.payload.message,
            };
      case UPDATE_PROFILE_FAIL:
      case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
          case DELETE_USER_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload
          };
          case UPDATE_PROFILE_RESET:
          case UPDATE_PASSWORD_RESET:
            case UPDATE_USER_RESET:
            return{
                ...state,
                isUpdated:false 
            }
            case DELETE_USER_RESET:
              return {
                ...state,
                isDeleted: false,
              };
            
    
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return state;
      }
}


export const forgotPasswordReducer = (state = {}, action)=>{
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
          return {
            ...state,
            loading: true, 
          }
     case FORGOT_PASSWORD_SUCCESS:
     
          return {
            ...state,
            loading: false,
            message:action.payload
          }
    case RESET_PASSWORD_SUCCESS:
      return{
        ...state,
        loading:false,
        success:action.payload
      }
      case FORGOT_PASSWORD_FAIL:
      case RESET_PASSWORD_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload
          };
            
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return state;
      }
}

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};