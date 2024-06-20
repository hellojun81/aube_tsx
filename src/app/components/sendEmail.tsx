'use client'
import React, { useState } from 'react';
import './sendEmail.css';
import { Button, Container, Typography, TextField, Box } from '@mui/material';
const ApiEmailPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus('Sending...');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    if (attachment) {
      formData.append('attachment', attachment);
    }

    const res = await fetch('/api/sendmail', {
      method: 'POST',
      body: formData,
    });

    if (res.status === 200) {
      setStatus('Email sent successfully!');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setAttachment(null);
    } else {
      setStatus('Failed to send email.');
    }
  };

  return (
    <div className="container" id='sendEmail'>
      <form onSubmit={handleSubmit} className='form'>
        <div className="form-group">
          <TextField
            label="Name"
            variant="standard"
            margin="normal"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <TextField
            label="Email"
            variant="standard"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
    
          <TextField
            label="subject"
            variant="standard"
            margin="normal"
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group"  style={{marginBottom:'10px',width:'100%'}}>
       
          <TextField
            id="message"
            label="message"
            value={message}
            multiline
            rows={3}
            defaultValue="message"
            variant="standard"
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="form-group" style={{marginBottom:'20px'}}>
          <input
            type="file"
            id="attachment"
            onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <button type="submit">Send</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default ApiEmailPage;
