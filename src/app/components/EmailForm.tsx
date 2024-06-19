import React, { useState } from 'react';
import './EmailForm.css';

const EmailForm: React.FC = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);

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
        setMessage({ text: 'Email sent successfully', error: false });
      } else {
        setMessage({ text: result.error || 'Error sending email', error: true });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ text: 'Error sending email', error: true });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          className="input"
          type="email"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder=" "
          required
        />
        <label className="label" htmlFor="to">To:</label>
      </div>
      <div className="form-group">
        <input
          className="input"
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder=" "
          required
        />
        <label className="label" htmlFor="subject">Subject:</label>
      </div>
      <div className="form-group">
        <textarea
          className="textarea"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder=" "
          required
        />
        <label className="label" htmlFor="text">Text:</label>
      </div>
      <div className="form-group">
        <input
          className="input"
          type="file"
          id="files"
          multiple
          onChange={handleFileChange}
        />
      </div>
      <button className="button" type="submit">Send Email</button>
      {message && (
        <p className={`message ${message.error ? 'error' : 'success'}`}>
          {message.text}
        </p>
      )}
    </form>
  );
};

export default EmailForm;
