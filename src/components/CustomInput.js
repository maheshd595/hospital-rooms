import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PropTypes from "prop-types";

const CustomInput = ({ label, className, ...rest }) => {
  return (
    <Box className={className}>
      <Typography variant="h6">{label}</Typography>
      <TextField {...rest} variant="outlined" fullWidth />
    </Box>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string,
  className: PropTypes.object,
};
export default CustomInput;
