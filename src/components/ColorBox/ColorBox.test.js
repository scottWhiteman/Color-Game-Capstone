import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ColorBox from './ColorBox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ColorBox />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
})