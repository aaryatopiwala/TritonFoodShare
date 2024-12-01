import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditEventModal from './EditEventModal';
import { FoodEventContext } from '../context/AppContext';
import { FoodEvent } from '../types/types';

const mockFoodEvent: FoodEvent = {
  id: 1,
  orgName: 'Test Org',
  foodName: 'Test Food',
  quantity: "10",
  locationDescription: 'Test Location',
  biglocation: 'Test Big Location',
  description: 'Test Description',
  dietary: '',
  headcount: 5,
  userId: ''
};

const mockContextValue = {
  foodEvents: [mockFoodEvent],
  setfoodEvents: jest.fn(),
};

beforeAll(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
});

describe('EditEventModal tests', () => {
  test('renders EditEventModal correctly', () => {
    render(
      <FoodEventContext.Provider value={mockContextValue}>
        <EditEventModal isOpen={true} onClose={jest.fn()} event={mockFoodEvent} />
      </FoodEventContext.Provider>
    );

    expect(screen.getByTestId('orgName')).toBeInTheDocument();
    expect(screen.getByTestId('foodName')).toBeInTheDocument();
    expect(screen.getByTestId('quantity')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toBeInTheDocument();
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();

  });

  test('updates form inputs correctly', () => {
    render(
      <FoodEventContext.Provider value={mockContextValue}>
        <EditEventModal isOpen={true} onClose={jest.fn()} event={mockFoodEvent} />
      </FoodEventContext.Provider>
    );
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();

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
      <FoodEventContext.Provider value={mockContextValue}>
        <EditEventModal isOpen={true} onClose={handleClose} event={mockFoodEvent} />
      </FoodEventContext.Provider>
    );
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();

    const submitButton = screen.getByText('Update Submission');
    fireEvent.click(submitButton);

    expect(mockContextValue.setfoodEvents).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });
});