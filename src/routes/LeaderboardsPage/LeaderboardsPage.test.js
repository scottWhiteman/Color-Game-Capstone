import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LeaderboardsPage from './LeaderboardsPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LeaderboardsPage />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
})