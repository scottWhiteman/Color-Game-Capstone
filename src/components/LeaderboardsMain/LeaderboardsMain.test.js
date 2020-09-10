import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LeaderboardsMain from './LeaderboardsMain';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LeaderboardsMain />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
})