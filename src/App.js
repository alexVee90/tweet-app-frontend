import React,{ Fragment } from 'react';
import './App.css';
import { Route, Switch }          from 'react-router-dom'
import { TweetProvider }          from './contexts/TweetContext';
import { AuthProvider }           from './contexts/AuthContext';
import { NotificationProvider }   from './contexts/NotificationContext';

import Navbar       from './components/Navbar';
import About        from './components/About';
import Tweets       from './components/Tweets';
import TweetForm    from './components/TweetForm';
import Login        from './components/auth/Login';
import Register     from './components/auth/Register';
import Recover      from './components/auth/Recover';
import Reset        from './components/auth/Reset';

function App() {

  return (
    <Fragment>
      <AuthProvider>
        <TweetProvider>
          <Navbar /> 
          <Switch>
            <NotificationProvider>
              <Route exact path="/" component={About} />
              <Route exact path="/tweets" component={Tweets} />
              <Route exact path="/tweets/form" component={TweetForm} />
              <Route exact path="/auth/login" component={Login} />
              <Route exact path="/auth/register" component={Register} />
              <Route exact path="/auth/recover" component={Recover} />
              <Route exact path="/auth/reset" component={Reset} />
            </NotificationProvider>
          </Switch>
        </TweetProvider>
      </AuthProvider>
    </Fragment>
  );
}

export default App;
