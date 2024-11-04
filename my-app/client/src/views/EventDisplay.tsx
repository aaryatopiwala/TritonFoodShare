import React from 'react';
import { useState, useContext } from 'react';
import {FoodEvent} from '../types/types'
import { dummyEventList } from '../constants/constants';

export const EventDisplay = () => {
    //Favorites function
  const [events] = useState<FoodEvent[]>(dummyEventList);

  return(
    <div className = "page-container">
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
                        > {event.orgName + " - " + event.foodName} </div>
                        <div
                        className = "event-content"
                        >{event.location} </div>
                        <div>
                        <button>Reserve Now</button>
                        </div>
                    </div>
                    ))}
            </div>
        </div>
    </div>
  );}
    