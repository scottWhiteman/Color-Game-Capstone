import React from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import './LoginForm.css';

export default class LoginForm extends React.Component {
  static contextType = UserContext;
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

  //Post login info to get authentication and token
  handleLogin = e => {
    e.preventDefault();
    this.setState({ error: null })
    const { username, password } = e.target;

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      //Clear inputs and take data to local storage and context
      .then(res => {
        username.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        TokenService.saveUserId(res.user_id);
        this.context.setUser(res.username);
        this.context.clearError();
        //Run callback if given one
        this.props.onLoginSuccess();
      })
      //Error state, display error
      .catch(res => {
        this.setState({ error: res.error })
      })
    
  }
  render() {
    const {error} = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleLogin}>
          { error && <section className="error-container"><p>{error}</p></section>}
        <label forhtml="username">Enter a Username:</label><br/>
        <input name="username" className="username" type="text" /><br/>
        <label forhtml="password">Password:</label><br/>
        <input name="password" className="password" type="password" /><br/>
        <button type="submit">Login</button>
      </form>
    );
  }
}