import React from 'react';
import './ColorBox.css';

export default class ColorBox extends React.Component {
  
  
  // static getDerivedStateFromProps = (props, state) => {
  //   return {rgb: this.randomizeColor()}
  // }

  //componentDidMount = () => {
    //console.log(this.state.rgb);
    //this.props.getColor();
  //}

  // randomizeColor() {
  //   let rgbSet = [0, 0, 0].map(val => {
  //     return Math.floor(Math.random()*256);
  //   })
  //   return `rgb(${rgbSet[0]}, ${rgbSet[1]}, ${rgbSet[2]})`
  // }

  // getColor() {
  //   console.log("get Color")
  // }
  
  render() {
    return (
      <div className="box" index={this.props.index} style={{backgroundColor: this.props.boxRgb}}></div>
    );
  }
}