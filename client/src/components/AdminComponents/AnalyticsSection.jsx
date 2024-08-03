import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const AnalyticsSection = ({ wastageAnalysis, supplyChainEfficiency, complianceMonitoring }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper>
          <Typography variant="h6">Wastage Analysis</Typography>
          <Typography>Total Wastage: {wastageAnalysis.total}</Typography>
          <Typography>Farm: {wastageAnalysis.farm}</Typography>
          <Typography>Transport: {wastageAnalysis.transport}</Typography>
          <Typography>Supermarket: {wastageAnalysis.supermarket}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>
          <Typography variant="h6">Supply Chain Efficiency</Typography>
          <Typography>Average Time: {supplyChainEfficiency.avgTime}</Typography>
          <Typography>Harvest: {supplyChainEfficiency.harvest}</Typography>
          <Typography>Transport: {supplyChainEfficiency.transport}</Typography>
          <Typography>Storage: {supplyChainEfficiency.storage}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>
          <Typography variant="h6">Compliance Monitoring</Typography>
          <Typography>Compliance: {complianceMonitoring.compliance}%</Typography>
          <Typography>Alerts: {complianceMonitoring.alerts}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AnalyticsSection;
