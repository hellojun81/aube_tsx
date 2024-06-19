import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #ffffff;
`;

const FormGroup = styled.div`
  position: relative;
  // margin-bottom: 1.5rem;
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #333333;
  pointer-events: none;
  transition: 0.2s ease all;
  opacity: 0.6;
`;

const Input = styled.input`
  width: 100%;
   padding-top: 1rem;
  border:0px;
  border-bottom: 1px solid #333333;
  font-size: 1rem;
  color: #333333;
  &:focus {
    outline: none;
    border-color: #000000;
  }
  &:focus + ${Label},
  &:not(:placeholder-shown) + ${Label} {
    top: -1.5rem;
    left: 0;
    font-size: 0.75rem;
    opacity: 1;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding-top: 1rem;
  border:0px;
  border-bottom: 1px solid #333333;
  font-size: 1rem;
  color: #333333;
  &:focus {
    outline: none;
    border-color: #000000;
  }
  &:focus + ${Label},
  &:not(:placeholder-shown) + ${Label} {
    top: -1.5rem;
    left: 0;
    font-size: 0.75rem;
    opacity: 1;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  background-color: #333333;
  color: white;
  font-size: 1rem;
  margin-top:1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #000000;
  }
`;

interface MessageProps {
  error: boolean;
}

const Message = styled.p<MessageProps>`
  margin-top: 1rem;
  color: ${(props) => (props.error ? 'red' : 'green')};
  font-size: 0.875rem;
`;

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
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          type="email"
          id="Your email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder=" "
          required
        />
        <Label htmlFor="to">To:</Label>
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder=" "
          required
        />
        <Label htmlFor="subject">Subject:</Label>
      </FormGroup>
      <FormGroup>
        <Textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder=" "
          required
        />
        <Label htmlFor="text">Text:</Label>
      </FormGroup>
      <FormGroup>
        <Input
          type="file"
          id="files"
          multiple
          onChange={handleFileChange}
        />
      </FormGroup>
      <Button type="submit">Send Email</Button>
      {message && <Message error={message.error}>{message.text}</Message>}
    </Form>
  );
};

export default EmailForm;
