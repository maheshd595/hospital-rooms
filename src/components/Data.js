import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../styles/Data.css';

const columns = [
  { field: 'room', headerName: 'Room', width: 90 },
  {
    field: 'type',
    headerName: 'Type',
    width: 150,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 110,
  },
  {
    field: 'start_date',
    headerName: 'Start Date',
    width: 160,
  },
  {
    field: 'end_date',
    headerName: 'End Date',
    width: 160,
  },
  {
    field: 'session',
    headerName: 'Session',
    width: 100,
  },
  {
    field: 'sutie',
    headerName: 'Sutie',
    type: 'number',
    width: 110,
  },
  {
    field: 'provider',
    headerName: 'Provider',
    width: 160,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
  },
];

function getData() {
  const data = require('./data.json');
  var count = 0;
  data.map((item) => {
    item['id'] = count;
    count++;
  });
  return data;
}

export default function Data() {
  const data = getData();
  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <DataGrid
        className="common-border"
        rows={data}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}
