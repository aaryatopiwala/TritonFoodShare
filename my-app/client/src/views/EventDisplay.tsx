import React from 'react';
import { useState, useEffect, useContext } from 'react';
import {FoodEvent} from '../types/types'
import { dummyEventList } from '../constants/constants';
import { Link } from 'react-router-dom';
import { getReservations, makeReservation, removeReservation } from '../utils/reserveEvent-utils';  // Function to fetch user's reservations from backend
import { API_BASE_URL } from '../constants/constants';
import { UserContext } from '../context/AppContext'; 
import { fetchFoodEvents } from '../utils/foodEvents-utils'; 
import './EventDisplay.css'


export const EventDisplay = () => {
    //Favorites function
  const [events, setEvents] = useState<FoodEvent[]>([]);
  //Reserved status for events for each user:
  const [reservedEvents, setReservedEvents] = useState<Record<number, boolean>>(
    () => {
      const storedReservedEvents = localStorage.getItem('reservedEvents');
      return storedReservedEvents ? JSON.parse(storedReservedEvents) : {}; // Default to an empty object if nothing is stored
    }
  );  const [loading, setLoading] = useState(true);

  const { username } = useContext(UserContext);

useEffect(() => {
  const storedReservedEvents = localStorage.getItem('reservedEvents');
  if (storedReservedEvents) {
    setReservedEvents(JSON.parse(storedReservedEvents));
  }
}, []); // Only on initial mount

  
// Fetch events from the backend when the component mounts
useEffect(() => {
  const initializeState = async () => {
    try {
      // Fetch food events
      const foodEvents = await fetchFoodEvents();
      setEvents(foodEvents);

      // Initialize reserved status for events
      const initialReservedStatus: Record<number, boolean> = {};
      foodEvents.forEach((event) => {
        initialReservedStatus[event.id] = false;
      });

      // Fetch user reservations
      const userReservations = await getReservations(username);

      // Merge localStorage and backend reservations
      const storedReservedEvents = localStorage.getItem('reservedEvents');
      const localReserved = storedReservedEvents ? JSON.parse(storedReservedEvents) : {};
      userReservations.forEach((eventId) => {
        initialReservedStatus[eventId] = true;
      });

      setReservedEvents({ ...localReserved, ...initialReservedStatus });
    } catch (error) {
      console.error("Error initializing state:", error);
    } finally {
      setLoading(false);
    }
  };

  initializeState();
}, [username]); // Dependency ensures this runs when the username changes


  //Function for reserving
  const handleReservation = async (eventId: number, headcount: number) => {
    // Check if the event is currently reserved
    const isReserved = reservedEvents[eventId];
  
    // Update the local headcount
    const newHeadcount = isReserved ? headcount - 1 : headcount + 1;
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, headcount: newHeadcount } : event
      )
    );
  
    // Update the reserved status locally
    setReservedEvents((prevReserved) => {
      const updatedReserved = {
        ...prevReserved,
        [eventId]: !isReserved, // Toggle the reserved status
      };
  
      // Save the updated reserved status to localStorage
      
      localStorage.setItem('reservedEvents', JSON.stringify(updatedReserved));
      return updatedReserved;
    });
  
    try {
      if (isReserved) {
        await removeReservation(eventId, username); // Remove reservation
      } else {
        await makeReservation(eventId, username); // Make reservation
      }
    } catch (error) {
      console.error('Failed to update the reservation status:', error);
    }
  };
  
  useEffect(() => {
    localStorage.setItem('reservedEvents', JSON.stringify(reservedEvents));
    console.log('set', reservedEvents)
  }, [reservedEvents]);

  useEffect(() => {
    console.log("Updated reserved events:", reservedEvents);
  }, [reservedEvents]);
  
  // Load reservedEvents from localStorage when the component mounts
  useEffect(() => {
    const storedReservedEvents = localStorage.getItem('reservedEvents');
    if (storedReservedEvents) {
      setReservedEvents(JSON.parse(storedReservedEvents));
    } else {
      // Initialize reservedEvents with all IDs set to false (fallback)
      const initialReservedStatus: Record<number, boolean> = {};
      events.forEach((event) => {
        initialReservedStatus[event.id] = false;
      });
      setReservedEvents(initialReservedStatus);
    }
  }, [events]); // Update only when events change (to handle new events)

  console.log(username)
  return(
    <div className = "page-container-display">
        <div className = "box">
            <h1>Active Events</h1>
            <h3>Events that are sharing food right now!</h3>
            <div className="events-grid"  >
                    {Array.isArray(events) &&  events.map((event) => (
                        <div
                        key={event.id}
                        className="event-item">
                        <div
                        className = "event-title"
                        > {event.orgName + " - " + event.foodName} </div>
                        <div
                        className = "event-content"
                        >{event.locationDescription} </div>
                        <div className = "reserve-box">
                            <div>
                            <button className = "reserve-button" data-testid={`reserve-${event.id}`} onClick={() => handleReservation(event.id, event.headcount)}>
                                    {reservedEvents[event.id] ? 'I can no longer attend' : 'Reserve Now'}
                            </button>
                            </div>
                            <div data-testid = {`headcount-status-${event.id}`} className = "headcount-status">
                                {event.headcount + " people have reserved a spot at this event"}
                            </div>
                        </div>
                        <div className = "report">
                            <Link to={'/contact'}>Report this submission</Link>
                        </div>
                        
                    </div>
                    ))}
            </div>
        </div>
    </div>
  );}
    