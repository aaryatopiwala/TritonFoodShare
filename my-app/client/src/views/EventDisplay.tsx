import React from 'react';
import { useState, useEffect } from 'react';
import {FoodEvent} from '../types/types'
import { dummyEventList } from '../constants/constants';
import { updateFoodEventHeadcount } from '../utils/foodEvents-utils'
import { Link } from 'react-router-dom';

export const EventDisplay = () => {
    //Favorites function
  const [events, setEvents] = useState<FoodEvent[]>(dummyEventList);

  //Reserved status for events for each user:
  const [reservedEvents, setReservedEvents] = useState<Record<number, boolean>>(dummyEventList.reduce((acc, event) => {
    acc[event.id] = false; // Initialize all events as unreserved
    return acc;
  }, {} as Record<number, boolean>)); 

  const handleReservationDummy = async(eventId: number, headcount: number) =>{
    const isReserved = reservedEvents[eventId];
    const newHeadcount = isReserved ? headcount - 1 : headcount + 1;

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, headcount: newHeadcount } : event
      )
    );

    setReservedEvents((prevReserved) => ({
      ...prevReserved,
      [eventId]: !isReserved, 
    }));

  }

  //Function for reserving
  const handleReservation = async (eventId: number, headcount: number) => {
    // Check if the event is currently reserved, by default it should be unreserved
    const isReserved = reservedEvents[eventId];
    const newHeadcount = isReserved ? headcount - 1 : headcount + 1;
    console.log(headcount);
    try {
      // Update the headcount on the server (backend)
      await updateFoodEventHeadcount(eventId, newHeadcount);

      // Update the local state to reflect the change (toggle reservation for this user)
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? { ...event, headcount: newHeadcount } : event
        )
      );

      // Update the local reserved state for this user
      setReservedEvents((prevReserved) => ({
        ...prevReserved,
        [eventId]: !isReserved, // Toggle the reserved status for this event
      }));
    } catch (error) {
      console.error('Failed to update the headcount', error);
    }
  };

  useEffect(() => {
    // Initialize the reservedEvents state, e.g., from localStorage or default to false
    const storedReservedEvents = JSON.parse(localStorage.getItem('reservedEvents') || '{}');
    setReservedEvents(storedReservedEvents);
  }, []);

  useEffect(() => {
    // Persist the reservedEvents state in localStorage
    localStorage.setItem('reservedEvents', JSON.stringify(reservedEvents));
  }, [reservedEvents]);

  return(
    <div className = "page-container-display">
        <div className = "box">
            <h1>Active Events</h1>
            <h3>Events that are sharing food right now!</h3>
            <div className="events-grid"  >
                    {events.map((event) => (
                        <div
                        key={event.id}
                        className="event-item">
                        <div
                        className = "event-title"
                        > {event.orgName + " - " + event.foodName + " - " + event.quantity} </div>
                        <div
                        className = "event-content"
                        >{event.location} </div>
                        <div className = "reserve-box">
                            <div>
                            <button data-testid={`reserve-${event.id}`} onClick={() => handleReservationDummy(event.id, event.headcount)}>
                                    {reservedEvents[event.id] ? 'I can no longer attend' : 'Reserve Now'}
                            </button>
                            </div>
                            <div data-testid = {`headcount-status-${event.id}`} className = "headcount-status">
                                {event.headcount + " people have reserved a spot at this event"}
                            </div>
                        </div>
                        <div data-testid = {`dietary-tag-${event.id}`} className = "dietary-tags">
                                {event.dietary.length > 0 && (
                                  <div>
                                    <strong>Dietary Tags:</strong> {event.dietary.join(', ')}
                                  </div>
                                )}
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
    