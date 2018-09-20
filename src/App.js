import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import ApplicationContainer from './containers/Application/ApplicationContainer';
import AuthenticationContainer from './containers/Authentication/AuthenticationContainer';

import './scss/app.scss';

class App extends Component {
  render() {
    return (
        <div className='container' >
          <Switch>
            <Route path='/login' component={ AuthenticationContainer } />
            <Route path='/' component={ ApplicationContainer } />
          </Switch>
        </div>
    );
  }
}

export default App;
