import React, { useContext, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import useFormState from '../../hooks/useFormState';
import { TweetContext } from '../../contexts/TweetContext';
import Error from '../Error';
import { AuthContext } from '../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '30%',
    margin: '0 auto',
    '& > *': {
      // margin: theme.spacing(1),
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

const Register = (props) => {
  const classes = useStyles();

  const tweetContext = useContext(TweetContext);
  const { setError, error } = tweetContext;

  const authContext = useContext(AuthContext);
  const { registerUser, authError, user } = authContext;

  const[email, changeEmail] = useFormState();
  const[password, changePassword] = useFormState();
  const[confirmPassword, changeConfirmPassword] = useFormState();

  const handleSubmit = e => { 
    e.preventDefault();
    if(password.length < 4 || confirmPassword.length < 4) return setError('Password must be at least 4 characters long');
    if(password !== confirmPassword) return setError('Passwords must match');

    registerUser({email, password});
  }

  if(error) return(
    <Error error={error || authError} />
  )

  if(user) props.history.push('/tweets');

  return (
    <Fragment>
      <h2>Please enter a valid email address so you can receive a welcome email</h2>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField label="Email" value={email} onChange={changeEmail} className={classes.item}  />
        <TextField label="Password" value={password} onChange={changePassword} type="password" className={classes.item} />
        <TextField label="Confirm Password" value={confirmPassword} onChange={changeConfirmPassword} type="password" className={classes.item} />
        <Button
          className={`${classes.item} ${classes.button}`}
          variant='contained'
          color='primary'
          endIcon={<Icon>send</Icon>}
          type='submit'
        >
          Register
        </Button>
      </form>
    </Fragment>
  )
}

export default Register
