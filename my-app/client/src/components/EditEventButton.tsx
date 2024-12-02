import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select, { SingleValue } from 'react-select';
import { AppContext } from "../context/AppContext";
import { FoodEvent } from "../types/types";
import './EventSubmissionForm.css';
import EditEventModal from "./EditEventModal";

interface EditEventButtonProps {
  event: FoodEvent;
}

const EditEventButton: React.FC<EditEventButtonProps> = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className = "view-edit-button">
      <button className = "edit-event-button"onClick={handleButtonClick}>Edit Event</button>
      <EditEventModal isOpen={isModalOpen} onClose={handleCloseModal} event={event} />
    </div>
  );
};

export default EditEventButton;