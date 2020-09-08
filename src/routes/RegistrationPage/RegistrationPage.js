import React from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

export default class RegistrationPage extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  }
  
  handleRegister = () => {
    console.log("Registered");
    const { history } = this.props;
    const destination = '/';
    history.push(destination);
  }
  
  render() {
    return (
      <RegistrationForm onRegistrationSuccess={this.handleRegister}/>
    );
  }
}