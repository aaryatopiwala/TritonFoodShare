import React from 'react';
import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter, Route, Routes, Router} from 'react-router-dom';  
import { EventDisplay } from './views/EventDisplay'; 
import { dummyEventList } from './constants/constants';
import ReportSubmission from "./views/ReportSubmission" 
import { fetchFoodEvents, createFoodEvent } from './utils/foodEvents-utils';
import { getReservations, makeReservation, removeReservation } from './utils/reserveEvent-utils';
import NavBar from './components/NavBar'
import { UserContext } from './context/AppContext';
import HomePage from './views/Home';
import EventSubmissionForm from './components/EventSubmissionForm';
import userEvent from '@testing-library/user-event';


test('renders learn react link', () => {
  render(<App />);
  const TritonFoodShareWords = screen.getByText("Triton FoodShare");
  expect(TritonFoodShareWords).toBeInTheDocument();
});


describe('contact form tests', () => {

  test('form displayed', async () => {
    render(<BrowserRouter>
      <ReportSubmission />
    </BrowserRouter>);

      // Check if placeholders are present for Name, Email, Issue, and Event Name fields
    const namePlaceholder = screen.getByPlaceholderText('Your Name');
    const emailPlaceholder = screen.getByPlaceholderText('Your email, so we can get back to you!');
    const issuePlaceholder = screen.getByPlaceholderText('What issue are you facing with this event? Ex. Inactive Event');
    const eventPlaceholder = screen.getByPlaceholderText('Title of the event you are reporting');

    // Assert that all placeholders are in the document
    expect(namePlaceholder).toBeInTheDocument();
    expect(emailPlaceholder).toBeInTheDocument();
    expect(issuePlaceholder).toBeInTheDocument();
    expect(eventPlaceholder).toBeInTheDocument();
  });


});

// Mocking the utils used in EventDisplay
jest.mock('./utils/foodEvents-utils', () => ({
  fetchFoodEvents: jest.fn(),
}));
jest.mock('./utils/reserveEvent-utils', () => ({
  getReservations: jest.fn(),
  makeReservation: jest.fn(),
  removeReservation: jest.fn(),
}));


describe('EventDisplay Component', () => {
  const mockEvents = [
    {
      id: 1,
      orgName: 'Org1',
      foodName: 'Pizza',
      quantity: '10 boxes',
      locationDescription: 'Room 101',
      biglocation: 'Building A',
      description: 'Delicious pepperoni and cheese pizzas',
      dietary: 'Contains gluten and dairy',
      headcount: 5,
      userId: 'user123',
    },
    {
      id: 2,
      orgName: 'Org2',
      foodName: 'Burgers',
      quantity: '20 servings',
      locationDescription: 'Room 202',
      biglocation: 'Building B',
      description: 'Juicy beef burgers with lettuce and tomato',
      dietary: 'Contains gluten and meat',
      headcount: 10,
      userId: 'user456',
    },
  ];
  const mockReservations = [1];

  beforeEach(() => {
    jest.clearAllMocks();

    // Mocking fetchFoodEvents to return mockEvents
    (fetchFoodEvents as jest.Mock).mockResolvedValue(mockEvents);

    // Mocking getReservations to return mockReservations
    (getReservations as jest.Mock).mockResolvedValue(mockReservations);

    // Mocking localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify({ 1: true, 2: false })),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  test('renders Active Events title and subtitle', async () => {
    render(
      <BrowserRouter>
        <EventDisplay />
      </BrowserRouter>
    );

    const title = screen.getByText('Active Events');
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByText('Events that are sharing food right now!');
    expect(subtitle).toBeInTheDocument();
  });

  test('renders events dynamically with full details', async () => {
    render(
      <BrowserRouter>
        <EventDisplay />
      </BrowserRouter>
    );

     // Wait for the event list to be populated
  await waitFor(() => screen.getByText('Active Events'));

  // Check that the event titles are rendered using a regex to ignore extra spaces or formatting
  for (const event of mockEvents) {
    const eventTitle = `${event.orgName} - ${event.foodName}`;
    expect(screen.getByText(new RegExp(eventTitle, 'i'))).toBeInTheDocument();
  }

  // Check that the location descriptions are rendered
  for (const event of mockEvents) {
    expect(screen.getByText(event.locationDescription)).toBeInTheDocument();
  }
  });

  test('handles reservation toggling', async () => {
    render(
      <BrowserRouter>
        <EventDisplay />
      </BrowserRouter>
    );

    // Wait for the events to be rendered and the reserve button to be available
  await waitFor(() => screen.getByTestId('reserve-1'));

  const reserveButton = screen.getByTestId('reserve-1');
  const headcountStatus = screen.getByTestId('headcount-status-1');
  // Simulate a click to toggle the reservation
  fireEvent.click(reserveButton);
  // Wait for the button text to update
  await waitFor(() => expect(reserveButton).toHaveTextContent('Cancel My Reservation'));

  // Check the updated headcount
  expect(headcountStatus).toHaveTextContent('4 people have reserved a spot at this event');

  });

});

