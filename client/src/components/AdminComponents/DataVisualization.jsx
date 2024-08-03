import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', wastage: 4 },
  { name: 'Feb', wastage: 3 },
  { name: 'Mar', wastage: 5 },
  { name: 'Apr', wastage: 2 },
  { name: 'May', wastage: 1 },
  { name: 'Jun', wastage: 3 },
];

const DataVisualization = () => {
  return (
    <Paper sx={{ padding: 2, marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Wastage Trends
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="wastage" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default DataVisualization;
