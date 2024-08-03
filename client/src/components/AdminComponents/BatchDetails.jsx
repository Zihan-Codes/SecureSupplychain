import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BatchDetails = () => {
  const [batches, setBatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/batches');
        setBatches(response.data);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };

    fetchBatches();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'produceName', headerName: 'Produce Name', width: 150 },
    { field: 'harvestDate', headerName: 'Harvest Date', width: 130 },
    {
      field: 'view',
      headerName: 'View',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/batch/${params.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  const filteredBatches = batches.filter((batch) =>
    batch.produceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Paper>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>
      <Box sx={{ height: 400, width: '100%', marginTop: 2 }}>
        <DataGrid rows={filteredBatches} columns={columns} pageSize={5} />
      </Box>
    </Box>
  );
};

export default BatchDetails;
