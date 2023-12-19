// src/sections/alerts/AlertsTable.js
import {React , useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import {
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
import { Chip } from '@mui/material';
import { Avatar } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { getInitials } from 'src/utils/get-initials';
import { fetchPlaybooks } from 'src/utils/PlaybooksUtility'; // Replace with the actual path
import { SeverityPill } from 'src/components/severity-pill';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

const statusMap = {
  Rejected: 'error',
  WaitList: 'warning',
  Approved: 'success'
};

const PlaybooksTable = (props) => {

  const [playBooks, setPlayBooks] = useState([]);

  useEffect(() => {
    const fetchPlaybook = async () => {
      try {
          const playbookData = await fetchPlaybooks();
          setPlayBooks(playbookData);
          console.log(playBook);
      } catch (error) {
        console.error('Error fetching playbooks', error);
        // router.push('/404')
      }
    };

    fetchPlaybook();
  }, []); 

  const truncateContent = (content) => {
    const firstFullStopIndex = 50;
    return firstFullStopIndex !== -1
      ? content.substring(0, firstFullStopIndex + 1)
      : content;
  };

    // Function to format the creation time
    const formatCreationTime = (creationTime) => {
      const date = new Date(creationTime);
      return date.toLocaleString(); // Adjust the format as needed
    };
  

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                 S.NO
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Content
                </TableCell>
                <TableCell>
                  Creation Time
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  View
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playBooks.map((playbook) => (
                <TableRow
                  hover
                  key={playbook.id}
                >
                  
                  <TableCell padding="checkbox">{playbook.id}</TableCell>
                  <TableCell>{playbook.name}</TableCell>
                  <TableCell>
                   {truncateContent(playbook.content)}</TableCell>
                  <TableCell> {formatCreationTime(playbook.creation_time)}</TableCell>
                  <TableCell><SeverityPill color={statusMap[playbook.status]}>
                        {playbook.status}
                      </SeverityPill></TableCell>
                      <TableCell>
                      <VisibilityRoundedIcon onClick={() => window.location.href=`/playbooks/${playbook.id}`} />
                      </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {/* <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
};

export { PlaybooksTable };
