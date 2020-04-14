import React, { createContext, useReducer } from 'react';
import TweetReducer                         from './TweetReducer';

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
  CLEAR_ERROR } from './types';

export const TweetContext = createContext();

const initialState = { 
  tweets: [], 
  tweet: {},
  error: null
}

export const TweetProvider = props => { 

  const [state, dispatch] = useReducer(TweetReducer, initialState);

  const getTweets = async () => { 
    const res = await fetch('http://localhost:5000/tweets', {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    });
    const data = await res.json();


    if(data.msg === 'success') { 
      dispatch({ 
        type: GET_TWEETS_SUCCESS,
        payload: data
      })
    } else { 
      dispatch({
        type: GET_TWEETS_FAILURE,
        payload: data
      })
    }
  }

  const getTweet = async (id) => { 
    const res = await fetch(`http://localhost:5000/tweets/${id}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    const data = await res.json();
    if(data.msg === 'success') { 
      dispatch({ 
        type: GET_TWEET_SUCCESS,
        payload: data
      })
    } else { 
      dispatch({ 
        type: GET_TWEET_FAILURE,
        payload: data
      })
    }
  }

  const clearTweet = () => { 
    dispatch({ 
      type: CLEAR_TWEET
    })
  }

  const updateTweet = async (formData, tweetId) => { 

    const res = await fetch(`http://localhost:5000/tweets/${tweetId}`, {
      body: formData,
      method: 'PUT',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    const data = await res.json();
    if(data.msg === 'success') { 
      dispatch({
        type: UPDATE_TWEET_SUCCESS,
        payload: data
      })
    } else { 
      dispatch({
        type: UPDATE_TWEET_FAILURE,
        payload: data
      })
    }
  }

  const createTweet = async formData => { 

    const res = await fetch('http://localhost:5000/tweets', {
      body: formData,
      method: 'POST',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    const data = await res.json();
    if(data.msg === 'success') {
      dispatch({
        type: CREATE_TWEET_SUCCESS,
        payload: data
      })
    } else { 
      dispatch({
        type: CREATE_TWEET_FAILURE,
        payload: data
      })
    }
  }

  const deleteTweet = async id => { 
    const res = await fetch(`http://localhost:5000/tweets/${id}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    const data = await res.json();
    if(data.msg === 'success') {
      dispatch({
        type: DELETE_TWEET_SUCCESS,
        payload: id
      })
    } else { 
      dispatch({
        type: DELETE_TWEET_FAILURE,
        payload: data
      })
    }
  }

  const setError = (msg) => { 
    dispatch({
      type: SET_ERROR,
      payload: msg
    })
  }

  const clearError = () => { 
    dispatch({
      type: CLEAR_ERROR
    })
  }

  return(
    <TweetContext.Provider
    value={
      {
        tweets: state.tweets,
        error: state.error,
        tweet: state.tweet,
        getTweets,
        getTweet,
        clearTweet,
        updateTweet,
        createTweet,
        deleteTweet,
        setError,
        clearError
      }

    }>
      {props.children}
    </TweetContext.Provider>
  )
}


