import { Grid, Typography } from '@mui/material';
import React from 'react';

function Reports() {
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
          <Typography variant="h7">Assign Provider</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Reports;
