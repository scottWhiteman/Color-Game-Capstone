import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

export default class LoginPage extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  }
  
  //Go to play page after successful login
  handleLogin = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/play';
    history.push(destination);
  }

  render() {
    return (
      <LoginForm onLoginSuccess={this.handleLogin}/>
    );
  }
}