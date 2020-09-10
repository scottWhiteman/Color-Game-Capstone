import React from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

export default class RegistrationPage extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  }
  
  //Go to play page after successful registration
  handleRegister = () => {
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