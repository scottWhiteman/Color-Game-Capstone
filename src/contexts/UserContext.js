import React from 'react';

const UserContext = React.createContext({
  user: null,
  error: null,
  setError: () => {},
  clearError: () => {},
  getUser: () => {},
  setUser: () => {},
  clearUser: () => {},
});

export default UserContext;

export class UserProvider extends React.Component {
  state = {
    user: null,
    error: null
  };

  setError = error => {
    this.setState({error})
  }
  clearError = () => {
    this.setState({ error: null })
  }

  getUser = () => {
    return this.state.user;
  }

  setUser = user => {
    this.setState({ user })
  }

  clearUser = () => {
    this.setUser(null)
  }

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      getUser: this.getUser,
      setUser: this.setUser,
      clearUser: this.clearUser,
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}