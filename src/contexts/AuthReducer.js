import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_AUTH_ERROR,
  LOGOUT,
  RECOVER_SUCCESS,
  RECOVER_FAILURE,
  RESET_SUCCESS,
  RESET_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from './types';

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case RESET_SUCCESS:
      localStorage.setItem('token', action.payload.data.token);
      localStorage.removeItem('resetToken');
      return { 
        ...state, 
        user: { id: action.payload.data.id, email: action.payload.data.email, tweets: action.payload.data.tweets },
        authError: null,
        resetToken: null
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case RESET_FAILURE:
      localStorage.removeItem('token')
      return { 
        ...state, 
        authError: action.payload.reason || action.payload.msg
      };
    case CLEAR_AUTH_ERROR: 
      return { 
        ...state,
        authError: null
      };
    case LOGOUT: 
      localStorage.removeItem('token')
      return { 
        ...state,
        user: null,
        authError: null
      };
    case RECOVER_SUCCESS: 
      localStorage.setItem('resetToken', action.payload.data)
      return { 
        ...state,
        resetToken: action.payload.data
      };
    case RECOVER_FAILURE: 
    return { 
      ...state,
      resetToken: null,
      authError: action.payload.reason || action.payload.msg
    };
    case GET_USER_SUCCESS:
      return { 
        ...state,
        resetToken: null,
        authError: null,
        user: action.payload.data
      };
    case GET_USER_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        authError: action.payload.reason || action.payload.msg,
        resetToken: null
      }
    default:
      return { 
        ...state
      }
  }
}