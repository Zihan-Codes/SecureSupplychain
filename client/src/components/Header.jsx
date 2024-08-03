import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import BackButton from './BackButton';
import LogoutButton from './LogoutButton';

const Header = () => {
  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          <BackButton />
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
