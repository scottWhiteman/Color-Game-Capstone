import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import HomeMain from './HomeMain';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <HomeMain />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
})