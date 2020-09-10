import React from 'react';
import './HomeMain.css';

export default class LandingMain extends React.Component {
  render() {
    return (
      <div className='Home-Main'>
        <h2>Welcome to the Color Game</h2>
        <p>The goal of this game is to pick the colors that match the condition you are given</p>
        <p>For example, if the condition asks you to pick colors that are more red than they are blue or green, then you must pick ones where in RGB(r, g, b), the value of r is equal to or higher than the other two.</p>
        <p>RGB(98, 13, 56) would be correct while RGB(178, 233, 178) would be incorrect.</p>
        <p>Each color you pick correctly adds one to your score and removes it from the field.</p>
        <p>If you find all the correct colors, you will be given a new field of colors and a new condition to continue.</p>
        <p>The game ends when you pick an incorrect color.</p>
      </div>
    );
  }
}