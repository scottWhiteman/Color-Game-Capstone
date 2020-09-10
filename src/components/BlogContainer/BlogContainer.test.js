import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BlogContainer from './BlogContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <BlogContainer />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
})