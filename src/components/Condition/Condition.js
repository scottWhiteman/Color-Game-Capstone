import React from 'react';
import './Condition.css';

export default class Condition extends React.Component {
  static defaultProps = {
    score: 0,
    color: 'red',
    condition: 'lowest'
  }
  //Render text with color CSS
  renderColorText = () => {
    return<div className={this.props.color + " color-span"}>{this.props.color.toUpperCase()}</div>
  }

  //Render condition with CSS
  renderConditionText = () => {
    return <div className="condition-span">{this.props.condition.toUpperCase()}</div>
  }
  
  render() {
    return (
      <section className="Condition-container">
        <h2>Select colors where {this.renderColorText()} is the {this.renderConditionText()} within its RGB value</h2>
        <h3>You have {this.props.score} point{this.props.score !== 1 && 's'}!</h3>
      </section>
    );
  }
}