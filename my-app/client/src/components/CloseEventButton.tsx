import React, { useState, useContext, useEffect, useRef } from "react";
import { FoodEventContext } from "../context/AppContext";
import { FoodEvent } from "../types/types";
import './EventSubmissionForm.css';
import './EditEventModal.css';
import Modal from './Modal';
import '../utils/foodEvents-utils'; // Adjust the import path as necessary
import { deleteFoodEvent } from "../utils/foodEvents-utils";


interface CloseEventButtonProps {
    event: FoodEvent;
}
const CloseEventButton: React.FC<CloseEventButtonProps> = ({ event }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const focusInputRef = useRef<HTMLInputElement | null>(null);
    const { foodEvents, setfoodEvents } = useContext(FoodEventContext);

    const handleCloseEventClick = () => {
        setIsConfirmationOpen(true);
    };
    const handleConfirmClose = async () => {
        try {
            // Commented out since it causes an error.
            //await deleteFoodEvent(event.id.toString());
            
            const updatedEvents = foodEvents.filter(e => e.id !== event.id);
            setfoodEvents(updatedEvents);
            
            handleCancelClose();
          } catch (error) {
            console.error("Failed to delete event:", error);
          }
    };

    const handleCancelClose = () => {
        setIsConfirmationOpen(false);
    };

    return (
        <div>
            <button
                type="button"
                onClick={handleCloseEventClick}
                style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                End Event
            </button>
            <Modal
                hasCloseBtn={false}
                isOpen={isConfirmationOpen}
                onClose={handleCancelClose}>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h3>Are you sure you want to close this event?</h3>
                    <p>This action cannot be undone.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                        <button
                            onClick={handleConfirmClose}
                            style={{
                                backgroundColor: '#dc3545',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>
                            Yes, Close Event
                        </button>
                        <button
                            onClick={handleCancelClose}
                            style={{
                                backgroundColor: '#6c757d',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>


    );
};

export default CloseEventButton;