import React from 'react';
import './Condition.css';

export default class Condition extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     condition: this.generateNewCondition(this.conditions)
  //     color: this.randomColor(),
  //     condition: this.randomCondition()
  //   };
  // }

  // conditions = {
  //   highestRed: (color) => {
  //     console.log('red');
  //   },
  //   highestGreen: (color) => {
  //     console.log('green');
  //   },
  //   highestBlue: (color) => {
  //     console.log('blue');
  //   }
  // }

  // randomColor = () => {
  //   const colors = ['red', 'green', 'blue'];
  //   return colors[Math.random()*colors.length << 0];
  // }

  // randomCondition = () => {
  //   return Math.random() >= 0.5 ? 'highest' : 'lowest'
  // }

  // generateNewCondition = (conditionSet) => {
  //     let keys = Object.keys(conditionSet);
  //     return conditionSet[keys[keys.length * Math.random() << 0]];
  // }
  renderColorText = () => {
    return<div className={this.props.color + " color-span"}>{this.props.color.toUpperCase()}</div>
  }

  renderConditionText = () => {
    return <div className="condition-span">{this.props.condition.toUpperCase()}</div>
  }
  
  render() {
    return (
      <div className="Condition-container">
        <h2>Select colors where {this.renderColorText()} is the {this.renderConditionText()} within its RGB value</h2>
        <h3>You have {this.props.score} point{this.props.score !== 1 && 's'}!</h3>
      </div>
    );
  }
}