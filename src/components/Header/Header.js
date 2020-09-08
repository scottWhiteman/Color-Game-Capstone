import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';

export default class Header extends React.Component {
  static contextType = UserContext;
  handleLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearUserId();
    this.context.clearUser();
  }

  displayUser = () => {
    const { user } = this.context
    console.log(user);
    if (user){
      return `Logged in as ${user}`
    }
    return 'Not logged in';
  }

  renderLogin = () => {
    return (
      <>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </>
    )
  }

  renderLogout = () => {
    return (
      <>
        <Link
          onClick={this.handleLogout}
          to='/'>
          Logout
        </Link>
        <Link to='/settings'>Settings</Link>
      </>
    )
  }
  
  render() {
    return (
      <nav className='Header'>
        <h3>{this.displayUser()}</h3>
        <h2>Color Game</h2>
        <div className='Header-tabs'>
          <Link to='/play'>Play</Link>
          <Link to='/'>About</Link>
          <Link to='leader'>Leaderboard</Link>
          {TokenService.hasAuthToken()
            ? this.renderLogout()
            : this.renderLogin()}
        </div>
      </nav>
    );
  }
}