import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MultiSelect from './common/MultiSelect';
import Data from './Data';
import useWindowDimensions from './common/useWindowDimensions';
import Spinner from './common/DefaultSpinner';
import { format } from 'date-fns';
const d_weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const d_sessions = ['AM', 'Noon', 'Evening'];
const d_locations = [
  { name: 'Loc1', value: 1 },
  { name: 'Loc2', value: 2 },
  { name: 'Loc3', value: 3 },
  { name: 'Loc4', value: 4 },
  { name: 'Loc5', value: 5 },
];
const d_rooms = [
  { name: 'Room1', value: 1 },
  { name: 'Room2', value: 2 },
  { name: 'Room3', value: 3 },
  { name: 'Room4', value: 4 },
  { name: 'Room5', value: 5 },
];
const d_suites = [
  { name: 'Suite1', value: 1 },
  { name: 'Suite2', value: 2 },
  { name: 'Suite3', value: 3 },
  { name: 'Suite4', value: 4 },
  { name: 'Suite5', value: 5 },
];

const d_providers = [
  { name: 'Provider1', value: 1 },
  { name: 'Provider2', value: 2 },
  { name: 'Provider3', value: 3 },
  { name: 'Provider4', value: 4 },
  { name: 'Provider5', value: 5 },
];
function Home() {
  const [sDate, setSDate] = useState();
  const [eDate, setEDate] = useState();
  const [weeks, setWeeks] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [locations, setLocations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [suites, setSuites] = useState([]);
  const [providers, setProviders] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loadData, setLoad] = useState(false);
  const cref = useRef();

  const { height } = useWindowDimensions();
  const divHeight = height - 175;

  React.useEffect(() => {
    handleSubmit();
  }, []);

  const handleWeeks = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setWeeks([...weeks, id]);
    } else {
      setWeeks(weeks.filter((item) => item !== id));
    }
  };

  const handleSession = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setSessions([...sessions, id]);
    } else {
      setSessions(sessions.filter((item) => item !== id));
    }
  };

  const handleLocation = (values) => {
    setLocations(values);
  };

  const handleRooms = (values) => {
    setRooms(values);
  };

  const handleSuites = (values) => {
    setSuites(values);
  };

  const handleProviders = (values) => {
    setProviders(values);
  };

  // const handleCancel = async () => {
  //   await cref.current.setFromOutside();
  //   await setSDate();
  //   await setEDate();
  //   await setWeeks([]);
  //   await setSessions([]);
  //   await setLocations([]);
  //   await setRooms([]);
  //   await setSuites([]);
  //   await setProviders([]);
  //   await handleSubmit();
  //   setLoad(false);
  //   const data = require('./data.json');
  //   setFilterData(data);
  //   setLoad(true);
  // };

  const handleSubmit = () => {
    const data = require('./data.json');
    const startDate = format(sDate ? sDate : new Date(), 'dd-MM-yyyy');
    const endDate = format(eDate ? eDate : new Date(), 'dd-MM-yyyy');
    const filterData = data.filter(function (item) {
      if (item.start_date < startDate || item.start_date > endDate) {
        return false;
      }

      if (item.end_date < startDate || item.end_date > endDate) {
        return false;
      }

      if (weeks && weeks.length > 0) {
        var exist = false;

        item.week.split(',')?.map((val) => {
          if (weeks.includes(val)) {
            exist = true;
            return;
          }
        });
        if (!exist) return false;
      }
      if (sessions && sessions.length > 0 && !sessions.includes(item.session)) {
        return false;
      }

      if (
        locations.length > 0 &&
        !locations.includes(
          d_locations.find((obj) => obj.name === item.location)?.value
        )
      ) {
        return false;
      }
      if (
        providers.length > 0 &&
        !providers.includes(
          d_providers.find((obj) => obj.name === item.provider)?.value
        )
      ) {
        return false;
      }
      if (
        suites.length > 0 &&
        !suites.includes(d_suites.find((obj) => obj.name === item.suite)?.value)
      ) {
        return false;
      }

      if (
        rooms.length > 0 &&
        !rooms.includes(d_rooms.find((obj) => obj.name === item.room)?.value)
      ) {
        return false;
      }
      return true;
    });
    setFilterData(filterData);
    setLoad(true);
  };

  return (
    <div style={{ margin: '0px 30px 10px 50px' }}>
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
          <Typography variant="h7">Room Avalibility</Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12} mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} lg={3}>
              <Grid
                className="common-border"
                container
                spacing={2}
                style={{ paddingLeft: '0px', fontSize: '12px' }}
              >
                <Grid
                  item
                  xs={12}
                  style={{ maxHeight: divHeight, overflow: 'auto' }}
                >
                  <Grid container spacing={0.5}>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Start Date"
                          value={sDate}
                          inputFormat="dd-MM-yyyy"
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
                          inputFormat="dd-MM-yyyy"
                          format="dd-MM-yyyy"
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
                      <Box style={{ paddingLeft: '5px' }}>
                        <FormGroup row>
                          {d_weeks.map((week) => (
                            <FormControlLabel
                              control={<Checkbox id={week} />}
                              label={week}
                              onClick={handleWeeks}
                              checked={weeks.some((item) => item === week)}
                            />
                          ))}
                        </FormGroup>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h7">Start Session</Typography>
                      <Box style={{ paddingLeft: '5px' }}>
                        <FormGroup row>
                          {d_sessions.map((session) => (
                            <FormControlLabel
                              control={<Checkbox id={session} />}
                              label={session}
                              onClick={handleSession}
                              checked={sessions.some(
                                (item) => item === session
                              )}
                            />
                          ))}
                        </FormGroup>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <MultiSelect
                        label="Location"
                        items={d_locations}
                        ref={cref}
                        handleSelection={handleLocation}
                      ></MultiSelect>
                    </Grid>
                    <Grid item xs={12}>
                      <MultiSelect
                        label="Rooms"
                        items={d_rooms}
                        handleSelection={handleRooms}
                      ></MultiSelect>
                    </Grid>
                    <Grid item xs={12}>
                      <MultiSelect
                        label="Suites"
                        items={d_suites}
                        handleSelection={handleSuites}
                      ></MultiSelect>
                    </Grid>
                    <Grid item xs={12}>
                      <MultiSelect
                        label="Providers"
                        items={d_providers}
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
              style={{
                paddingTop: '10px',
                minHeight: divHeight + 50,
                paddingLeft: '10px',
              }}
            >
              <Grid container spacing={0} style={{ height: '100%' }}>
                <Grid item xs={12}>
                  {loadData ? (
                    <Data data={filterData}></Data>
                  ) : (
                    <Spinner></Spinner>
                  )}
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
