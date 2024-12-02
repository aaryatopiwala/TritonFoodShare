import React from 'react';
import { useState, useEffect, useContext } from 'react';
import {FoodEvent} from '../types/types'
import { dummyEventList } from '../constants/constants';
import { Link } from 'react-router-dom';
import { getReservations, makeReservation, removeReservation } from '../utils/reserveEvent-utils';  // Function to fetch user's reservations from backend
import { API_BASE_URL } from '../constants/constants';
import { UserContext } from '../context/AppContext'; 
import { fetchFoodEvents } from '../utils/foodEvents-utils'; 



export const EventDisplay = () => {
    //Favorites function
  const [events, setEvents] = useState<FoodEvent[]>([]);
  //Reserved status for events for each user:
  const [reservedEvents, setReservedEvents] = useState<Record<number, boolean>>({}); 
  const [loading, setLoading] = useState(true);

  const { username } = useContext(UserContext);

  // Fetch events from the backend when the component mounts
// Fetch events from the backend when the component mounts
useEffect(() => {
  const fetchEvents = async () => {
    try {
      const foodEvents = await fetchFoodEvents(); // Call the utility function
      console.log(typeof foodEvents)
      setEvents(foodEvents); // Update the state with the fetched events

      // Initialize reservedEvents with all IDs set to false
      const initialReservedStatus: Record<number, boolean> = {};
      foodEvents.forEach((event) => {
        initialReservedStatus[event.id] = false; // Set reserved status to false for each event
      });

      setReservedEvents(initialReservedStatus); // Update the reservedEvents state
    } catch (error) {
      console.error('Error fetching food events:', error);
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  };

  fetchEvents();
}, []); 

 useEffect(() => {
    const fetchReservations = async () => {
      try {
        const userId = username;  // Replace with actual user ID
        const userReservations = await getReservations(userId);
        console.log('here at reserations', userReservations)
        const reservedStatus: Record<number, boolean> = {};

        // Set the reserved status for each event
        userReservations.forEach((eventId) => {
          reservedStatus[eventId] = true;
          console.log(eventId)
        });

        setReservedEvents(reservedStatus);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);
  //Function for reserving
  const handleReservation = async (eventId: number, headcount: number) => {
    // Check if the event is currently reserved, by default it should be unreserved
    const isReserved = reservedEvents[eventId];
    // const newHeadcount = isReserved ? headcount - 1 : headcount + 1;
    // console.log(headcount);
    console.log("before", reservedEvents[eventId])
    setReservedEvents((prevReserved) => ({
      ...prevReserved,
      [eventId]: !isReserved, // Toggle the reserved status for this event
    }));
    console.log("after", reservedEvents[eventId])

    try {
      if (isReserved) {
        await removeReservation(eventId, username);  // Remove reservation
      } else {
        await makeReservation(eventId, username);  // Make reservation
      }

    } catch (error) {
      console.error('Failed to update the headcount', error);
    }
  };

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
                            <button data-testid={`reserve-${event.id}`} onClick={() => handleReservation(event.id, event.headcount)}>
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
    