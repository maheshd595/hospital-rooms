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
import Data from './Data';
import useWindowDimensions from './common/useWindowDimensions';
import Spinner from './common/DefaultSpinner';
import AssignProviderDialog from './AssignProviderDialog';
import helpService from '../services/helpService';
import MultiselectDropDown from './common/MultiSelectDropDown';

const d_weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const d_sessions = ['AM', 'Noon', 'Evening'];

function Home() {
  const [dLocations, setDLocations] = useState([]);
  const [dRooms, setDRooms] = useState([]);
  const [dRoomStatus, setDRoomStatus] = useState([]);
  const [dRoomTypes, setDRoomTypes] = useState([]);
  const [dProviders, setDProviders] = useState([]);

  const [filters, setFilters] = useState({
    showByDay: false,
    startDate: null,
    endDate: null,
    weeks: [],
    sessions: [],
    roomStatus: [],
    roomTypes: [],
    locations: [],
    rooms: [],
    providers: [],
  });

  const [showByDay, setShowByDay] = useState(false);
  const [sDate, setSDate] = useState(null);
  const [eDate, setEDate] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [locations, setLocations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomStatus, setRoomStatus] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [providers, setProviders] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [open, setOpen] = useState(false);
  const [assignRow, setAssignRow] = useState();
  const [avilProviders, setAvilProviders] = useState([]);
  const [optLoading, setOptLoading] = useState(false);

  const { height } = useWindowDimensions();
  const divHeight = height - 175;

  React.useEffect(() => {
    handleSubmit();
    loadDropdownData();
  }, []);

  const loadDropdownData = async () => {
    setLoadData(false);
    const types = await helpService.getRoomTypes();
    setDRoomTypes(types);

    const status = await helpService.getRoomStatus();
    setDRoomStatus(status);

    const providers = await helpService.getAllProviders();
    setDProviders(providers);
    setLoadData(true);
  };

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

  const handleShowByDay = async (event) => {
    await setShowByDay(event.target.checked);
    const filterObj = {
      showByDay: event.target.checked,
      startDate: sDate,
      endDate: eDate,
      weeks: weeks,
      sessions: sessions,
      roomStatus: roomStatus,
      roomTypes: roomTypes,
      locations: locations,
      rooms: rooms,
      providers: providers,
    };
    await setFilters(filterObj);
    await setLoadData(false);
    const assignedRooms = await helpService.getAllAssignedRooms(filterObj);

    const data = await addDynamicId(assignedRooms);
    setFilterData(data);
    setLoadData(true);
  };

  const handleRoomStatus = (values) => {
    setRoomStatus(values);
  };

  const handleRoomTypes = (values) => {
    setRoomTypes(values);
  };

  const handleLocation = async (values) => {
    await setLocations(values);
    await updateRoomOnLocation(values);
  };

  const updateRoomOnLocation = async (values) => {
    if (!values) {
      return;
    }
    const filterRooms = [];
    const allRooms = [];
    console.log(' dLocations- ' + JSON.stringify(dLocations));
    dLocations.forEach((location) => {
      if (values.includes(location.value) && location.rooms.length > 0) {
        location.rooms.forEach((a) => {
          allRooms.push(a.value);
        });
      }
    });

    rooms.forEach((room) => {
      allRooms.forEach((all) => {
        if (all == room) {
          filterRooms.push(room);
        }
      });
    });

    setRooms(filterRooms);
    console.log('rooms: ' + dRooms);
  };

  const handleOpenLocation = async () => {
    setOptLoading(dLocations?.length > 0 ? false : true);
    const locs = await helpService.getLocations();
    await setOptLoading(false);
    await setDLocations(locs);
  };

  const handleRooms = (values) => {
    setRooms(values);
  };

  const handleOpenRooms = async () => {
    var locationIds = '';
    if (locations && locations != '') {
      locationIds = locations.join(',');
      const rooms = await helpService.getRoomsByLocationIds(locationIds);
      setDRooms(rooms);
    } else {
      const rooms = await helpService.getAllRooms();
      setDRooms(rooms);
    }
  };

  const handleByPrevent = () => {};

  const handleProviders = (values) => {
    setProviders(values);
  };

  const handleSubmit = async () => {
    const filterObj = {
      showByDay: showByDay,
      startDate: sDate,
      endDate: eDate,
      weeks: weeks,
      sessions: sessions,
      roomStatus: roomStatus,
      roomTypes: roomTypes,
      locations: locations,
      rooms: rooms,
      providers: providers,
    };
    await setFilters(filterObj);
    await setLoadData(false);
    const assignedRooms = await helpService.getAllAssignedRooms(filterObj);

    const data = await addDynamicId(assignedRooms);
    setFilterData(data);
    setLoadData(true);
  };

  function addDynamicId(dataArr) {
    var count = 1;

    if (dataArr?.length > 0) {
      dataArr.map(function (item) {
        item.id = count;

        count++;
      });
      return dataArr;
    }
    return [];
  }

  const openAssignProvider = async (row) => {
    await getAvilableProviders(row);
    setAssignRow(row);
    setOpen(true);
  };

  const getAvilableProviders = async (assignRow) => {
    if (assignRow) {
      console.log('aa' + JSON.stringify(assignRow));
      const data = await helpService.getAvilableProviders(assignRow);
      setAvilProviders(data);
    }
  };

  const assignProvider = async (provider, assignedRoom) => {
    assignedRoom.providerId = provider;
    await helpService.assignProviderToRoom(assignedRoom);
    setOpen(false);
    setLoadData(false);
    handleSubmit();
  };

  const handleClose = () => {
    setOpen(false);
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

          <span
            style={{ float: 'right', fontWeight: 400, fontSize: '12px' }}
            className="header-checkbox"
          >
            <FormControlLabel
              style={{ fontSize: '1.2rem !important' }}
              control={<Checkbox id="daywise" />}
              label="Show By Day"
              checked={showByDay}
              onClick={handleShowByDay}
            />
          </span>
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
                      <LocalizationProvider
                        className="date_Picker"
                        dateAdapter={AdapterDateFns}
                      >
                        <DatePicker
                          label="Start Date"
                          value={sDate}
                          inputFormat="MM-dd-yyyy"
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
                        className="date_Picker"
                      >
                        <DatePicker
                          label="End Date"
                          value={eDate}
                          inputFormat="MM-dd-yyyy"
                          onChange={(newValue) => {
                            setEDate(newValue);
                          }}
                          onError={() => {
                            setEDate(null);
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
                      <Typography variant="h7">Week:</Typography>
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
                      <Typography variant="h7">Session:</Typography>
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
                      <MultiselectDropDown
                        label="Room Status"
                        items={dRoomStatus}
                        selectedOpts={roomStatus}
                        handleSelection={handleRoomStatus}
                        handleOpenSelect={handleByPrevent}
                      ></MultiselectDropDown>
                    </Grid>
                    <Grid item xs={12}>
                      <MultiselectDropDown
                        label="Room Type"
                        items={dRoomTypes}
                        selectedOpts={roomTypes}
                        handleSelection={handleRoomTypes}
                        handleOpenSelect={handleByPrevent}
                      ></MultiselectDropDown>
                    </Grid>
                    <Grid item xs={12}>
                      <MultiselectDropDown
                        label="Location"
                        items={dLocations}
                        selectedOpts={locations}
                        handleSelection={handleLocation}
                        handleOpenSelect={handleOpenLocation}
                        loading={optLoading}
                      ></MultiselectDropDown>
                    </Grid>
                    <Grid item xs={12}>
                      <MultiselectDropDown
                        label="Rooms"
                        items={dRooms}
                        selectedOpts={rooms}
                        handleSelection={handleRooms}
                        handleOpenSelect={handleOpenRooms}
                      ></MultiselectDropDown>
                    </Grid>
                    <Grid item xs={12}>
                      <MultiselectDropDown
                        label="Providers"
                        items={dProviders}
                        selectedOpts={providers}
                        handleSelection={handleProviders}
                        handleOpenSelect={handleByPrevent}
                      ></MultiselectDropDown>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  textAlign="center"
                  style={{ padding: '0px', marginTop: '10px' }}
                >
                  <Button
                    variant="submit"
                    style={{ width: '100%', borderRadius: '0px' }}
                    onClick={handleSubmit}
                    disabled={!loadData || optLoading}
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
                paddingLeft: '8px',
              }}
            >
              <Grid container spacing={0} style={{ height: '100%' }}>
                <Grid item xs={12}>
                  {loadData ? (
                    <Data
                      data={filterData}
                      openAssignProvider={openAssignProvider}
                    ></Data>
                  ) : (
                    <Spinner></Spinner>
                  )}
                  <AssignProviderDialog
                    open={open}
                    handleClose={handleClose}
                    onAssign={assignProvider}
                    assignRow={assignRow}
                    items={avilProviders}
                  ></AssignProviderDialog>
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
