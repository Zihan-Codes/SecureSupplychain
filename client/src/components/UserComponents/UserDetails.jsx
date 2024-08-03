import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Divider,
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDetails = ({ userId }) => {
  const [userData, setUserData] = useState({});
  const [qrOpen, setQrOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  // const debtLimit = userData.debtLimit.toString();


  const getUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/user-details/${userId}`);
      setUserData(response.data.user);
      console.log("userData");
      console.log(userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:4000/delete-user/${userId}`);
      console.log('User deleted successfully');
      setDeleteOpen(false);
      setDeleteSuccess(true);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = async () => {
    try {
      await axios.put(`http://localhost:4000/update-user/${userId}`, editedData);
      console.log('User updated successfully');
      setEditOpen(false);
      getUserData(); // Refresh the user data
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  };

  const handleCloseSnackbar = () => {
    setDeleteSuccess(false);
    navigate("/users");
  };

  if (userData.debtLimit == null){
    return <div>Loading...</div>;

  } else {
    return (
      <Container>
        <Card style={{ margin: '20px 0', padding: '20px', backgroundColor: '#f9f9f9' }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              User Details
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <Typography variant="subtitle1">Name:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={userData.name || ''}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}><Divider /></Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">User ID:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={userData._id || ''}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}><Divider /></Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Email:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={userData.email || ''}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}><Divider /></Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Address:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={userData.address || ''}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}><Divider /></Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">NIC:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={userData.nic || ''}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}><Divider /></Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Phone Number:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={userData.phone || ''}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Grid>
  
              <Grid item xs={12}><Divider /></Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Debt Limit:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={userData.debtLimit !== undefined ? `${userData.debtLimit.toString()} LKR` : ''}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Grid>
  
              <Grid item xs={12}><Divider /></Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Total Credits:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={userData.totalCredits !== undefined ? `${userData.totalCredits.toString()} LKR` : ''}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Grid>
  
              <Grid item xs={12}><Divider /></Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Total Debts:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={userData.totalDebts !== undefined ? `${userData.totalDebts.toString()} LKR` : ''}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Grid>
  
  
              <Grid item xs={12}><Divider /></Grid>
              <Grid item xs={12} container justifyContent="space-between">
                <Button variant="contained" color="success" onClick={() => setQrOpen(true)}>
                  View QR Code
                </Button>
                <Button variant="contained" color="error" onClick={() => setDeleteOpen(true)}>
                  Delete User
                </Button>
                <Button variant="contained" color="secondary" onClick={() => {
                  setEditedData(userData);
                  setEditOpen(true);
                }}>
                  Edit User
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
  
        {/* QR Code Dialog */}
        <Dialog open={qrOpen} onClose={() => setQrOpen(false)}>
          <DialogTitle>QR Code</DialogTitle>
          <DialogContent>
            <DialogContentText>This is the QR code for the user.</DialogContentText>
            <img src={userData.qrCode} alt="User QR Code" style={{ width: '100%', height: 'auto' }} />
            <Box textAlign="center">
              <a href={userData.qrCode} download={`${userData.name}_QRCode.png`}>
                <Button variant="contained" color="secondary">Download QR Code</Button>
              </a>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setQrOpen(false)} color="success">Close</Button>
          </DialogActions>
        </Dialog>
  
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this user? This action cannot be undone.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteOpen(false)} color="success">Cancel</Button>
            <Button onClick={handleDeleteUser} color="secondary">Delete</Button>
          </DialogActions>
        </Dialog>
  
        {/* Edit User Dialog */}
        <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              name="name"
              value={editedData.name || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              name="email"
              value={editedData.email || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Address"
              type="text"
              fullWidth
              name="address"
              value={editedData.address || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="NIC"
              type="text"
              fullWidth
              name="nic"
              value={editedData.nic || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Phone Number"
              type="text"
              fullWidth
              name="phone"
              value={editedData.phone || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Debt Limit"
              type="number"
              fullWidth
              name="debtLimit"
              value={editedData.debtLimit || userData.debtLimit.toString()}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditOpen(false)} color="success">Cancel</Button>
            <Button onClick={handleEditUser} color="success">Save</Button>
          </DialogActions>
        </Dialog>
  
        {/* Success Snackbar */}
        <Snackbar
          open={deleteSuccess}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            <strong>User deleted successfully!</strong>
          </Alert>
        </Snackbar>
      </Container>
    );
  }


  
};

export default UserDetails;
