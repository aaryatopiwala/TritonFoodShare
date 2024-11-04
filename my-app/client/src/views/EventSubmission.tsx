import React from 'react';
import EventSubmissionForm from '../components/EventSubmissionForm';
import MyEventsList from '../components/MyEventsList';


function EventSubmission() {
    return (
        <><div className="App">
            <p>Hello EventSubmission!</p>
        </div>
        <div>
                <EventSubmissionForm />
            </div>

        <div>
            <MyEventsList/>
        </div>
            
        </>
    );
}

export default EventSubmission;
