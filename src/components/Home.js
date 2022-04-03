import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MultiSelect from './common/MultiSelect';
import Data from './Data';
import useWindowDimensions from './common/useWindowDimensions';
import Spinner from './common/DefaultSpinner';
const weeks = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const sessions = ['AM', 'NOON', 'EVENING'];
const locations = [
  { name: 'Location 1', value: 1 },
  { name: 'Location 2', value: 2 },
  { name: 'Location 3', value: 3 },
  { name: 'Location 4', value: 4 },
  { name: 'Location 5', value: 5 },
];
const rooms = [
  { name: 'Room 1', value: 1 },
  { name: 'Room 2', value: 2 },
  { name: 'Room 3', value: 3 },
  { name: 'Room 4', value: 4 },
  { name: 'Room 5', value: 5 },
];
const suites = [
  { name: 'suites 1', value: 1 },
  { name: 'suites 2', value: 2 },
  { name: 'suites 3', value: 3 },
  { name: 'suites 4', value: 4 },
  { name: 'suites 5', value: 5 },
];

const providers = [
  { name: 'Provider 1', value: 1 },
  { name: 'Provider 2', value: 2 },
  { name: 'Provider 3', value: 3 },
  { name: 'Provider 4', value: 4 },
  { name: 'Provider 5', value: 5 },
];
function Home() {
  const [sDate, setSDate] = useState();
  const [eDate, setEDate] = useState();
  const [sLocations, setSLocations] = useState([]);
  const [sRooms, setSRooms] = useState([]);
  const [sSuites, setSSuites] = useState([]);
  const [loadData, setLoad] = useState(false);

  const { height } = useWindowDimensions();
  const divHeight = height - 200;

  const handleLocation = (values) => {
    setSLocations(values);
  };

  const handleRooms = (values) => {
    setSRooms(values);
  };

  const handleSuites = (values) => {
    setSSuites(values);
  };

  const handleProviders = (values) => {
    setSSuites(values);
  };

  const handleSubmit = () => {
    setLoad(true);
  };

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
          <Typography variant="h6">Room Avalibility</Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12} mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} lg={3}>
              <Grid
                className="common-border"
                container
                spacing={2}
                style={{ paddingLeft: '0px' }}
              >
                <Grid
                  item
                  xs={12}
                  style={{ maxHeight: divHeight, overflow: 'auto' }}
                >
                  <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Start Date"
                          value={sDate}
                          onChange={(newValue) => {
                            setSDate(newValue);
                            setEDate(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              style={{ width: '95%', maxWidth: '350px' }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        style={{ width: '350px' }}
                      >
                        <DatePicker
                          label="End Date"
                          value={eDate}
                          onChange={(newValue) => {
                            setEDate(newValue);
                          }}
                          minDate={sDate}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              style={{ width: '95%', maxWidth: '350px' }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h7">Start Week</Typography>
                      <Box>
                        <FormGroup row>
                          {weeks.map((week) => (
                            <FormControlLabel
                              control={<Checkbox id={week} />}
                              label={week}
                            />
                          ))}
                        </FormGroup>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h7">Start Session</Typography>
                      <Box>
                        <FormGroup row>
                          {sessions.map((session) => (
                            <FormControlLabel
                              control={<Checkbox id={session} />}
                              label={session}
                            />
                          ))}
                        </FormGroup>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <MultiSelect
                        label="Location"
                        items={locations}
                        handleSelection={handleLocation}
                      ></MultiSelect>
                    </Grid>
                    <Grid item xs={12}>
                      <MultiSelect
                        label="Rooms"
                        items={rooms}
                        handleSelection={handleRooms}
                      ></MultiSelect>
                    </Grid>
                    <Grid item xs={12}>
                      <MultiSelect
                        label="Suites"
                        items={suites}
                        handleSelection={handleSuites}
                      ></MultiSelect>
                    </Grid>
                    <Grid item xs={12}>
                      <MultiSelect
                        label="Providers"
                        items={providers}
                        handleSelection={handleProviders}
                      ></MultiSelect>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  textAlign="center"
                  style={{ padding: '0px' }}
                >
                  <Button
                    variant="submit"
                    style={{ width: '100%', borderRadius: '0px' }}
                    onClick={handleSubmit}
                  >
                    SUBMIT
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={9}
              lg={9}
              style={{ paddingTop: '10px', minHeight: divHeight + 57 }}
            >
              <Grid container spacing={2} style={{ height: '100%' }}>
                <Grid item xs={12}>
                  {loadData ? <Data></Data> : <Spinner></Spinner>}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
