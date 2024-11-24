import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppContext } from '../context/AppContext';
import CloseEventButton from './CloseEventButton';
import { FoodEvent } from '../types/types';

const mockFoodEvent: FoodEvent = {
    id: 1,
    orgName: 'Test Org',
    foodName: 'Test Food',
    quantity: "10",
    location: 'Test Location',
    description: 'Test Description',
    headcount: 5,
    dietary: []
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
            <AppContext.Provider value={mockContextValue}>
                <CloseEventButton event={mockFoodEvent} />
            </AppContext.Provider>
        );

        expect(screen.getByText('End Event')).toBeInTheDocument();
        expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    });

    test('opens confirmation modal when clicking End Event button', () => {
        render(
            <AppContext.Provider value={mockContextValue}>
                <CloseEventButton event={mockFoodEvent} />
            </AppContext.Provider>
        );

        fireEvent.click(screen.getByText('End Event'));
        
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
        expect(screen.getByText('Are you sure you want to close this event?')).toBeInTheDocument();
        expect(screen.getByText('Yes, Close Event')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('closes modal when clicking Cancel', () => {
        render(
            <AppContext.Provider value={mockContextValue}>
                <CloseEventButton event={mockFoodEvent} />
            </AppContext.Provider>
        );

        fireEvent.click(screen.getByText('End Event'));
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
        
        fireEvent.click(screen.getByText('Cancel'));
        expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
    });

    test('handles close event error', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        mockContextValue.setfoodEvents.mockImplementationOnce(() => {
            throw new Error('Failed to delete');
        });

        render(
            <AppContext.Provider value={mockContextValue}>
                <CloseEventButton event={mockFoodEvent} />
            </AppContext.Provider>
        );

        fireEvent.click(screen.getByText('End Event'));
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();

        fireEvent.click(screen.getByText('Yes, Close Event'));
        expect(consoleSpy).toHaveBeenCalled();
        expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
});