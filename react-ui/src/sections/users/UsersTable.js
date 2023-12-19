import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import EnvelopeIcon from '@heroicons/react/24/solid/EnvelopeIcon';
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import axios from 'axios';
import { SvgIcon } from '@mui/material'
import { useEffect } from 'react';
import { API_SERVER } from 'src/config/constant';
export const UsersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  
  // useEffect(() => {
  //   (async (id) => {
  //     try {
  //       const response = await axios.get(`http://localhost:8000/api/profile/${id}`);
  //       if(response.data.message!="User Id not Found"){
  //         const profilePicUrl = `http://localhost:8000${response.data.profile_pic}`; // Using 'profile_pic' property
  //         console.log(id,profilePicUrl.toString());
  //       }
  //     } catch (error) {
  //       console.error('Error fetching profile picture URL:', error);
  //     }
  //   })(someId); // Replace 'someId' with the actual id
  // }, []); // Add dependencies here if any
  

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
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Avatar
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Last Login
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((user) => {
                const isSelected = selected.includes(user.id);
                const lastLogin = user.last_login ? format(new Date(user.last_login), 'dd/MM/yyyy HH:mm:ss') : 'N/A';

                return (
                  <TableRow
                    hover
                    key={user.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(user.id);
                          } else {
                            onDeselectOne?.(user.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell onClick={() => window.location.href=`/users/${user.id}`} sx={{cursor:'pointer', color:'blue', fontWeight:'bold'}}>
                      {user.id}
                    </TableCell>
                    <TableCell>
                      {
                        user.profile_pic ? (
                          <Avatar src={`http://localhost:8000/${user.profile_pic}`}>
                            {getInitials(`${user.first_name} ${user.last_name}`)}
                          </Avatar>
                        ) : (
                          <Avatar>
                            {getInitials(`${user.first_name} ${user.last_name}`)}
                          </Avatar>
                        )
                      }
                      
                    </TableCell>
                    <TableCell>
                      {user.username}
                    </TableCell>
                    <TableCell>
                      {`${user.first_name} ${user.last_name}`}
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    
                    <TableCell>
                      {lastLogin}
                    </TableCell>

                    <TableCell>
                      {user.status ? (
                        <SvgIcon fontSize='small'>
                          <CheckCircleIcon color='green' />
                        </SvgIcon>
                      ) : (
                        <SvgIcon fontSize='small'>
                          <XCircleIcon color='gray' />
                        </SvgIcon>
                      )}
                    </TableCell>

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

UsersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
