import React, { useState, useContext } from 'react'; 
import { makeStyles }                  from '@material-ui/core/styles';
import Card                            from '@material-ui/core/Card';
import CardActionArea                  from '@material-ui/core/CardActionArea';
import CardActions                     from '@material-ui/core/CardActions';
import CardContent                     from '@material-ui/core/CardContent';
import CardMedia                       from '@material-ui/core/CardMedia';
import Typography                      from '@material-ui/core/Typography';
import Modal                           from '@material-ui/core/Modal';
import Button                          from '@material-ui/core/Button';
import DeleteIcon                      from '@material-ui/icons/Delete';
import { withRouter }                  from 'react-router-dom';
import { TweetContext }                from '../contexts/TweetContext';
import Error                           from './Error';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles( theme => ({
  root: {
    maxWidth: 345,
    margin: 16,
    flexBasis: 250
  },
  media: {
    height: 140,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalBtn: { 
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 8
  }
}));

const Tweet = props => { 
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const tweetContext = useContext(TweetContext);
  const { getTweet, deleteTweet, error } = tweetContext;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => { 
    getTweet(props._id);
    setTimeout(() => { 
      props.history.push(`/tweets/form/?edit=true&id=${props._id}`);
    }, 500)
  }

  const handleDelete = e => { 
    deleteTweet(props._id)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{ props.title }</h2>
      <p id="simple-modal-description">
        {props.desc}
      </p>
    </div>
  );

  if (error) {
    return <Error error={error} />;
  }

  return (
    <Card className={classes.root}>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            className={classes.media}
            image={props.imageUrl}
            title={ props.title }
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              { props.title }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              { props.desc }
            </Typography>
          </CardContent>
        </CardActionArea>
      <CardActions className={classes.modalBtn}>
        <Button 
          type="button" 
          variant="contained"
          color="default" 
          onClick={handleOpen}>
            Open
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={handleDelete}
      >
        Delete
      </Button>
      </CardActions>
    </Card>
  );
}

export default withRouter(Tweet);