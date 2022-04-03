import { Grid, Typography } from '@mui/material';
import React from 'react';

function LoadData() {
  return (
    <div style={{ margin: '0px 50px' }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          mt={2}
          style={{ padding: '5px' }}
          className="page-header"
          textAlign="center"
        >
          <Typography variant="h6">Load Data</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoadData;
