import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous route
  };

  return (
    // <Button
    //   variant="contained"
    //   color="primary"
    //   startIcon={<ArrowBackIcon />}
    //   onClick={handleBackClick}
    //   style={{ marginBottom: '20px' }}
    // >
    //   Back
    // </Button>

    <IconButton color="secondary" onClick={handleBackClick}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
