import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Grid, Box, CssBaseline, Button } from "@mui/material";
import UserDetails from "../../components/UserComponents/UserDetails";
import UserCreditSummary from "../../components/UserComponents/UserCreditSummary";
import Header from "../../components/Header";

const UserView = () => {
  let { userId } = useParams();
  let navigate = useNavigate();

  const navigateToUserLogs = () => {
    navigate(`/user-logs/${userId}`);
  };

  const navigateToFinanceTransactionLogs = () => {
    navigate(`/finance-transaction-logs/${userId}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Header />
      <Container component="main" sx={{ mt: 8, mb: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ m: 1 }}
              onClick={navigateToUserLogs}
            >
              View User Logs
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
              onClick={navigateToFinanceTransactionLogs}
            >
              View Finance Transaction Logs
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <UserDetails userId={userId} />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserCreditSummary />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserView;
