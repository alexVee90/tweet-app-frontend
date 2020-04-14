import React, { useContext, useEffect } from 'react'
import {AuthContext}                    from '../contexts/AuthContext';

const About = (props) => {
  const styles = { 
    textAlign: 'center',
    margin: '2rem'
  }

  const authContext = useContext(AuthContext);
  const { getUser, user } = authContext;

  useEffect( () => { 
    const token = localStorage.getItem('token')
    if(token) getUser(token);
    // eslint-disable-next-line
  }, [])

  if(user) props.history.push('/tweets');

  return (
    
    <div style={styles} >
      App v.1 - Simple Crud app with auth.
      <div className="hero">
        Please <a href="/auth/login">LOGIN</a> or <a href="/auth/login">REGISTER</a> to browse arround
      </div>
    </div>
  )
}

export default About
