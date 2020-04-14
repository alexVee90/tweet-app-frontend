import React, { createContext, useReducer } from 'react';
import AuthReducer                          from './AuthReducer';
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

export const AuthContext = createContext();

const initialState = { 
  user: null,
  authError: null,
  resetToken: null
}

export const AuthProvider = props => { 

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loginUser = async user => { 
    const res = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    if(data.msg === 'success') { 
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data
      })
    } else { 
      dispatch({
        type: LOGIN_FAILURE,
        payload: data
      })
    }
  }

  const registerUser = async user => { 
    const res = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json'
      }
    });
    const data = await res.json();
    if(data.msg === 'success') { 
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data
      })
    } else { 
      dispatch({
        type: REGISTER_FAILURE,
        payload: data
      })
    }
  }

  const clearAuthError = () => { 
    dispatch({
      type: CLEAR_AUTH_ERROR
    })
  }

  const logout = () => { 
    dispatch({
      type: LOGOUT
    })
  }

  const recoverPassword = async input => { 
    const res = await fetch('http://localhost:5000/auth/recover', { 
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input) 
    });
    const data = await res.json();
    console.log(data);
    if(data.msg === 'success') { 
      dispatch({
        type: RECOVER_SUCCESS,
        payload: data
      })
    } else { 
      dispatch({
        type: RECOVER_FAILURE,
        payload: data
      })
    }
  }

  const resetPassword = async input => { 
    const res = await fetch('http://localhost:5000/auth/reset', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    }) 
    const data = await res.json();
    if(data.msg === 'success') { 
      dispatch({
        type: RESET_SUCCESS,
        payload: data
      })
    } else { 
      dispatch({
        type: RESET_FAILURE,
        payload: data
      })
    }
  }

  const getUser = async token => { 
    const res = await fetch('http://localhost:5000/auth', {
      headers: {
        'x-auth-token': token
      }
    })
    const data = await res.json();
    if(data.msg === 'success') { 
      dispatch({
        type: GET_USER_SUCCESS,
        payload: data
      })
    } else { 
      dispatch({
        type: GET_USER_FAILURE,
        payload: data
      })
    }
  }

  return(
    <AuthContext.Provider
      value={
        {
          user: state.user,
          authError: state.authError,
          loginUser,
          registerUser,
          clearAuthError,
          logout,
          recoverPassword,
          resetToken: state.resetToken,
          resetPassword,
          getUser
        }
      }
    >
      {props.children}
    </AuthContext.Provider>
  )
}