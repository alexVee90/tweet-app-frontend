import React, { useEffect, useContext } from 'react';
import { TweetContext }                 from '../contexts/TweetContext';
import { AuthContext }                  from '../contexts/AuthContext';
import { withRouter }                   from 'react-router-dom';

const Error = (props) => {
  const tweetContext = useContext(TweetContext);
  const { clearError, error } = tweetContext;

  const authContext = useContext(AuthContext);
  const { clearAuthError, authError } = authContext;

  useEffect( () => {
    setTimeout( ()=> { 
      error && clearError();
      authError && clearAuthError();
    }, 1500)
    // eslint-disable-next-line
  }, [])

  return <h2 style={{color: 'red', display: 'flex', justifyContent: 'center', fontSize: 50}}>{props.error}</h2>;
};

export default withRouter(Error);
