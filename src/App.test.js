import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App renders', () => {
  const { container } = render(<App />);
  const app = container.firstChild
  expect(app).toBeInTheDocument();
});
