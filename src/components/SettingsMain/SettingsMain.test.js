import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SettingsMain from './SettingsMain';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SettingsMain />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
})