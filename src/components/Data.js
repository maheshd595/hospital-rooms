import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import '../styles/Data.css';

const columns = [
  { field: 'room', headerName: 'Room', width: 120 },
  {
    field: 'location',
    headerName: 'Location',
    width: 120,
  },
  {
    field: 'start_date',
    headerName: 'Start Date',
    width: 100,
  },
  {
    field: 'end_date',
    headerName: 'End Date',
    width: 100,
  },
  {
    field: 'week',
    headerName: 'Week',
    width: 100,
  },
  {
    field: 'session',
    headerName: 'Session',
    width: 80,
  },
  {
    field: 'suite',
    headerName: 'Suite',
    width: 100,
  },
  {
    field: 'provider',
    headerName: 'Provider',
    width: 120,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
  },
];

function getData(data) {
  var count = 0;
  data.map((item) => {
    item['id'] = count;
    count++;
  });
  return data;
}

export default function Data(props) {
  const [tableData, setTableData] = React.useState([]);
  const { data } = props;
  React.useEffect(() => {
    const loadData = getData(data);
    setTableData(loadData);
  }, [data]);
  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <DataGrid
        className="common-border"
        rows={tableData}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}

Data.propTypes = {
  data: PropTypes.any,
};
