import React, { useContext } from 'react'
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
  },
}));

const Reset = (props) => {
  const classes = useStyles();

  const tweetContext = useContext(TweetContext);
  const { setError, error } = tweetContext;

  const authContext = useContext(AuthContext);
  const { resetPassword, user } = authContext;

  if(user) props.history.push('/tweets');

  const [password, changePassword] = useFormState();
  const [confirmPassword, changeConfirmPassword] = useFormState();

  const handleSubmit = e => { 
    e.preventDefault();
    if(password !== confirmPassword) return setError('Passwords do not match')
    resetPassword({ password, recoverToken: localStorage.getItem('recoverToken') })
  }

  if(error) return(
    <Error error={error} />
  )

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
    <TextField
      label='New Password'
      value={password}
      onChange={changePassword}
      className={classes.item}
      type='password'
    />
    <TextField
      label='Confirm Password'
      value={confirmPassword}
      onChange={changeConfirmPassword}
      className={classes.item}
      type='password'
    />
    <Button
      className={`${classes.item} ${classes.button}`}
      variant='contained'
      color='primary'
      endIcon={<Icon>send</Icon>}
      type='submit'
    >
      Reset
    </Button>
  </form>
  )
}

export default Reset
