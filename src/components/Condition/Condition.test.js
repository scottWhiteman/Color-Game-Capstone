import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Condition from './Condition';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Condition />,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
})