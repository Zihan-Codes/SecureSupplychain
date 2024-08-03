// UserGreeting.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const GreetingContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#63a4ff',
  color: '#ffffff',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
});

const GreetingMessage = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '16px',
});

const UserGreeting = ({ username }) => {
  return (
    <GreetingContainer>
      <GreetingMessage>Hello {username}!</GreetingMessage>
      <Typography variant="h5">Welcome to ABC Supermarket</Typography>
    </GreetingContainer>
  );
};

export default UserGreeting;
