import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';  
import { EventDisplay } from './views/EventDisplay'; 
import { dummyEventList } from './constants/constants';


test('renders learn react link', () => {
  render(<App />);
  const TritonFoodShareWords = screen.getByText("Triton FoodShare");
  expect(TritonFoodShareWords).toBeInTheDocument();
});

describe('EventDisplay tests', () => {

  test('event displayed', async () => {
    render(<BrowserRouter>
      <EventDisplay />
    </BrowserRouter>);

    dummyEventList.forEach((event) => {
      const title = event.orgName + " - " + event.foodName;
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(event.location)).toBeInTheDocument();
    });
  });

  test('button text toggles between "Reserve Now" and "I can no longer attend"', () => {
    render(<BrowserRouter>
      <EventDisplay />
    </BrowserRouter>);

    // Click the first event's button
    const firstEventButton = screen.getByTestId(`reserve-${dummyEventList[0].id}`);
    fireEvent.click(firstEventButton);

    // Check if the button text has changed
    expect(firstEventButton).toHaveTextContent('I can no longer attend');

    // Click again to unreserve
    fireEvent.click(firstEventButton);
    expect(firstEventButton).toHaveTextContent('Reserve Now');
  });


  test('updates the headcount when reservation is made', async () => {
    render(<BrowserRouter>
      <EventDisplay />
    </BrowserRouter>);

    const firstEvent = dummyEventList[0];
    const firstEventButton = screen.getByTestId(`reserve-${firstEvent.id}`);
      
    // Get the headcount before clicking the button
    const headcountBefore = screen.getByTestId(`headcount-status-${firstEvent.id}`);
    expect(headcountBefore).toBeInTheDocument();
    
    // Click the "Reserve Now" button
    fireEvent.click(firstEventButton);
    const headcountAfter = screen.getByTestId(`headcount-status-${firstEvent.id}`).textContent;
    // Check if the headcount has been updated
    expect(headcountAfter).toBe("1 people have reserved a spot at this event");

    // Click again to unreserve
    fireEvent.click(firstEventButton);

    const headcountAfterAfter = screen.getByTestId(`headcount-status-${firstEvent.id}`).textContent;
    // Check if the headcount has been updated
    expect(headcountAfterAfter).toBe("0 people have reserved a spot at this event");
  });

});