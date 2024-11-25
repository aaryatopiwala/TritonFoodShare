import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FoodEvent } from "../types/types";
import Select, { SingleValue } from 'react-select';
import './EventSubmissionForm.css';

interface OptionType {
  value: string;
  label: string;
}

const EventSubmissionForm = () => {
  const { foodEvents, setfoodEvents } = useContext(AppContext);

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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Generate a unique numeric ID using Date.now() and Math.random()
    const id = Math.floor(Date.now() + Math.random() * 1000);

    // Prepare the form data to send to the backend
    const submissionData = {
      id, // Use the generated numeric id
      orgName,
      foodName,
      quantity: parseInt(quantity), // Ensure quantity is a number
      locationDescription: location,
      bigLocation: selectedOptionLoction?.value || '',
      diet: selectedOptionDiet?.value || '',
    };

    try {
      // Send a POST request to your backend API
      const response = await fetch('http://localhost:8080/submissionForm', { // Replace with your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });


      // Check if the request was successful
      if (response.ok) {
        const newFoodEvent: FoodEvent = {
          id, // Use the numeric id
          orgName,
          foodName,
          quantity: parseInt(quantity),
          location,
          description: '',
          headcount: 0,
        };

        // Update the local state with the new event
        setfoodEvents([...foodEvents, newFoodEvent]);
        console.log('Submission successful:', foodEvents);
      } else {
        console.error('Failed to submit the form');
      }
    } catch (error) {
      console.error('An error occurred while submitting the form:', error);
    }
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
    </div>
  );
};

export default EventSubmissionForm;
