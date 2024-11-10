import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FoodEvent } from "../types/types";

const EventSubmissionForm = () => {
  const { foodEvents, setfoodEvents } = useContext(AppContext);

  const [orgName, setOrgName] = useState("");
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    //refactor = move all of the stye to the css file
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
    console.log(foodEvents);
  };

  const inputStyle = {
    width: '484px', // original width
    height: '40px', // original height
    borderRadius: '8px',
    padding: '8px',
    boxSizing: 'border-box' as const,
    border: '1px solid #e0e0e0',
    fontSize: '14px',
  };

  const labelStyle = {
    fontSize: '14px',
    marginBottom: '8px',
    display: 'block',
  };

  const containerStyle = {
    width: '532px', // original width
    height: '742px', // original height
    backgroundColor: '#fff',
    padding: '20px',
    boxSizing: 'border-box' as const,
    border: '1px solid #ccc',
    borderRadius: '8px',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="orgName" style={labelStyle}>Organization Name</label>
          <input
            required
            type="text"
            placeholder="Who are you?"
            data-testid="orgName"
            id="orgName"
            value={orgName}
            onChange={(event) => setOrgName(event.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="foodName" style={labelStyle}>Food Name</label>
          <input
            required
            type="text"
            placeholder="chipotle"
            data-testid="foodName"
            id="foodName"
            value={foodName}
            onChange={(event) => setFoodName(event.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="quantity" style={labelStyle}>Quantity</label>
          <input
            required
            type="number"
            placeholder="23"
            data-testid="quantity"
            id="quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="location" style={labelStyle}>Location Description</label>
          <textarea
            required
            placeholder="CSE building"
            data-testid="location"
            id="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            style={{ ...inputStyle, height: '80px', resize: 'none' }}
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
