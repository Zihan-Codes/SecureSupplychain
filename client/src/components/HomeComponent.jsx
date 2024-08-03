import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, CssBaseline, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

const BackgroundBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundImage: 'url(https://thumbs.dreamstime.com/z/frame-vegetables-fruits-white-63847157.jpg)', // Change the URL to your desired background image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
});

const HomeComponent = () => {
  let navigate = useNavigate();

  const navigateToAdminHome = () => {
    navigate('/admin-home');
  };

  const navigateToFarmerHome = () => {
    navigate('/farmer-home');
  };

  return (
    <BackgroundBox>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 2, padding: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to the Inventory System
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" fullWidth onClick={navigateToAdminHome}>
              Admin Home
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="secondary" fullWidth onClick={navigateToFarmerHome}>
              Farmer Home
            </Button>
          </Grid>
        </Grid>
      </Container>
    </BackgroundBox>
  );
};

export default HomeComponent;
