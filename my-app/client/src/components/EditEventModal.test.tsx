import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditEventModal from './EditEventModal';
import { AppContext } from '../context/AppContext';
import { FoodEvent } from '../types/types';

const mockFoodEvent: FoodEvent = {
  id: 1,
  orgName: 'Test Org',
  foodName: 'Test Food',
  quantity: 10,
  location: 'Test Location',
  description: 'Test Description',
  headcount: 5,
};

const mockContextValue = {
  foodEvents: [mockFoodEvent],
  setfoodEvents: jest.fn(),
};

beforeAll(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    //HTMLDialogElement.prototype.close = jest.fn();
  });

describe('EditEventModal tests', () => {
  test('renders EditEventModal correctly', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <EditEventModal isOpen={true} onClose={jest.fn()} event={mockFoodEvent} />
      </AppContext.Provider>
    );

    expect(screen.getByTestId('orgName')).toBeInTheDocument();
    expect(screen.getByTestId('foodName')).toBeInTheDocument();
    expect(screen.getByTestId('quantity')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toBeInTheDocument();
  });

  test('updates form inputs correctly', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <EditEventModal isOpen={true} onClose={jest.fn()} event={mockFoodEvent} />
      </AppContext.Provider>
    );

    const orgNameInput = screen.getByTestId('orgName');
    fireEvent.change(orgNameInput, { target: { value: 'Updated Org' } });
    expect(orgNameInput).toHaveValue('Updated Org');

    const foodNameInput = screen.getByTestId('foodName');
    fireEvent.change(foodNameInput, { target: { value: 'Updated Food' } });
    expect(foodNameInput).toHaveValue('Updated Food');

    const quantityInput = screen.getByTestId('quantity');
    fireEvent.change(quantityInput, { target: { value: '20' } });
    expect(quantityInput).toHaveValue(20);

    const locationInput = screen.getByTestId('location');
    fireEvent.change(locationInput, { target: { value: 'Updated Location' } });
    expect(locationInput).toHaveValue('Updated Location');
  });

  test('submits the form correctly', () => {
    const handleClose = jest.fn();
    render(
      <AppContext.Provider value={mockContextValue}>
        <EditEventModal isOpen={true} onClose={handleClose} event={mockFoodEvent} />
      </AppContext.Provider>
    );

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(mockContextValue.setfoodEvents).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });
});