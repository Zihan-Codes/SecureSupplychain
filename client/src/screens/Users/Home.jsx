import React from 'react';
import UserGreeting from '../../components/UserComponents/UserGreeting';
import Header from '../../components/Header';
import { Box, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';

const Home = () => {
  const usernamee = "John Doe"; // Replace this with dynamic data as needed
  const username = useSelector((state) => state.user.username);

  return (
    <Box>
      <CssBaseline />
      <Header />
      <Box mt={8} p={1}>
        <UserGreeting username={username} />
      </Box>

    </Box>
  );
};

export default Home;
