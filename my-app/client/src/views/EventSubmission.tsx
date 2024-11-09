import React from 'react';
import EventSubmissionForm from '../components/EventSubmissionForm';
import MyEventsList from '../components/MyEventsList';

function EventSubmission() {
    return (
        <div  className = "page-container">
            <div className="App">
            </div>
            <div style={{ marginLeft: '25px', marginTop: '50px', marginBottom: '40px' }}>
                <EventSubmissionForm />
            </div>
            <div>
                <MyEventsList />
            </div>
        </div>
    );
}

export default EventSubmission;