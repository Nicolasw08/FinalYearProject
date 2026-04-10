import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('redirects application users to the login page by default', () => {
  window.history.pushState({}, 'Test page', '/');
  render(<App />);

  // More specific → avoids duplicate "Login"
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
});