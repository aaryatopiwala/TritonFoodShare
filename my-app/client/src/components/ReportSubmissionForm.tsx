import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ReportSubmissionForm.css';



const ReportSubmissionForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [issue, setIssue] = useState('');
    const [event, setEvent] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false); // To track form submission status
    const [message, setMessage] = useState(''); // For storing the success/error message

    const serviceID = process.env.REACT_APP_SERVICEID;
    const templateID = process.env.REACT_APP_TEMPLATEID;
    const publicID = process.env.REACT_APP_PUBLICID;

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!templateID) {
            console.error("service");
        }
        if(!templateID){
            console.error("template")
        }
        if(!publicID){
            console.error("public")
        }

        const templateParams = {
            from_name:  name,
            from_email: email,
            to_name: "Triton Food Share",
            message: issue + "for this event: " + event,

        };



        emailjs.send( serviceID || '', 
            templateID || '',
            templateParams,
            publicID || '')
            .then((response)=> {
                console.log('email sent successfully', response)
                setName('');
                setEmail('');    
                setIssue('');
                setEvent('');
                setIsSubmitted(true);
                setMessage('Your message has been sent successfully!');
                setTimeout(() => setMessage(''), 5000);
            })
            .catch((error)=>{
                setMessage('There was an error sending your message. Please try again.');
                setTimeout(() => setMessage(''), 5000);
                setIsSubmitted(false);
                console.log('Error sending email', error)
            });
    }   

  return (
    <div className = "email-page-container">
        <div className = "contact">
            <h1>Contact Us!</h1>
        </div>
        <div className = "form-container">
            <form  onSubmit={handleSubmit} className = "emailForm">
                <label>Name</label>
                <input type = "text" placeholder = "Your Name" value = {name} onChange= {(e)=> setName(e.target.value)}/>

                <label>Email</label>
                <input type="email" value = {email} placeholder="Your email, so we can get back to you!" onChange= {(e)=> setEmail(e.target.value)}/>

                <label>Issue</label>
                <textarea name="Issue" placeholder = "What issue are you facing with this event? Ex. Inactive Event" value = {issue} onChange= {(e)=> setIssue(e.target.value)}/>

                <label>Event Name</label>
                <textarea name="EventName" placeholder = "Title of the event you are reporting" value = {event} onChange= {(e)=> setEvent(e.target.value)}/>

                <button type="submit"> SEND </button>
            </form>
        </div>
                {message && (
                        <div className={`popup-message ${isSubmitted ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}
        <div>
            <h2>For any other questions or concerns please reach out to ucsdtritonfoodshare@gmail.com</h2>
        </div>


    </div>
    
  );
};

export default ReportSubmissionForm;
