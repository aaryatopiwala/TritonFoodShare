import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select, { SingleValue } from 'react-select';
import { FoodEventContext } from "../context/AppContext";
import { FoodEvent } from "../types/types";
import './EventSubmissionForm.css';
import './EditEventModal.css'; // Import the CSS file

import Modal from './Modal';
import CloseEventButton from "./CloseEventButton";
import { updateFoodEvent } from "../utils/foodEvents-utils";

interface OptionType {
    value: string;
    label: string;
  }

  interface EditEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: FoodEvent;
  }

const EditEventModal: React.FC<EditEventModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {

  const focusInputRef = useRef<HTMLInputElement | null>(null);
  
  const { foodEvents, setfoodEvents } = useContext(FoodEventContext);

  const [selectedOptionLocation, setSelectedOptionLocation] = useState<SingleValue<OptionType>>(null);
  const locationOptions = [
    { value: 'cseBuilding', label: 'CSE Building' },
    { value: 'WLH', label: 'Warren Lecture Hall' },
    { value: 'CENTER', label: 'Center Hall' },
    { value: 'Atkinson', label: 'Atkinson Hall' },
    { value: 'Sixth Collge', label: 'Sixth College' },
    { value: 'Peterson', label: 'Peterson Hall' },
    { value: 'Geisel', label: 'Geisel Library' },
    { value: 'Price', label: 'Price Center' }
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
    { value: 'lactose', label: 'Lactose' },
    { value: 'gluten', label: 'Gluten' },

  ];
  const handleChangeDiet = (selectedOption: SingleValue<OptionType>) => {
    setSelectedOptionDiet(selectedOption);
  };

  const [orgName, setOrgName] = useState(event.orgName);
  const [foodName, setFoodName] = useState(event.foodName);
  const [quantity, setQuantity] = useState(event.quantity);
  const [location, setLocation] = useState(event.locationDescription);
  const [description, setDescription] = useState(event.description);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedEvent: FoodEvent = {
      id: event.id ,
      orgName: orgName,
      foodName: foodName,
      quantity: quantity,
      locationDescription: location,
      biglocation: selectedOptionLocation?.label || location,
      description: description,
      dietary: selectedOptionDiet?.value || '',
      headcount: event.headcount,
      userId: event.userId,
    };

    try {
      await updateFoodEvent(event.id.toString() ,updatedEvent);
    const updatedEvents = foodEvents.map((e) =>
      e.id === event.id ? updatedEvent : e
    ); 

    setfoodEvents(updatedEvents);

    setOrgName(updatedEvent.orgName);
    setFoodName(updatedEvent.foodName);
    setQuantity(updatedEvent.quantity);
    setLocation(updatedEvent.locationDescription);
    setSelectedOptionLocation(null);
    setSelectedOptionDiet(null);
    onClose();
} catch (error) {
  console.error('Failed to update the event', error);
}
  };

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);


  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}>
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
            <label htmlFor="description" className="label">General Description</label>
            <input
              required
              type="string"
              placeholder="Add a description for your event"
              data-testid="description"
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
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
            Update Submission
          </button>
        </form>
        
    </Modal>
  );
};

export default EditEventModal;