import React from 'react';
import EventSubmissionForm from '../components/EventSubmissionForm';

function EventSubmission() {
    return (
        <div  className = "page-container">
            <div className="App">
            </div>
            <div style={{ marginLeft: '25px', marginTop: '50px', marginBottom: '40px' }}>
                <EventSubmissionForm />
            </div>
        </div>
    );
}

export default EventSubmission;