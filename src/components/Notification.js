import React, { useEffect, useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext';

const styles = {
  width: '20%',
  background: 'blue',
  color: 'white',
  padding: '1rem',
  borderRadius: '10px',
  textAlign: 'center',
  margin: '1rem auto'
}

const Notification = (props) => {

  const notificationContext = useContext(NotificationContext);
  const { clearNotification } = notificationContext;

  useEffect( () => { 
    setTimeout( () => { 
      clearNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 2000)
  })

  const creation = (props) => props.notification.action === 'creation' && `${props.notification.user} created a new tweet`;
  const update = (props) => props.notification.action === 'update' && `${props.notification.user} updated ${props.notification.data.title}`;
  const deleted = (props) => props.notification.action === 'delete' && `${props.notification.user} deleted ${props.notification.data.title}`;

  return (
    <div style={styles}>
     {creation(props)}
     {update(props)}
     {deleted(props)}
    </div>
  )
}

export default Notification
