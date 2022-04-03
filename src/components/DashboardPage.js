import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Grid } from '@mui/material';
import { getItemFromLocalStorage } from '../services/storageService.js';
import { ThemeProvider } from '@mui/material/styles';
import Reports from './Reports.js';
import Auth from './Auth.js';
import ProtectedRoute from './ProtectedRoute.js';
import CustomAppBar from './CustomAppBar.js';
import Home from './Home';
import theme from '../Theme/Theme.js';
import LoadData from './LoadData.js';

function DashboardPage() {
  React.useEffect(() => {}, []);

  const handleLogin = () => {};
  return (
    <ThemeProvider theme={theme}>
      <Grid container gap={1}>
        <Grid item xs={12}>
          <Routes>
            <Route path="/login" element={<Auth handleLogin={handleLogin} />} />
            <Route path="/" element={<Auth handleLogin={handleLogin} />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <CustomAppBar></CustomAppBar>
                  <Home></Home>
                </ProtectedRoute>
              }
            />
            <Route
              path="/assign"
              element={
                <ProtectedRoute>
                  <CustomAppBar></CustomAppBar>
                  <Reports></Reports>
                </ProtectedRoute>
              }
            />

            <Route
              path="/data"
              element={
                <ProtectedRoute>
                  <CustomAppBar></CustomAppBar>
                  <LoadData />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default DashboardPage;
