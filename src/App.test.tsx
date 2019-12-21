import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders 2 rectangles', () => {
  const { getAllByTestId } = render(<App />);
  const rects = getAllByTestId("rect");
  expect(rects).toHaveLength(2);
});
