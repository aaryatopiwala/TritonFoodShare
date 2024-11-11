import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FoodEvent } from "../types/types";
import './EventSubmissionForm.css';

const EventSubmissionForm = () => {
  const { foodEvents, setfoodEvents } = useContext(AppContext);

  const [orgName, setOrgName] = useState("");
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFoodEvent: FoodEvent = {
      id: foodEvents.length + 1,
      orgName,
      foodName,
      quantity: parseInt(quantity),
      location,
      description: '',
      headcount: 0,
    };

    setfoodEvents([...foodEvents, newFoodEvent]);

    setOrgName("");
    setFoodName("");
    setQuantity("");
    setLocation("");
  };

  return (
    <div className="submission-container">
      <div className="form-section">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="orgName" className="label">Organization Name</label>
            <input
              required
              type="text"
              placeholder="Who are you?"
              data-testid="orgName"
              id="orgName"
              value={orgName}
              onChange={(event) => setOrgName(event.target.value)}
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="foodName" className="label">Food Name</label>
            <input
              required
              type="text"
              placeholder="What would you like to share? Ex. Chipotle Burritos"
              data-testid="foodName"
              id="foodName"
              value={foodName}
              onChange={(event) => setFoodName(event.target.value)}
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity" className="label">Quantity</label>
            <input
              required
              type="number"
              placeholder="Enter the number of servings that are available"
              data-testid="quantity"
              id="quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location" className="label">Location Description</label>
            <textarea
              required
              placeholder="Please be descriptive as possible (ex. building, room number, directions to get there, etc.)"
              data-testid="location"
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="custom-textarea"
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>

      <div className="events-section">
        {foodEvents.length > 0 ? (
          <>
            <h2>My Events</h2>
            <p>These are all your past submissions</p>
            <div className="events-list">
              {foodEvents.map((event) => (
                <div key={event.id} className="event-card">
                  <img src="https://via.placeholder.com/64" alt="Event" />
                  <div className="event-card-content">
                    <h3>{event.orgName} - {event.foodName}</h3>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Quantity:</strong> {event.quantity}</p>
                  </div>
                  <button className="edit-button">Edit Event</button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-events-message">
            <p>You have no submissions so far.</p>
            <p>Submit a form to view it here!</p>
          </div>
        )}
        <button className="view-active-events-button">
          View Active Events
        </button>
      </div>
    </div>
  );
};

export default EventSubmissionForm;
