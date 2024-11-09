import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const TritonFoodShareWords = screen.getByText("Triton FoodShare");
  expect(TritonFoodShareWords).toBeInTheDocument();
});
