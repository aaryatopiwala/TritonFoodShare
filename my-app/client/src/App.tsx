import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import EventSubmission from './views/EventSubmission';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={
            <div>
            <h1>Welcome to my app</h1>
          </div>
        } />
          <Route path="/eventsubmit" element={<EventSubmission />} />
          {
          /* add a new path to your page!! 
          <Route path="/events" element={<DisplayEvents />} />
          */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
