import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_SERVER } from 'src/config/constant';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

const ThreatsTable = (props) => {
  const {
    count = 0,
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const response = await axios.get(API_SERVER + 'viewallthreats');
        setThreats(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const selectedSome = selected.length > 0 && selected.length < threats.length;
  const selectedAll = threats.length > 0 && selected.length === threats.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Threat Name</TableCell>
                <TableCell>Threat Description</TableCell>
                <TableCell>Threat Pattern</TableCell>
                <TableCell>Threat Score</TableCell>
                <TableCell>Reference Links</TableCell>
                <TableCell>Creation Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {threats.map((threat) => {
                const isSelected = selected.includes(threat.id);

                return (
                  <TableRow hover key={threat.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(threat.id);
                          } else {
                            onDeselectOne?.(threat.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{threat.name}</TableCell>
                    <TableCell>{threat.description}</TableCell>
                    <TableCell>{threat.signature}</TableCell>
                    <TableCell>{threat.score}</TableCell>
                    <TableCell>{threat.ref_links}</TableCell>
                    <TableCell>{threat.creation_time}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ThreatsTable.propTypes = {
  count: PropTypes.number,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};

export default ThreatsTable;
