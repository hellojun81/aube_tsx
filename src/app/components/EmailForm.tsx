import React, { useState } from 'react';

const EmailForm: React.FC = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');

    const formData = new FormData();
    formData.append('to', to);
    formData.append('subject', subject);
    formData.append('text', text);
    files.forEach((file) => formData.append('files', file));

    try {
      const response = await fetch('http://localhost:8002/sendmail', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Email sent successfully');
      } else {
        setMessage(result.error || 'Error sending email');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error sending email');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="to">To:</label>
        <input
          type="email"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="text">Text:</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="files">Attachments:</label>
        <input
          type="file"
          id="files"
          multiple
          onChange={handleFileChange}
        />
      </div>
      <button type="submit">Send Email</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default EmailForm;
