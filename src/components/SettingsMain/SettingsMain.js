import React from 'react';
import './SettingsMain.css';
import UsersService from '../../services/users-service';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';

export default class SettingsMain extends React.Component {
  static contextType = UserContext;
  state = {
    error: null,
    delete: false
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({error: null});
    const { password, repeat } = e.target;
    if (password.value !== repeat.value) {
      this.setState({error: 'Passwords do not match'})
      return;
    }
    const username = this.context.getUser();
    const newUser = {
      username,
      password: password.value
    }
    UsersService.updateUser(TokenService.getUserId(), newUser)
      .then(res => {
        password.value = '';
        repeat.value = '';
      })
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.setState({error: null});
    UsersService.deleteUser(TokenService.getUserId())
      .then(res => {
        TokenService.clearAuthToken();
        TokenService.clearUserId();
        this.context.clearError();
        this.context.clearUser();
        this.props.onDeleteSuccess();
      })
  }
  
  checkDelete = e => {
    if (e.target.value === "Delete") {
      this.setState({ delete: true });
    }
    else {
      this.setState({ delete: false });
    }
  }

  render() {
    return (
      <div className="Settings-Main">
        <div>
          <form className="Change-User-Form" onSubmit={this.handleSubmit}>
            {/* <label forHtml="username">Change Username</label><br/>
            <input name="username"></input><br/> */}
            <label forhtml="password">Change Password</label><br/>
            <input name="password" type="password"></input><br/>
            <label forhtml="repeat">Repeat Password</label><br/>
            <input name="repeat" type="password"></input><br/>
            <button type="submit">Accept Changes</button>
          </form>
        </div>
        <div className="Delete-User-Container">
          <h2>Delete This Account</h2>
          <p>Type "Delete" to confirm deletion</p>
          <input name="delete-input" onChange={this.checkDelete}></input><br/>
          <button disabled={!this.state.delete} onClick={this.handleDelete}>Confirm Delete</button>
        </div>
      </div>
    );
  }
}