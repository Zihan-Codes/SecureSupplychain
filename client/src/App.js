import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Home from "./screens/Admin/Home";
import FarmerHomeScreen from "./screens/Farmer/FarmerHomeScreen";
import HarvestProductViewScreen from "./screens/Farmer/HarvestProductViewScreen";
import AdminHomeScreen from "./screens/Admin/AdminHomeScreen";
// import ThazzApp from "./screens/Thazz/ThazzApp"; // If needed

const theme = createTheme({
  palette: {
    // primary: {
    //   main: '#1976d2', 
    // },
    // secondary: {
    //   main: '#dc004e', 
    // },
    // error: {
    //   main: '#f44336', 
    // },
    // Add other colors as needed
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/farmer-home" element={<FarmerHomeScreen />} />
          <Route path="/harvest-product-view/:id" element={<HarvestProductViewScreen />} />
          <Route path="/admin-home" element={<AdminHomeScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
