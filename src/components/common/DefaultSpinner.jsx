import React from 'react';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';

const commonStyle = makeStyles({
  loadingContainer: {
    display: 'grid',
    placeItems: 'center',
    marginTop: '10%',
  },
});

const Spinner = () => {
  const classes = commonStyle();
  return (
    <Box className={classes.loadingContainer}>
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
