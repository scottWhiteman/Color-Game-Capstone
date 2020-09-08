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
  handleRegister = e => {
    e.preventDefault();
    this.setState({ error: null })
    const { username, password, repeat } = e.target;
    if (password.value !== repeat.value) {
      this.setState({error: 'Passwords do not match'})
      return;
    }
    AuthApiService.postUser({
      username: username.value,
      password: password.value
    })
      .then(res => {
        AuthApiService.postLogin({
          username: username.value,
          password: password.value
        })
          .then(res => {
            TokenService.saveAuthToken(res.authToken);
            TokenService.saveUserId(res.user_id);
            this.context.clearError();
            username.value = '';
            password.value = '';
            repeat.value = '';
            this.context.setUser(res.username);
            //this.context.setUser(res.user_id)
            //console.log(TokenService.getAuthToken());
            this.props.onRegistrationSuccess();
            
          })
          .catch(res => {
            this.setState({ error: res.error })
          })
        
        
        
        //TokenService.saveAuthToken(res.authToken);
        //TokenService.saveUserId(res.user_id);
        //this.context.setUser(res.user_id)
        //this.props.onRegistrationSuccess();
      })

      .catch(res => {
        this.setState({ error: res.error })
      })
  }
  
  render() {
    return (
      <form className="RegistrationForm" onSubmit={this.handleRegister}>
        {this.state.error && <p>{this.state.error}</p>}
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