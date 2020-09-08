const { default: config } = require("../config")

const UsersService = {
  deleteUser(id) {
    return fetch(`${config.API_ENDPOINT}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json.then(e => Promise.reject(e));
        }
        return res.json();
      })
      .catch(err => {
        console.error(err);
      });
  },
  updateUser(id, newUser) {
    return fetch(`${config.API_ENDPOINT}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        console.log(res);
      })
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password must be longer than 8 characters'
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters'
    }
  },
}

module.exports = UsersService