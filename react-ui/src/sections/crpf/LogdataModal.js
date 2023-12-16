import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import axios from 'axios';
import { API_SERVER } from 'src/config/constant';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from '@mui/material/Switch';
import ThreatInspectModal from './ThreatInspectModel';


export default function LogdataModal(props) {
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`${API_SERVER}get_log_lines_by_device/${props.unitDeviceId}/`);

      if (response.status === 200) {
        setLogs(response.data);
        console.log(response.data)
      } else {
        toast.error('Error fetching logs. Please try again.', { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
      toast.error('Error fetching logs. Please try again.', { position: toast.POSITION.TOP_RIGHT });
    }
  };

  const handleInspect = (log) => {
    setSelectedLog(log);
  };

  return (
    <>
      <ToastContainer />

      <Button
        variant="contained"
        color="primary"
        startIcon={<DevicesOtherIcon />}
        onClick={() => {
          setOpen(true);
          fetchLogs(); // Fetch logs when the Devices button is clicked
        }}
      >
        View Device's Logs
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50vw',
            bgcolor: 'white',
            maxHeight: '80vh',
            overflow:'scroll',
            borderRadius: '8px',
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            p: 4,
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            Device Logs
          </Typography>
          <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Typography>
                      {log.content.length > 200 ? log.content.substring(0, 200) + "..." : log.content}
                    </Typography>
                  </TableCell>
                  <TableCell>{new Date(log.creation_time).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleInspect(log)}>
                      Inspect
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <ThreatInspectModal open={selectedLog !== null} onClose={handleClose} log={selectedLog} />
          </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>
  );
}
