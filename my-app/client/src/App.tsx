import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import EventSubmission from './views/EventSubmission';
import NavBar from './components/NavBar';

import {EventDisplay} from './views/EventDisplay';

import { AppProvider } from './context/AppContext';


function App() {
  return (


    

    <AppProvider>
      
      <BrowserRouter>
<NavBar/>
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

          <Route path = "/eventdisplay" element = {
            <EventDisplay/>}/>

        </Routes>
      </div>
    </BrowserRouter>
    </AppProvider>
    
  );
}

export default App;
