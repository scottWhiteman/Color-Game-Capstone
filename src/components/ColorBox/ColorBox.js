import React from 'react';
import './ColorBox.css';

export default class ColorBox extends React.Component {
  render() {
    return (
      <div className="box" index={this.props.index} style={{backgroundColor: this.props.boxRgb}}></div>
    );
  }
}