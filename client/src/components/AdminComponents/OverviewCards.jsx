import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const OverviewCards = ({ totalBatches, activeBatches, completedBatches, wastagePercentage }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Paper>
          <Typography variant="h6">Total Batches</Typography>
          <Typography variant="h4">{totalBatches}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>
          <Typography variant="h6">Active Batches</Typography>
          <Typography variant="h4">{activeBatches}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>
          <Typography variant="h6">Completed Batches</Typography>
          <Typography variant="h4">{completedBatches}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>
          <Typography variant="h6">Wastage Percentage</Typography>
          <Typography variant="h4">{wastagePercentage}%</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OverviewCards;
