import React, { useContext, Fragment } from 'react';
import { makeStyles }                  from '@material-ui/core/styles';
import AppBar                          from '@material-ui/core/AppBar';
import Toolbar                         from '@material-ui/core/Toolbar';
import Typography                      from '@material-ui/core/Typography';
import Button                          from '@material-ui/core/Button';
import { Link, NavLink }               from 'react-router-dom';
import { AuthContext }                 from '../contexts/AuthContext';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  links: {
    color: 'white',
    textDecoration: 'none',
  },
}));

function Navbar() {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { user, logout } = authContext;

  const handleLogout = () => { 
    logout();
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link
              style={{ color: 'white', textDecoration: 'none' }}
              to='/tweets'
            >
              Tweet-App
            </Link>
          </Typography>
          {!user ? (
            <Fragment>
              <NavLink exact to='/auth/login' className={classes.links}>
                <Button color='inherit'>Login</Button>
              </NavLink>
              <NavLink exact to='/auth/register' className={classes.links}>
                <Button color='inherit'>Register</Button>
              </NavLink>
            </Fragment>
          ) : (
              <Button onClick={handleLogout} color='inherit'>Logout</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
