'use client'
import React from 'react';
import EmailForm from '../components/EmailForm';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Send an Email</h1>
      <EmailForm />
    </div>
  );
};

export default Home;
