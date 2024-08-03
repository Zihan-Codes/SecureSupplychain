import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, CssBaseline, Typography, Grid, Toolbar, AppBar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

const FarmerHome = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    farmerId: '',
    location: '',
    category: '',
    produceName: '',
    variety: '',
    harvestDate: '',
    harvestTime: '',
    totalWeight: '',
    numberOfUnits: '',
    handlingInstructions: '',
    pesticidesUsed: '',
    fertilizersUsed: '',
    additionalNotes: ''
  });

  const [harvests, setHarvests] = useState([]);

  useEffect(() => {
    fetchHarvests();
  }, []);

  const fetchHarvests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/h/harvest');
      setHarvests(response.data.map((item, index) => ({ id: index + 1, ...item })));
    } catch (error) {
      console.error("Error fetching harvests:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/h/harvest', formData);
      fetchHarvests();
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const columns = [
    { field: 'farmerId', headerName: 'Farmer ID', width: 150 },
    { field: 'produceName', headerName: 'Produce Name', width: 150 },
    { field: 'harvestDate', headerName: 'Harvest Date', width: 150 },
    {
      field: 'view',
      headerName: 'View',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/harvest-product-view/${harvests[params.id-1]._id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Farmer Home
          </Typography>
          <IconButton color="inherit" onClick={() => navigate('/home')}>
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => console.log('Logout')}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Harvested Goods
        </Typography>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid rows={harvests} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
        </Box>
        <Box mt={4} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add New Harvesting Goods
          </Button>
        </Box>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Harvesting Goods</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Farmer ID"
                name="farmerId"
                value={formData.farmerId}
                onChange={handleChange}
                placeholder="Enter your unique Farmer ID"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter the general location or region of the farm"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <MenuItem value="Vegetable">Vegetable</MenuItem>
                <MenuItem value="Fruit">Fruit</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Produce Name"
                name="produceName"
                value={formData.produceName}
                onChange={handleChange}
                placeholder="Enter the produce name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Variety"
                name="variety"
                value={formData.variety}
                onChange={handleChange}
                placeholder="Enter variety (if applicable)"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Harvest Date"
                name="harvestDate"
                value={formData.harvestDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="time"
                label="Harvest Time"
                name="harvestTime"
                value={formData.harvestTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Total Weight (Kg)"
                name="totalWeight"
                value={formData.totalWeight}
                onChange={handleChange}
                placeholder="Enter total weight in kilograms"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Number of Units"
                name="numberOfUnits"
                value={formData.numberOfUnits}
                onChange={handleChange}
                placeholder="Enter the number of crates, boxes, or items"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Special Handling Instructions"
                name="handlingInstructions"
                value={formData.handlingInstructions}
                onChange={handleChange}
                multiline
                rows={3}
                placeholder="Enter any special handling requirements (e.g., temperature needs)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Pesticides Used"
                name="pesticidesUsed"
                value={formData.pesticidesUsed}
                onChange={handleChange}
                placeholder="Specify any pesticides used"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Fertilizers Used"
                name="fertilizersUsed"
                value={formData.fertilizersUsed}
                onChange={handleChange}
                placeholder="Specify any fertilizers used"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                multiline
                rows={3}
                placeholder="Any additional remarks or observations"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FarmerHome;
