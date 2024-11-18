import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select, { SingleValue } from 'react-select';
import { AppContext } from "../context/AppContext";
import { FoodEvent } from "../types/types";
import './EventSubmissionForm.css';
import EditEventButton from "./EditEventButton";

interface OptionType {
  value: string;
  label: string;
}

const EventSubmissionForm = () => {
  const { foodEvents, setfoodEvents } = useContext(AppContext);
  const navigate = useNavigate();

  const [selectedOptionLocation, setSelectedOptionLocation] = useState<SingleValue<OptionType>>(null);
  const locationOptions = [
    { value: 'cseBuilding', label: 'CSE Building' },
    { value: 'WLH', label: 'Warren Lecture Hall' },
    { value: 'CENTER', label: 'Center Hall' },
    { value: 'FAH', label: 'Franklin Antonio Hall' },
  ];
  const handleChangeLocation = (selectedOption: SingleValue<OptionType>) => {
    setSelectedOptionLocation(selectedOption);
  };

  const [selectedOptionDiet, setSelectedOptionDiet] = useState<SingleValue<OptionType>>(null);
  const dietOptions = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'halal', label: 'Halal' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'vegan', label: 'Vegan' },
  ];
  const handleChangeDiet = (selectedOption: SingleValue<OptionType>) => {
    setSelectedOptionDiet(selectedOption);
  };

  const [orgName, setOrgName] = useState("");
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false); // New state for confirmation

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFoodEvent: FoodEvent = {
      id: foodEvents.length + 1,
      orgName,
      foodName,
      quantity: quantity,
      location: selectedOptionLocation?.label || location,
      description,
      headcount: 0,
      dietary: []
    };

    setfoodEvents([...foodEvents, newFoodEvent]);

    setOrgName("");
    setFoodName("");
    setQuantity("");
    setLocation("");
    setSelectedOptionLocation(null);
    setSelectedOptionDiet(null);

    setShowConfirmation(true); // Show confirmation message
    setTimeout(() => setShowConfirmation(false), 3000); // Hide after 3 seconds
  };

  const handleViewActiveEvents = () => {
    navigate("/eventdisplay");
  };

  return (
    <div className="submission-container">
      <div className="form-section">
        <form onSubmit={onSubmit}>
          {/* Form Fields */}
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
          <div className="form-group">
            <label htmlFor="BigLocation" className="label">Search for location</label>
            <Select
              id="BigLocation"
              value={selectedOptionLocation}
              onChange={handleChangeLocation}
              options={locationOptions}
              placeholder="Search for your location..."
              isSearchable
            />
          </div>
          <div className="form-group">
            <label htmlFor="diet" className="label">Dietary Tags</label>
            <Select
              id="diet"
              value={selectedOptionDiet}
              onChange={handleChangeDiet}
              options={dietOptions}
              placeholder="Search for tags..."
              isSearchable
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        {showConfirmation && (
        <div className="confirmation-message">
            🎉 Your event has been successfully submitted!
        </div>
        )}
      </div>

      {/* My Events Section */}
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
                  <EditEventButton event={event} />
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
        <button className="view-active-events-button" onClick={handleViewActiveEvents}>
          View Active Events
        </button>
      </div>
    </div>
  );
};

export default EventSubmissionForm;
