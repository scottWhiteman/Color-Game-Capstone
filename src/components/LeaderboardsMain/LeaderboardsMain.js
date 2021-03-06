import React from 'react';
import ScoreApiService from '../../services/score-api-service';
import './LeaderboardsMain.css';
import UserContext from '../../contexts/UserContext';

export default class LeaderboardsMain extends React.Component {
  static contextType = UserContext;
  
  state = {
    userScores: []
  }

  //Get top score of each user from database in order from highest to lowest
  componentDidMount = () => {
    ScoreApiService.getTopScores()
      .then(scores => {
        this.setState({
          userScores: scores
        })
      })
      .catch()
      
  }
  //Render scores to html
  listScores = () => {
    return this.state.userScores.map((user, rank) => {
      return (
        <li key={rank}>
          <div className="rank">{rank + 1}</div>
          <div className="user">{user.username}</div>
          <div className="score">{user.topscore}</div>
        </li>
      );
    })
  }
  
  render() {
    return (
      <ul className="score-list">
        {this.listScores()}
      </ul>
    );
  }
}