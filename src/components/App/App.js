import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../Header/Header';
import HomePage from '../../routes/HomePage/HomePage';
import GamePage from '../../routes/GamePage/GamePage';
import LeaderboardsPage from '../../routes/LeaderboardsPage/LeaderboardsPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import SettingsPage from '../../routes/SettingsPage/SettingsPage';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import LoggedInRoute from '../../RouteUtils/LoggedInRoute';
import LoggedOutRoute from '../../RouteUtils/LoggedOutRoute';
import config from '../../config';

export default class App extends React.Component{
  static contextType = UserContext;
  state = { hasError: false }

  //Get local storage data, and get username from database
  //Clear all contexts and local storage if not found
  componentDidMount() {
    this.context.clearError();
    if (TokenService.hasAuthToken() && TokenService.hasUserId()) {
      AuthApiService.getUserById(TokenService.getUserId())
        .then(user => {
          this.context.setUser(user.username);
        })
        .catch(err => {
          TokenService.clearAuthToken();
          TokenService.clearUserId();
        })
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  
  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Color Game</title>
        </Helmet>
        <header className="Header">
          <Header />
        </header>
        <main className="Main">
          <Switch>
            <Route path={"/play"} component={GamePage} />
            <Route path={"/leader"} component={LeaderboardsPage} />
            <LoggedOutRoute path={"/login"} component={LoginPage} />
            <LoggedOutRoute path={"/register"} component={RegistrationPage} />
            <LoggedInRoute path={"/settings"} component={SettingsPage} />
            <Route exact path={"/"} component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}