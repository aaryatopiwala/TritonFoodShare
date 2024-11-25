import ReportSubmission from "./ReportSubmissionForm"
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';  

describe('contact form tests', () => {

    test('form displayed', async () => {
      render(<BrowserRouter>
        <ReportSubmission />
      </BrowserRouter>);
  
        // Check if placeholders are present for Name, Email, Issue, and Event Name fields
      const namePlaceholder = screen.getByPlaceholderText('Your Name');
      const emailPlaceholder = screen.getByPlaceholderText('Your email, so we can get back to you!');
      const issuePlaceholder = screen.getByPlaceholderText('What issue are you facing with this event? Ex. Inactive Event');
      const eventPlaceholder = screen.getByPlaceholderText('Title of the event you are reporting');
  
      // Assert that all placeholders are in the document
      expect(namePlaceholder).toBeInTheDocument();
      expect(emailPlaceholder).toBeInTheDocument();
      expect(issuePlaceholder).toBeInTheDocument();
      expect(eventPlaceholder).toBeInTheDocument();
    });
  
  
  });