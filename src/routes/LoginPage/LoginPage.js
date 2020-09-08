import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

export default class LoginPage extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  }
  
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