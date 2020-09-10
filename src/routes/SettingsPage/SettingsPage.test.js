import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SettingsPage from './SettingsPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SettingsPage />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
})