describe('NavBar Component', () => {

  test('renders navbar with home, contact, login, and signup links when not logged in', () => {
    const mockContext = {
      login: false,
      setLogin: jest.fn(),
      username: "Guest",
      setUsername: jest.fn(),
    };

    render(
      <UserContext.Provider value={mockContext}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </UserContext.Provider>
    );

    // Check if links are present for non-logged-in state
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('renders navbar with home, eventsubmit, eventdisplay, and contact links when logged in', () => {
    const mockContext = {
      login: true,
      setLogin: jest.fn(),
      username: "testUser",
      setUsername: jest.fn(),
    };

    render(
      <UserContext.Provider value={mockContext}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </UserContext.Provider>
    );

    // Check if links are present for logged-in state
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Event Submission')).toBeInTheDocument();
    expect(screen.getByText('Event Display')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  test('opens and closes the profile modal', () => {
    const mockContext = {
      login: true,
      setLogin: jest.fn(),
      username: "testUser",
      setUsername: jest.fn(),
    };

    render(
      <UserContext.Provider value={mockContext}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </UserContext.Provider>
    );

    const profileIcon = screen.getByAltText('Profile');
    
    // Simulate clicking the profile icon to open the modal
    fireEvent.click(profileIcon);
    expect(screen.getByText('Profile Information')).toBeInTheDocument();

    // Simulate closing the modal
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    expect(screen.queryByText('Profile Information')).not.toBeInTheDocument();
  });


  test('logs out successfully', () => {
    const mockContext = {
      login: true,
      setLogin: jest.fn(),
      username: "testUser",
      setUsername: jest.fn(),
    };

    render(
      <UserContext.Provider value={mockContext}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </UserContext.Provider>
    );

    // Open profile modal
    const profileIcon = screen.getByAltText('Profile');
    fireEvent.click(profileIcon);

    // Check if the logout button is there
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    // Check if the context's state has been updated
    expect(mockContext.setLogin).toHaveBeenCalledWith(false);
    expect(mockContext.setUsername).toHaveBeenCalledWith('Have not logged in');
  });

  test('applies active class to the active link', () => {
    const mockContext = {
      login: true,
      setLogin: jest.fn(),
      username: "testUser",
      setUsername: jest.fn(),
    };
  
    render(
      <UserContext.Provider value={mockContext}>
        <MemoryRouter initialEntries={['/eventdisplay']}>
          <NavBar />
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/eventsubmit" element={<div>Event Submit</div>} />
            <Route path="/eventdisplay" element={<div>Event Display</div>} />
            <Route path="/contact" element={<div>Contact</div>} />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>
    );
  
    // Find the link with the text "Event Display"
    const activeLink = screen.getByRole('link', { name: 'Event Display' });
    expect(activeLink).toHaveClass('active-link');
  });
  

});


describe('HomePage', () => {
  test('renders welcome message and platform description', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Check if the welcome heading is in the document
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
    expect(screen.getByText(/Triton FoodShare!/i)).toBeInTheDocument();

    // Check if the platform description text is present
    expect(screen.getByText(/combat food waste/i)).toBeInTheDocument();
    expect(screen.getByText(/alleviate stress/i)).toBeInTheDocument();
    expect(screen.getByText(/build community/i)).toBeInTheDocument();
    expect(screen.getByText(/sustainability/i)).toBeInTheDocument();
    expect(screen.getByText(/food insecurity/i)).toBeInTheDocument();
  });


  test('renders sections for Organizations and Students', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Check if the "For Organizations" section is rendered
    expect(screen.getByText(/For Organizations:/i)).toBeInTheDocument();
    expect(screen.getByText(/Getting started is easy!/i)).toBeInTheDocument();

    // Check if the "For Students" section is rendered
    expect(screen.getByText(/For Students:/i)).toBeInTheDocument();
    expect(screen.getByText(/start reserving food/i)).toBeInTheDocument();
  });

  test('renders images for Organizations and Students', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Check if both images are rendered
    const orgImage = screen.getByAltText(/Description for img1/i);
    const studentImage = screen.getByAltText(/Description for img2/i);

    expect(orgImage).toBeInTheDocument();
    expect(studentImage).toBeInTheDocument();
  });
});

