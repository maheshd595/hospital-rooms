import { createTheme } from '@mui/material/styles';

const { palette } = createTheme();
const { augmentColor } = palette;
const commonColor = '#583095';

const createColor = (color) => augmentColor({ color: { main: color } });
const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: [
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(', '),
  },
  palette: {
    darkGrey: createColor('#474c55'),
    white: createColor('#fff'),
    // teal: createColor("#20c997"),
    cyan: createColor('#17a2b8'),
  },

  components: {
    MuiCheckbox: {
      colorSecondary: {
        '&$checked': {
          color: commonColor,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
      variants: [
        {
          props: { variant: 'submit' },
          style: {
            fontSize: '1.2rem',
            color: 'white',
            margin: 0,
            backgroundColor: '#583095',
            '&:hover': {
              backgroundColor: '#44296e',
              color: 'white',
            },
            '&:disabled': {
              color: '#00000042',
              fontSize: '1.2rem',
              backgroundColor: '#0000001f',
            },
          },
        },
        {
          props: { variant: 'menu' },
          style: {
            fontSize: '0.9rem',
            color: 'white',
            margin: 0,
            backgroundColor: '#583095',
            '&:hover': {
              backgroundColor: '#583095',
              color: 'white',
            },
            '&:disabled': {
              fontSize: '0.9rem',
              color: '#583095',
              backgroundColor: 'white',
            },
          },
        },
      ],
    },
    MuiTableCell: {
      head: {
        backgroundColor: 'red !important',
      },
    },
  },
});

export default theme;
