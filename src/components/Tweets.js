import React, { useEffect, useContext } from 'react';
import Tweet                            from './Tweet';
import { TweetContext }                 from '../contexts/TweetContext';
import { makeStyles }                   from '@material-ui/core/styles';
import CssBaseline                      from '@material-ui/core/CssBaseline';
import Container                        from '@material-ui/core/Container';
import Fab                              from '@material-ui/core/Fab';
import AddIcon                          from '@material-ui/icons/Add';
import Error                            from './Error';
import { AuthContext }                  from '../contexts/AuthContext';
import openSocket                       from 'socket.io-client';
import { NotificationContext }          from '../contexts/NotificationContext';
import Notification                     from './Notification';

const useStyles = makeStyles( theme => ({
  containerRoot: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  fabRoot: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  addRoot: { 
    position: 'absolute',
    top: 100,
    right: 60
  }
}));

const socket = openSocket('http://localhost:5000'); 

const Tweets = (props) => {
  const classes = useStyles();
 
  const tweetContext = useContext(TweetContext);
  const { getTweets, tweets, error } = tweetContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;
  
  const notificationContext = useContext(NotificationContext);
  const { notification, setNotification } = notificationContext;

  if(!user) props.history.push('/');

  useEffect(() => {
    getTweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect( () => { 
    socket.on('tweets', data => setNotification(data) );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAdd = () => { 
    props.history.push(`/tweets/form?edit=false`)
  }

  if(error) { 
    return(
      <Error error={error} />
    )
  }

  return (
    <div>
    {notification && <Notification notification={notification} />}
    <CssBaseline />
    <Container className={classes.containerRoot} fixed>
    {tweets.length ? (
        tweets.map((tweet) => {
          return <Tweet {...tweet} key={tweet._id} />;
        })
      ) : (
        <h2>There are no Tweets at the moment</h2>
      )}
    </Container>
    <div className={classes.fabRoot}>
      <Fab color="primary" aria-label="add" className={classes.addRoot} onClick={handleAdd}>
        <AddIcon />
      </Fab>
    </div>
  </div>
  );
};

export default Tweets;
