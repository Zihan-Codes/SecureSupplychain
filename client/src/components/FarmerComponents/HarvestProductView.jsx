import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, CssBaseline, Typography, Grid, AppBar, Toolbar, IconButton, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

const HarvestProductView = () => {
  const { id } = useParams();
  const [harvest, setHarvest] = useState(null);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    const fetchHarvest = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/h/harvest/${id}`);
        setHarvest(response.data);
      } catch (error) {
        console.error("Error fetching harvest:", error);
      }
    };

    fetchHarvest();
  }, [id]);

  if (!harvest) return <Typography>Loading...</Typography>;

  const cardStyles = {
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#eaeff1' }}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#00796b' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => window.history.back()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Harvest Product View
          </Typography>
          <IconButton color="inherit" onClick={() => window.location.href = '/home'}>
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => console.log('Logout')}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {harvest.produceName} Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography variant="h6">Farmer ID</Typography>
                <Typography>{harvest.farmerId}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography variant="h6">Location</Typography>
                <Typography>{harvest.location}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography variant="h6">Category</Typography>
                <Typography>{harvest.category}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography variant="h6">Produce Name</Typography>
                <Typography>{harvest.produceName}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography variant="h6">Variety</Typography>
                <Typography>{harvest.variety}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography variant="h6">Harvest Date</Typography>
                <Typography>{new Date(harvest.harvestDate).toLocaleDateString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography variant="h6">Harvest Time</Typography>
                <Typography>{harvest.harvestTime}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography variant="h6">Total Weight (Kg)</Typography>
                <Typography>{harvest.totalWeight}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography variant="h6">Number of Units</Typography>
                <Typography>{harvest.numberOfUnits}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography variant="h6">Special Handling Instructions</Typography>
                <Typography>{harvest.handlingInstructions}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography variant="h6">Pesticides Used</Typography>
                <Typography>{harvest.pesticidesUsed}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography variant="h6">Fertilizers Used</Typography>
                <Typography>{harvest.fertilizersUsed}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography variant="h6">Additional Notes</Typography>
                <Typography>{harvest.additionalNotes}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={() => setQrOpen(true)}>
            View QR code
          </Button>
        </Box>


        {/* QR Code Dialog */}
        <Dialog open={qrOpen} onClose={() => setQrOpen(false)}>
          <DialogTitle>QR Code</DialogTitle>
          <DialogContent>
            <DialogContentText>This is the QR code for the updated product.</DialogContentText>
            <img src={harvest.qrCode} alt="User QR Code" style={{ width: '100%', height: 'auto' }} />
            <Box textAlign="center">
              <a href={harvest.qrCode} download={`${harvest.name}_QRCode.png`}>
                <Button variant="contained" color="secondary">Download QR Code</Button>
              </a>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setQrOpen(false)} color="success">Close</Button>
          </DialogActions>
        </Dialog>

      </Container>
    </Box>
  );
};

export default HarvestProductView;
