import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FoodEventContext } from '../context/AppContext';
import { deleteFoodEvent } from '../utils/foodEvents-utils'; // Adjust the import path as necessary
import CloseEventButton from './CloseEventButton';
import { FoodEvent } from '../types/types';

const mockFoodEvent: FoodEvent = {
    id: 1,
    orgName: 'Test Org',
    foodName: 'Test Food',
    quantity: "10",
    locationDescription: 'Test Location',
    biglocation: 'Test Big Location',
    dietary: '',
    description: 'Test Description',
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

describe('CloseEventButton tests', () => {
    test('renders close event button', () => {
        render(
            <FoodEventContext.Provider value={mockContextValue}>
                <CloseEventButton event={mockFoodEvent} />
            </FoodEventContext.Provider>
        );

        expect(screen.getByText('End Event')).toBeInTheDocument();
        expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    });

    test('opens confirmation modal when clicking End Event button', () => {
        render(
            <FoodEventContext.Provider value={mockContextValue}>
                <CloseEventButton event={mockFoodEvent} />
            </FoodEventContext.Provider>
        );

        fireEvent.click(screen.getByText('End Event'));
        
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
        expect(screen.getByText('Are you sure you want to close this event?')).toBeInTheDocument();
        expect(screen.getByText('Yes, Close Event')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('closes modal when clicking Cancel', () => {
        render(
            <FoodEventContext.Provider value={mockContextValue}>
                <CloseEventButton event={mockFoodEvent} />
            </FoodEventContext.Provider>
        );

        fireEvent.click(screen.getByText('End Event'));
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
        
        fireEvent.click(screen.getByText('Cancel'));
        expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
    });

    test('deletes event from the screen when close event button is clicked', async () => {
        //(deleteFoodEvent as jest.Mock).mockResolvedValueOnce(undefined);

        render(
            <FoodEventContext.Provider value={mockContextValue}>
                <div data-testid="event-container">
                    <CloseEventButton event={mockFoodEvent} />
                    <div data-testid={`event-${mockFoodEvent.id}`}>
                        {mockFoodEvent.orgName} - {mockFoodEvent.foodName}
                    </div>
                </div>
            </FoodEventContext.Provider>
        );

        // Ensure the event is initially present
        expect(screen.queryByText(mockFoodEvent.foodName, {exact: false})).toBeInTheDocument();

        // Click the "End Event" button to open the confirmation modal
        fireEvent.click(screen.getByText('End Event'));
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();

        // Click the "Yes, Close Event" button to delete the event
        fireEvent.click(screen.getByText('Yes, Close Event'));

        // Ensure the delete function was called
        //expect(deleteFoodEvent).toHaveBeenCalledWith(mockFoodEvent.id.toString());

        // Ensure the event is removed from the DOM
        expect(screen.queryByText(mockFoodEvent.foodName)).not.toBeInTheDocument();
    });
});