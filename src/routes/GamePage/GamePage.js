import React from 'react';
import GameMain from '../../components/GameMain/GameMain'
import Results from '../../components/Results/Results'

export default class GamePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      score: 0
    }
  }

  changeGameState = (newState) => {
    this.setState({
      playing: newState,
      score: (newState ? 0 : this.state.score)
    })
  }

  updateScore = (newScore) => {
    this.setState({
      score: newScore
    })
  }
  
  componentDidMount = () => {
    this.setState({
      playing: true
    })
  }

  render() {
    return (
      <>
      {!this.state.playing &&
        <Results
        score={this.state.score}
        changeGameState={this.changeGameState}/>
      }
      {this.state.playing &&
        <GameMain
        updateScore={this.updateScore}
        score={this.state.score}
        changeGameState={this.changeGameState}/>
      }
      </>
    );
  }
}