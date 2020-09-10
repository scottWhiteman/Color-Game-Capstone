import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NotFoundMain from './NotFoundMain';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NotFoundMain />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
})