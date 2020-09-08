import config from '../config';
import TokenService from './token-service';

const ScoreApiService = {
  getScores() {
    return fetch(`${config.API_ENDPOINT}/scores`)
      .then(res => {
        return (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      })
  },
  getTopScores() {
    return fetch(`${config.API_ENDPOINT}/scores/topscores`)
      .then(res => {
        return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      })
  },
  postScore(userId, score) {
    return fetch(`${config.API_ENDPOINT}/scores`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        user_id: userId,
        score
      })
    })
      .then(res => {
        return (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      })
  }
}

export default ScoreApiService;