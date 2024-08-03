import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';
import OverviewCards from './OverviewCards';
import AnalyticsSection from './AnalyticsSection';
import BatchDetails from './BatchDetails';
import DataVisualization from './DataVisualization';
import Notifications from './Notifications';

const AdminHome = () => {

    const [overviewData, setOverviewData] = useState({
        totalBatches: 0,
        activeBatches: 0,
        completedBatches: 0,
        wastagePercentage: 0,
      });
      const [analyticsData, setAnalyticsData] = useState({
        wastageAnalysis: { total: 0, farm: 0, transport: 0, supermarket: 0 },
        supplyChainEfficiency: { avgTime: 0, harvest: 0, transport: 0, storage: 0 },
        complianceMonitoring: { compliance: 0, alerts: 0 },
      });
      const [notifications, setNotifications] = useState([]);
    
      useEffect(() => {
        // Fetch data for overview cards
        const fetchOverviewData = async () => {
          // Replace with actual API call
          const data = {
            totalBatches: 100,
            activeBatches: 30,
            completedBatches: 70,
            wastagePercentage: 5,
          };
          setOverviewData(data);
        };
    
        // Fetch data for analytics section
        const fetchAnalyticsData = async () => {
          // Replace with actual API call
          const data = {
            wastageAnalysis: { total: 500, farm: 200, transport: 150, supermarket: 150 },
            supplyChainEfficiency: { avgTime: '3 days', harvest: '1 day', transport: '1 day', storage: '1 day' },
            complianceMonitoring: { compliance: 95, alerts: 3 },
          };
          setAnalyticsData(data);
        };
    
        // Fetch notifications
        const fetchNotifications = async () => {
          // Replace with actual API call
          const data = [
            { message: 'High wastage in transport', date: '2024-08-02' },
            { message: 'Non-compliance detected', date: '2024-08-03' },
          ];
          setNotifications(data);
        };
    
        fetchOverviewData();
        fetchAnalyticsData();
        fetchNotifications();
      }, []);


    return (
        <div>
            <Header />
            <Container>
        <Box sx={{ marginTop: 4 }}>
          <OverviewCards {...overviewData} />
          <br />
          <br />
          <AnalyticsSection {...analyticsData} />
          <DataVisualization />
          <BatchDetails />
          <Notifications notifications={notifications} />
        </Box>
      </Container>
        </div>

    );
};

export default AdminHome;