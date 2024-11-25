import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FoodEvent } from "../types/types";
import Select, { SingleValue } from 'react-select';
import './EventSubmissionForm.css';
import EditEventButton from "./EditEventButton";
import { useNavigate } from "react-router-dom";



interface OptionType {
  value: string;
  label: string;
}

const EventSubmissionForm = () => {
  const { foodEvents, setfoodEvents } = useContext(AppContext);
  const navigate = useNavigate();

  // Location tags
  const [selectedOptionLoction, setSelectedOptionLocation] = useState<SingleValue<OptionType>>(null);
  const locationOptions = [
    { value: 'cseBuilding', label: 'CSE Building' },
    { value: 'WLH', label: 'Warren Lecture Hall' },
    { value: 'CENTER', label: 'Center Hall' },
    { value: 'FAH', label: 'Franklin Antonio Hall' },
  ];
  const handleChangeLocation = (selectedOption: SingleValue<OptionType>) => {
    setSelectedOptionLocation(selectedOption);
  };

  // Diet tags
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
  const [showConfirmation, setShowConfirmation] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = Math.floor(Date.now() + Math.random() * 1000);
    const submissionData = {
        id,
        orgName,
        foodName,
        quantity: parseInt(quantity),
        locationDescription: location,
        bigLocation: selectedOptionLoction?.value || '',
        diet: selectedOptionDiet?.value || '',
    };

    try {
        const response = await fetch('http://localhost:8080/submissionForm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData),
        });

        if (response.ok) {
            const newFoodEvent: FoodEvent = {
                id,
                orgName,
                foodName,
                quantity: parseInt(quantity),
                location,
                description: '',
                headcount: 0,
            };

            setfoodEvents([...foodEvents, newFoodEvent]);
            setOrgName('');
            setFoodName('');
            setQuantity('');
            setLocation('');
            setSelectedOptionLocation(null);
            setSelectedOptionDiet(null);

            setShowConfirmation(true); // Show confirmation message
            setTimeout(() => setShowConfirmation(false), 3000); // Hide after 3 seconds
        } else {
            console.error('Failed to submit the form');
        }
    } catch (error) {
        console.error('An error occurred while submitting the form:', error);
    }
  };
  const handleViewActiveEvents = () => {
    navigate("/eventdisplay");
  };


  return (
    <div className="custom-container">
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="orgName" className="custom-label">Organization Name</label>
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
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="foodName" className="custom-label">Food Name</label>
          <input
            required
            type="text"
            placeholder="chipotle"
            data-testid="foodName"
            id="foodName"
            value={foodName}
            onChange={(event) => setFoodName(event.target.value)}
            className="custom-input"
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="quantity" className="custom-label">Quantity</label>
          <input
            required
            type="number" // Use type="number" for numeric input
            placeholder="23"
            data-testid="quantity"
            id="quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className="custom-input"
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="locationDescription" className="custom-label">Location Description</label>
          <textarea
            required
            placeholder="CSE building"
            data-testid="locationDescription"
            id="locationDescription"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="custom-input custom-textarea"
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="BigLocation" className="custom-label">Search for location</label>
          <Select
            id="BigLocation"
            value={selectedOptionLoction}
            onChange={handleChangeLocation}
            options={locationOptions}
            placeholder="Search for your location..."
            isSearchable
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="diet" className="custom-label">Dietary tags</label>
          <Select
            id="diet"
            value={selectedOptionDiet}
            onChange={handleChangeDiet}
            options={dietOptions}
            placeholder="Search for tags..."
            isSearchable
          />
        </div>
        <button type="submit" style={{ width: '100%', height: '40px', borderRadius: '8px', backgroundColor: '#4CAF50', color: 'white', fontSize: '16px', border: 'none' }}>
          Submit
        </button>
      </form>
      {showConfirmation && (
        <div className="confirmation-message">
            🎉 Your event has been successfully submitted!
        </div>
      )}
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
      </div>
      <button className="view-active-events-button" onClick={handleViewActiveEvents}>
          View Active Events
      </button>
    </div>
    
  );
};

export default EventSubmissionForm;