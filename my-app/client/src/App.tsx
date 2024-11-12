import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EventSubmission from './views/EventSubmission';
import NavBar from './components/NavBar';
import { EventDisplay } from './views/EventDisplay';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <div style={{ backgroundColor: '#F6F6F6', minHeight: '100vh' }}>
      <AppProvider>
        <BrowserRouter>
          <NavBar />
          <div style={{ display: 'flex', padding: '20px' }}>
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <h1>Welcome to my app</h1>
                  </div>
                }
              />
              <Route
                path="/eventsubmit"
                element={
                  <div style={{ display: 'flex', maxWidth: '20000px', width: '100%', gap: '40px' }}>
                    <div style={{ marginRight: '300px'}}>
                      <EventSubmission />
                    </div>
                  </div>
                }
              />
              <Route path="/eventdisplay" element={<EventDisplay />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
