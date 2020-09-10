import React from 'react';
import ColorBox from '../ColorBox/ColorBox';
import Condition from '../Condition/Condition';
import './GameMain.css'

export default class GameMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: this.randomColorCondition(),
      condition: this.randomCondition(),
      rows: 3,
      boxes: []
    }
  }
  static defaultProps = {
    score: 0,
    updateScore: () => {},
    changeGameState: () => {}
  }

  mounted = false;
  
  //Return a random color choice for condition
  randomColorCondition = () => {
    const colors = ['red', 'green', 'blue'];
    return colors[Math.random()*colors.length << 0];
  }

  //Return color rgb template
  generateRandomColor() {
    let rgbSet = [0, 0, 0].map(val => {
      return Math.floor(Math.random()*256);
    })
    return `rgb(${rgbSet[0]}, ${rgbSet[1]}, ${rgbSet[2]})`
  }

  //Generate a random condition for checking choices
  randomCondition = () => {
    const conditions = {
      lowest: (choice) => {
        if (
          choice[this.state.color] <= choice['red'] && 
          choice[this.state.color] <= choice['green'] &&
          choice[this.state.color] <= choice['blue']
        ) {
          return true;
        } else {
          return false;
        }
      },
      highest: (choice) => {
        if (
          choice[this.state.color] >= choice['red'] && 
          choice[this.state.color] >= choice['green'] &&
          choice[this.state.color] >= choice['blue']
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
    const cons = Object.keys(conditions);
    return conditions[cons[cons.length * Math.random() << 0]];
  }

  //Use current condition to check against chosen color
  checkColor = (choice, target) => {
    //Prevent same color as background choices
    if (choice["red"] === 34 && choice["green"] === 34 && choice["blue"] === 34) {
      return null;
    }
    //Correct choice
    if (this.state.condition(choice)) {
      const choiceIndex = target.getAttribute('index');
      const changedBoxes = this.state.boxes;
      changedBoxes[choiceIndex] = 'rgb(34, 34, 34)'
      this.props.updateScore(this.props.score + 1);
      this.setState({
        boxes: changedBoxes,
      })
      if(this.checkRemaining()) {
        this.resetField();
      }
    }
    //Wrong choice
    else {
      this.props.changeGameState(false);
      this.resetField();
    }
  }

  //Check if correct choices still remain
  checkRemaining = () => {
    return this.state.boxes.every(box => {
      const breakRgb = this.rgbTemplate(box)
      return (box === 'rgb(34, 34, 34)' || !this.state.condition(breakRgb));
    })
  }

  //Return html for render to display
  renderBoxes = (j) => {
    let boxes = [];
    for (let i = 0; i < 5; i++) {
      boxes.push(<ColorBox index={i+(j*5)} boxRgb={this.state.boxes[i+(j*5)]} key={i+(j*5)}/>)
    }
    return boxes;
  }

  //Create new field and new condition
  resetField = () => {
    this.generateBoxes();
    this.newConditions();
  }

  //Create new boxes for field to display
  generateBoxes = () => {
    let boxes = [];
    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < 5; j++) {
        boxes.push(this.generateRandomColor())
      }
    }
    this.setState({
      boxes: boxes
    })
  }

  //New color and comparison conditions
  newConditions = () => {
    this.setState({
      color: this.randomColorCondition(),
      condition: this.randomCondition()
    })
  }
  
  //Render entire row of colors
  renderRowHtml = () => {
    let rowHtml = [];
    for (let i = 0; i < this.state.rows; i++) {
      rowHtml.push(
        <div className="row" key={i}>
          {this.renderBoxes(i)}
        </div>
      )
    }
    return rowHtml;
  }

  //Helper for breaking rgb strings into object
  rgbTemplate = (color) => {
    const breakRgb = color
      .slice(4, color.length-1)
      .split(', ')
      .map(num => {
        return num*1;
      });
    const assignRgb = {
      "red": breakRgb[0],
      "green": breakRgb[1],
      "blue": breakRgb[2]
    };
    return assignRgb;
  }
  
  
  componentDidMount = () => {
    this.mounted = true;
    const field = document.getElementById('game-field');
    this.resetField();
    field.addEventListener("click", e => {
      
      if (e.target.className === 'box') {
        const color = window.getComputedStyle(e.target).backgroundColor;
        const breakRgb = this.rgbTemplate(color);
        this.checkColor(breakRgb, e.target);
      }
      
    })
  }

  componentWillUnmount = () => {
    this.mounted = false;
  }

  render() {
    return (
      <div className="GameMain">
        <h1>Playing Game!</h1>
        <div className="main">
          <div className="field" id="game-field">
            {this.renderRowHtml()}
          </div>
          <Condition score={this.props.score} color={this.state.color} condition={this.state.condition.name}/>
        </div>
      </div>
    );
  }
}