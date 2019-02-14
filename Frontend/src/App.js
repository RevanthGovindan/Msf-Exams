import React, { Component } from 'react';
import { isMobile } from "react-device-detect";
import { AppSettings } from './common/AppSettings';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginPage from './screens/prelogin/LoginPage';
import AdminPage from './screens/postlogin/AdminPage';
import CandidatePage from './screens/postlogin/CandidatePage';
import NoPage from './screens/others/NoPage';
import PrivateRoute from './screens/others/PrivateRouter'
import './assets/css/global.css';
import { CommonErrorMessages } from './common/Messages';

class App extends Component {

  render() {

    if (isMobile) {
      // app opened in mobile
      return (
        <div className="app-mobile">
          {CommonErrorMessages.NoMobile}
        </div>
      );
    }
    else {
      // app opened in desktop / tablet
      return (
        <div
          className="app"
          style={
            {
              minWidth: AppSettings.minBrowserWidth,
              minHeight: AppSettings.minBrowserHeight,
              overflow: window.innerWidth < AppSettings.minBrowserWidth || window.innerHeight < AppSettings.minBrowserHeight ? "auto" : "hidden"
            }
          }
        >

          <BrowserRouter >
            <Switch>

              <Route path='/' exact component={LoginPage}/>
              {/* <Route path='/login' exact component={LoginPage} /> */}
              <PrivateRoute path='/AdminPage' exact component={AdminPage} />
              <PrivateRoute path='/CandidatePage' exact component={CandidatePage}/>
              <PrivateRoute path='*' exact component={NoPage} />

            </Switch>
          </BrowserRouter>

        </div>
      )
    }


  }

}

export default App;
