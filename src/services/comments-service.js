import config from '../config';
import TokenService from './token-service';

const CommentsService = {
  getComments() {
    return fetch(`${config.API_ENDPOINT}/comments`)
      .then(res => {
        return (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      })
  },
  postComment(userId, comment) {
    return fetch(`${config.API_ENDPOINT}/comments`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        user_id: userId,
        comment
      })
    })
      .then(res => {
        return (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      })
  }
}

export default CommentsService;