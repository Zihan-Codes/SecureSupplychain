import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from './LogoutComponent';

const LogoutButton = () => {
  const logout = useLogout();

  return (
    <Button 
      variant="contained" 
      color="secondary" 
      startIcon={<LogoutIcon />} 
      size='small'
      onClick={logout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
