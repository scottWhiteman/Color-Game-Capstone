import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GamePage from './GamePage';

it.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <GamePage />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
})