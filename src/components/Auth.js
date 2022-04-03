import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  Alert,
} from '@mui/material';
import CustomInput from './CustomInput';
import { setItemToLocalStorage } from '../services/storageService';
import PropTypes from 'prop-types';

const myDetails = {
  username: 'mahesh',
  password: 'mahesh',
  isAdmin: false,
};

export const Auth = (props) => {
  const { handleLogin } = props;
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  });
  const [isError, setError] = React.useState(false);

  const handleInputChange = (event) => {
    const newFormData = { ...formData };

    const name = event.target.name;
    const value = event.target.value;
    newFormData[name] = value;
    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isInvalidCredential =
      formData.username !== myDetails.username ||
      formData.password !== myDetails.password;
    if (isInvalidCredential) return setError(true);
    else {
      setItemToLocalStorage('user', myDetails);

      toast.success('Successfully logged In!');
      handleLogin();
      navigate('/home');
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      paddingTop={15}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        backgroundColor: '#583095',
      }}
    >
      <Card
        className="common-border"
        style={{ width: '32rem', height: 'fit-content' }}
        component="form"
        onSubmit={handleSubmit}
      >
        <CardHeader style={{ textAlign: 'center' }} title="Login" />
        {isError && <Alert severity="error">Invalid Username/Password</Alert>}
        <CardContent>
          <CustomInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <CustomInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            type="password"
          />
        </CardContent>
        <CardActions style={{ textAlign: 'center' }}>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <Button variant="submit" type="submit" color="darkGrey">
              Submit
            </Button>
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
};
Auth.propTypes = {
  handleLogin: PropTypes.func,
};
export default Auth;
