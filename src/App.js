import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    body: '',
  });

  // Update form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailArray = formData.email
      .split(',')
      .map(email => email.trim())
      .filter(email => email !== '');

      const requestData = {
        subject: formData.subject,
        body: formData.body,
        email: emailArray, // Send the cleaned array of emails
      };
  

    console.log(requestData);
    
    try {
      const response = await fetch('http://localhost:3000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      if (response.ok) {
        alert('Email sent successfully');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error triggering email workflow');
    }
  };

  return (
    <div className="App">
      <h1>Send Email via Novu</h1>
      <form onSubmit={handleSubmit}>
        <div style={{margin: "10px"}}>
          <label style={{marginRight: "10px"}}>Email:</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{margin: "10px"}}>
          <label style={{marginRight: "10px"}}>Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{margin: "10px"}}>
          <label style={{marginRight: "10px"}}>Body:</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}

export default App;
