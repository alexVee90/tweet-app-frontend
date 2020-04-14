import React, { useContext, useEffect, useState } from 'react';
import { makeStyles }                             from '@material-ui/core/styles';
import TextField                                  from '@material-ui/core/TextField';
import Button                                     from '@material-ui/core/Button';
import Icon                                       from '@material-ui/core/Icon';
import { TweetContext }                           from '../contexts/TweetContext';
import Error                                      from './Error';
import useFormState                               from '../hooks/useFormState';
import { AuthContext }                            from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '30%',
    margin: '0 auto',
    '& > *': {
      width: '100%',
      // display: 'flex',
      // flexDirection: 'column',
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

const TweetForm = (props) => {
  const classes = useStyles();

  const tweetContext = useContext(TweetContext);
  const {
    tweet,
    error,
    getTweet,
    clearTweet,
    updateTweet,
    createTweet,
  } = tweetContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  if(!user) props.history.push('/');

  const [title, changeTitle, clearTitle] = useFormState();
  const [desc, changeDesc, clearDesc] = useFormState();
  const [file, setFile] = useState({});

  const str = props.location.search.replace('?', '').split('&');
  const edit = str[0].split('=')[1] === 'true' ? true : false;
  let tweetId = edit ? str[1].split('=')[1] : '';

  useEffect(() => {
    if(edit) {
      getTweet(tweetId);
    }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => clearTweet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('image', file);

    edit ? updateTweet(formData, tweetId) : createTweet(formData);

    clearTitle();
    clearDesc();
    setFile({});

    props.history.push('/tweets');
  };

  let isDisabled = true;
  if(title || desc)  isDisabled = (title.length < 4 || desc.length < 4) ? true : false;

  if (error) {
    return <Error error={error} />;
  }
  
  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <TextField
        className={classes.item}
        id='standard-basic'
        label='Title'
        placeholder={edit ? tweet.title : ' '}
        value={title}
        onChange={changeTitle}
      />
      <TextField
        className={classes.item}
        id='standard-textarea'
        label='Description'
        placeholder={edit ? tweet.desc : ' '}
        multiline
        value={desc}
        onChange={changeDesc}
      />
      <input
        className={classes.item}
        type='file'
        name='image'
        id='image'
        onChange={(e) => setFile(e.target.files[0])}
        required={true}
      />
      <Button
        className={`${classes.item} ${classes.button}`}
        variant='contained'
        color='primary'
        endIcon={<Icon>send</Icon>}
        type='submit'
        disabled={isDisabled}
      >
        Submit
      </Button>
    </form>
  );
};

export default TweetForm;
