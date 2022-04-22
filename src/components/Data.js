import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import '../styles/Data.css';
import { Button } from '@mui/material';
import { getItemFromLocalStorage } from '../services/storageService';

export default function Data(props) {
  const [tableData, setTableData] = React.useState([]);
  const { data, openAssignProvider } = props;

  const loginUser = getItemFromLocalStorage('user');

  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  const columns = [
    { field: 'roomName', headerName: 'Room', minWidth: 100, flex: 1 },
    { field: 'roomType', headerName: 'Room Type', minWidth: 100, flex: 1 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'location',
      headerName: 'Location',
      minWidth: 100,
      flex: 1,
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
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'action ',
      headerName: 'Action',
      hide: loginUser?.userRole.role != 'ADMIN',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {loginUser?.userRole.role === 'ADMIN' ? (
              <Button
                className={params.row.provider ? 'bookedRoom' : 'openRoom'}
                variant="action-button"
                onClick={() => openAssignProvider(params.row)}
                disabled={params.row.status === 'Deleted'}
              >
                {params.row.provider ? 'Edit' : 'Assign'}
              </Button>
            ) : (
              ''
            )}
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
