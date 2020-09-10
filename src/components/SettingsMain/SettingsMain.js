import React from 'react';
import './SettingsMain.css';
import BlogContainer from '../../components/BlogContainer/BlogContainer';
import UsersService from '../../services/users-service';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';

export default class SettingsMain extends React.Component {
  static contextType = UserContext;
  state = {
    error: null,
    delete: false
  }
  
  //Change password in database
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

  //Delete account from database and clear local storage
  handleDelete = (e) => {
    e.preventDefault();
    this.setState({error: null});
    UsersService.deleteUser(TokenService.getUserId())
      //Clear local storage
      .then(res => {
        TokenService.clearAuthToken();
        TokenService.clearUserId();
        this.context.clearError();
        this.context.clearUser();
        //Callback if given one
        this.props.onDeleteSuccess();
      })
  }
  
  //Check if input is 'Delete'
  //Enable Delete button if true
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
        <div className="flex-container">
          <div>
            <form className="Change-User-Form" onSubmit={this.handleSubmit}>
              <label forhtml="password">Change Password</label><br/>
              <input name="password" type="password" placeholder="Insert new password"></input><br/>
              <label forhtml="repeat">Repeat Password</label><br/>
              <input name="repeat" type="password" placeholder="Repeat new password"></input><br/>
              <button type="submit">Accept Changes</button>
            </form>
          </div>
          <div className="Delete-User-Container">
            <h3>Delete This Account</h3>
            <p>Type "Delete" to confirm deletion</p>
            <input name="delete-input" onChange={this.checkDelete}></input><br/>
            <button disabled={!this.state.delete} onClick={this.handleDelete}>Confirm Delete</button>
          </div>
        </div>
        <BlogContainer />
      </div>
    );
  }
}