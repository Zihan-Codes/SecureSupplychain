import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Box,
  CircularProgress,
  Toolbar,
  AppBar,
  TablePagination
} from '@mui/material';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

const ContainerStyled = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const TableHeadStyled = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const TableHeadCellStyled = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const TableRowStyled = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const CircularProgressStyled = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const UserAuthLogsTable = ({ userId }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  // const { userId } = useParams();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/lg/user-logs/${userId}`);
        setLogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching logs:', error);
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <AppBarStyled position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBarStyled>
      <ContainerStyled>
        <Typography variant="h4" component="h1" gutterBottom>
          Logs
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgressStyled />
          </Box>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHeadStyled>
                  <TableRow>
                    <TableHeadCellStyled>Timestamp</TableHeadCellStyled>
                    <TableHeadCellStyled>Action Type</TableHeadCellStyled>
                    <TableHeadCellStyled>User ID</TableHeadCellStyled>
                    <TableHeadCellStyled>Details</TableHeadCellStyled>
                  </TableRow>
                </TableHeadStyled>
                <TableBody>
                  {logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((log) => (
                    <TableRowStyled key={log._id}>
                      <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{log.actionType}</TableCell>
                      <TableCell>{log.userID}</TableCell>
                      <TableCell>{log.details ? JSON.stringify(log.details) : 'N/A'}</TableCell>
                    </TableRowStyled>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={logs.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 8, 10, 25, 50]}
            />
          </>
        )}
      </ContainerStyled>
    </>
  );
};

export default UserAuthLogsTable;
