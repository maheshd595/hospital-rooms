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
import helpService from '../services/helpService';

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

  const checkAuth = async (userName, password) => {
    const data = await helpService.auth(userName, password);
    return data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authUser = await checkAuth(formData.username, formData.password);

    if (authUser?.authenticated) {
      setItemToLocalStorage('user', authUser.user);

      toast.success('Successfully logged In!');
      handleLogin();
      navigate('/home');
    } else return setError(true);
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
