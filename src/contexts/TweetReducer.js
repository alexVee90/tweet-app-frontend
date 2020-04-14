import { 
  GET_TWEETS_SUCCESS, 
  GET_TWEETS_FAILURE,
  GET_TWEET_SUCCESS,
  GET_TWEET_FAILURE,
  CLEAR_TWEET,
  CREATE_TWEET_FAILURE,
  CREATE_TWEET_SUCCESS,
  UPDATE_TWEET_SUCCESS,
  UPDATE_TWEET_FAILURE,
  DELETE_TWEET_SUCCESS,
  DELETE_TWEET_FAILURE,
  SET_ERROR, 
  CLEAR_ERROR
} from './types';

export default (state, action) => {
  switch (action.type) {
    case GET_TWEETS_SUCCESS:
      return {
        ...state,
        tweets: action.payload.data,
        error: null
      };
    case GET_TWEET_SUCCESS:
      return { 
        ...state,
        tweet: action.payload.data,
        error: null
      };
    case CLEAR_TWEET: 
      return { 
        ...state,
        tweet: {}
      };
    case CREATE_TWEET_SUCCESS:
      return { 
        ...state,
        tweets: [...state.tweets, action.payload.data],
        error: null
      };
    case UPDATE_TWEET_SUCCESS:
      return { 
        ...state,
        tweets: state.tweets.map(t => t._id === action.payload.data._id ? action.payload.data : t),
        error: null
      };
    case DELETE_TWEET_SUCCESS:
      return { 
        ...state,
        tweets: state.tweets.filter(t => t._id !== action.payload),
        error: null
      };
    case SET_ERROR: 
      return { 
        ...state,
        error: action.payload
      };
    case CLEAR_ERROR: 
      return {
        ...state,
        error: null
      }
    case GET_TWEETS_FAILURE:
    case UPDATE_TWEET_FAILURE:
    case CREATE_TWEET_FAILURE:
    case GET_TWEET_FAILURE: 
    case DELETE_TWEET_FAILURE: 
      return { 
        ...state, 
        error: action.payload.reason || action.payload.msg
      };    
    default:
      return {
        ...state,
      };
  }
};
