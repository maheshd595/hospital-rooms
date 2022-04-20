import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import '../styles/Data.css';
import { Button } from '@mui/material';

export default function Data(props) {
  const [tableData, setTableData] = React.useState([]);
  const { data, openAssignProvider } = props;

  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  const columns = [
    { field: 'roomName', headerName: 'Room', width: 100 },
    { field: 'roomType', headerName: 'Room Type', width: 120 },
    { field: 'status', headerName: 'Room Status', width: 100 },
    {
      field: 'location',
      headerName: 'Location',
      width: 100,
    },
    {
      field: 'startDateStr',
      headerName: 'Start Date',
      width: 100,
    },
    {
      field: 'endDateStr',
      headerName: 'End Date',
      width: 100,
    },
    {
      field: 'session',
      headerName: 'Session',
      width: 80,
    },
    {
      field: 'provider',
      headerName: 'Provider',
      width: 150,
    },
    {
      field: 'action ',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              className={params.row.provider ? 'bookedRoom' : 'openRoom'}
              variant="action-button"
              onClick={() => openAssignProvider(params.row)}
              disabled={params.row.status === 'Deleted'}
            >
              {params.row.provider ? 'Edit' : 'Assign'}
            </Button>
          </>
        );
      },
    },
  ];

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
        disableColumnMenu="true"
      />
    </div>
  );
}

Data.propTypes = {
  data: PropTypes.any,
  openAssignProvider: PropTypes.func,
};
