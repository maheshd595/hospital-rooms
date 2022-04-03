import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import './App.css';
import DashboardPage from './components/DashboardPage';
import theme from './Theme/Theme.js';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container gap={1}>
        <Grid item xs={12} md={12} lg={12}>
          <DashboardPage />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
