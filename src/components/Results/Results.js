import React from 'react';
import LoginForm from '../LoginForm/LoginForm'
import RegistrationForm from '../RegistrationForm/RegistrationForm'
import './Results.css';
import TokenService from '../../services/token-service';
import ScoreApiService from '../../services/score-api-service';
import UserContext from '../../contexts/UserContext';

export default class Results extends React.Component {  
  static contextType = UserContext;
  
  static defaultProps = {
    score: 0,
    changeGameState: () => {}
  }

  state = {
    login: null,
    submitted: false
  }
  
  //Toggle login state from 'login' or null
  handleLogin = () => {
    this.setState({
      login: this.state.login === 'login' ? null : 'login'
    });
  }
  
  //Toggle register stare from 'register' or null
  handleRegister = () => {
    this.setState({
      login: this.state.login === 'register' ? null : 'register'
    })
  }
  
  //Play game again with callback
  handlePlay = (e) => {
    this.props.changeGameState(true);
  }

  //Display Login or Registration form
  renderForm = () => {
    if (this.state.login === 'login') {
      return <LoginForm onLoginSuccess={this.onLoginSuccess} />
    } else if (this.state.login === 'register') {
      return <RegistrationForm onRegistrationSuccess={this.onRegistrationSuccess}/>
    }
  }

  //Return login or registration buttons
  renderLoginSet = () => {
    return (
      <>
        <button onClick={this.handleLogin}>Login!</button>
        <button onClick={this.handleRegister}>Register!</button>
      </>
    )
  }

  //Callback for successful login
  //Hide login form after success
  onLoginSuccess = () => {
    this.setState({
      login: null
    });
  }

  //Callback for successful registration
  //Hide registration form after success
  //Submit score after registration
  onRegistrationSuccess = () => {
    console.log("Registered")
    this.setState({
      login: null
    });
    this.submitScore();
  }

  //Post score to database
  //Hide submit button after success
  submitScore = () => {
    const userId = TokenService.getUserId();
    const score = this.props.score;
    ScoreApiService.postScore(userId, score)
      .then(res => {
        this.setState({submitted: true})
        console.log('score submitted!')
      })
      .catch();
  }
  
  render() {
    return (
      <div className="Results-container">
        <h2>You got {this.props.score} points!</h2>
        {!TokenService.hasAuthToken && <p>You can login or register to post your score</p>}
        {this.state.submitted && <p>Your score has been submitted!</p>}
        <div className="button-container">
          {!TokenService.hasAuthToken() && this.renderLoginSet()}
          {(TokenService.hasAuthToken() && !this.state.submitted) && <button onClick={this.submitScore}>Submit Score</button>}
          <button onClick={this.handlePlay}>Play Again!</button>
        </div>
        {this.state.login && this.renderForm()}
      </div>
    );
  }
}