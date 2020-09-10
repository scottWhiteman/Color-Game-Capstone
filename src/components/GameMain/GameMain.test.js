import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GameMain from './GameMain';

it.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <GameMain />,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
})