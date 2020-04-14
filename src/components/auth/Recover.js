import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import useFormState from '../../hooks/useFormState';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import Error from '../Error';
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
  },
}));

const Recover = () => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { recoverPassword, authError, resetToken } = authContext;

  const [email, changeEmail] = useFormState();

  const handleSubmit = (e) => {
    e.preventDefault();
    recoverPassword({ email });
  };

  if (authError) return <Error error={authError} />;

  return (
    <Fragment>
      {resetToken ? (
        <h2>An Email has been sent to your Email address</h2>
      ) : (
        <form className={classes.root} onSubmit={handleSubmit}>
          <TextField
            label='Email'
            value={email}
            onChange={changeEmail}
            className={classes.item}
            type='email'
          />
          <Button
            className={`${classes.item} ${classes.button}`}
            variant='contained'
            color='primary'
            endIcon={<Icon>send</Icon>}
            type='submit'
          >
            Recover
          </Button>
        </form>
      )}
    </Fragment>
  );
};

export default Recover;
