import React from 'react';
import ReactDOM from 'react-dom';
import resetPassword from './resetPassword';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<resetPassword />, div);
});
