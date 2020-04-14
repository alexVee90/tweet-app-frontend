import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import useFormState from '../../hooks/useFormState';
import { TweetContext } from '../../contexts/TweetContext';
import Error from '../Error';
import { AuthContext } from '../../contexts/AuthContext';
import { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '30%',
    margin: '0 auto',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  button: {
    margin: theme.spacing(1),
    marginLeft: 20,
    width: '100%',
  },
  item: {
    margin: 25,
  }
}));

const Login = (props) => {
  const classes = useStyles();

  const tweetContext = useContext(TweetContext);
  const { setError, error } = tweetContext;

  const authContext = useContext(AuthContext);
  const { loginUser, authError, user } = authContext;

  const [email, changeEmail] = useFormState();
  const [password, changePassword] = useFormState();

  const handleSubmit = e => {
    e.preventDefault();
    if(password.length < 4) { 
      return setError('Password must be min 4 characters long')
    }

    loginUser({email, password});
  }

  if(error || authError) return (
    <Error error={error || authError} />
  )

  if(user) props.history.push('/tweets');

  return (
    <Fragment>
      <h2>Please enter a valid email address so you can receive a welcome email</h2>
      <form 
        className={classes.root} 
        onSubmit={handleSubmit}
      >
        <TextField label="Email" value={email} onChange={changeEmail} className={classes.item} type="email"  />
        <TextField label="Password" value={password} onChange={changePassword} type="password" className={classes.item}/>
        <Button
          className={`${classes.item} ${classes.button}`}
          variant='contained'
          color='primary'
          endIcon={<Icon>send</Icon>}
          type='submit'
        >
          Login
        </Button>
      </form>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <a href="/auth/recover">Forgot your pasword?</a>
      </div>
    </Fragment>
  )
}

export default Login
