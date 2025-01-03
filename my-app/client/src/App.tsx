import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EventSubmission from './views/EventSubmission';
import NavBar from './components/NavBar';
import { EventDisplay } from './views/EventDisplay';
import ReportSubmission from "./views/ReportSubmission"
import { AppProvider } from './context/AppContext';
import Login from './components/login';
import Signup from './components/signup';
import HomePage from './views/Home'; 



function App() {
  return (
    <div style={{ backgroundColor: '#F6F6F6', minHeight: '100vh' }}>
      <AppProvider>
        <BrowserRouter>
          <NavBar />
          <div >
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage />
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
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path = "/contact" element = {<ReportSubmission/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
