import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from '../services/storageService';
import { useLocation, useNavigate } from 'react-router-dom';

const pages = [
  { name: 'Home', path: '/home' },
  { name: 'Assign Provider', path: '/assign' },
  { name: 'Load Data', path: '/data' },
];

const ResponsiveAppBar = () => {
  const history = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const isAuthenticated = getItemFromLocalStorage('user');

  React.useEffect(() => {}, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePath = (path) => {
    history(path);
  };

  const handleLogout = () => {
    setItemToLocalStorage('user', '');
    history('/login');
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#583095' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <LocalHospitalOutlinedIcon fontSize="large" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) =>
                isAuthenticated ? (
                  <MenuItem
                    key={page.name}
                    onClick={() => handlePath(page.path)}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ) : (
                  ''
                )
              )}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <LocalHospitalOutlinedIcon fontSize="large" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) =>
              isAuthenticated ? (
                <Button
                  key={page.name}
                  variant="menu"
                  onClick={() => handlePath(page.path)}
                  disabled={location.pathname === page.path}
                  sx={{ my: 1, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              ) : (
                ''
              )
            )}
          </Box>
          <Typography
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            style={{ fontSize: '1.1rem' }}
          >
            {isAuthenticated ? 'Hello, ' + isAuthenticated.username : ''}
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Button
              onClick={handleLogout}
              variant="outlined"
              color="white"
              style={{ float: 'right' }}
              endIcon={<ExitToAppIcon />}
            >
              {isAuthenticated ? 'Logout' : ''}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
