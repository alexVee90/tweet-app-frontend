import React, { createContext, useReducer } from 'react'
import NotificationReducer from './NotificationReducer';
import { 
  SET_NOTIFICATION,
  CLEAR_NOTIFICATION
 } from './types';

export const NotificationContext = createContext();

const initialState = { 
  notification: null
}

export const NotificationProvider = props => {

  const [state, dispatch] = useReducer(NotificationReducer, initialState);

  const setNotification = msg => { 
    dispatch({
      type: SET_NOTIFICATION,
      payload: msg
    })
  }

  const clearNotification = msg => { 
    dispatch({
      type: CLEAR_NOTIFICATION
    })
  }

  return(
    <NotificationContext.Provider
      value={{
        setNotification,
        clearNotification,
        notification: state.notification
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}