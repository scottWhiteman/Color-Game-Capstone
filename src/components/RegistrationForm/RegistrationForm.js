import React from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import './RegistrationForm.css';
import UserContext from '../../contexts/UserContext';

export default class RegistrationForm extends React.Component {
  static contextType = UserContext;
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  //Create a new account in database and login
  handleRegister = e => {
    e.preventDefault();
    this.setState({ error: null })
    const { username, password, repeat } = e.target;
    if (password.value !== repeat.value) {
      this.setState({error: 'Passwords do not match'})
      return;
    }
    //Create new user
    AuthApiService.postUser({
      username: username.value,
      password: password.value
    })
      .then(res => {
        //Login to new user account
        AuthApiService.postLogin({
          username: username.value,
          password: password.value
        })
          //Store user tokens to local storage
          .then(res => {
            TokenService.saveAuthToken(res.authToken);
            TokenService.saveUserId(res.user_id);
            this.context.clearError();
            username.value = '';
            password.value = '';
            repeat.value = '';
            this.context.setUser(res.username);
            //Run callback if given one
            this.props.onRegistrationSuccess();
          })
          .catch(res => {
            this.setState({ error: res.error })
          })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }
  
  render() {
    const {error} = this.state;
    return (
      <form className="RegistrationForm" onSubmit={this.handleRegister}>
        {error && <section className="error-container"><p>{error}</p></section>}
        <label forhtml="username">Enter a Username:</label><br/>
        <input name="username"  type="text" /><br/>
        <label forhtml="password">Password:</label><br/>
        <input name="password"  type="password" /><br/>
        <label forhtml="repeat">Repeat Password:</label><br/>
        <input name="repeat"  type="password" /><br/>
        <button type="submit">Register!</button>
      </form>
    );
  }
}