import {
  SET_NOTIFICATION,
  CLEAR_NOTIFICATION
} from './types';

export default (state, action) => { 
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload
      };
    case CLEAR_NOTIFICATION:
      return { 
        ...state,
        notification: null
      };
    default:
      return {
        ...state
      };
  }
}