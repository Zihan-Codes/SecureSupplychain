import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Notifications = ({ notifications }) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Paper>
        <Typography variant="h6" gutterBottom>
          Notifications
        </Typography>
        <List>
          {notifications.map((notification, index) => (
            <ListItem key={index}>
              <ListItemText primary={notification.message} secondary={notification.date} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Notifications;
