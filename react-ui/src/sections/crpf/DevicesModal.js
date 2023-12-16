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
import LogdataModal from './LogdataModal';

export default function ModernModalDialog(props) {
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchDevices = async () => {
    try {
      const response = await axios.get(API_SERVER + 'get_devices_by_unit/' + props.unitId + '/');
      if (response.status === 200) {
        setDevices(response.data);
      } else {
        toast.error('Error fetching devices. Please try again.', { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
      toast.error('Error fetching devices. Please try again.', { position: toast.POSITION.TOP_RIGHT });
    }
  };

  useEffect(() => {
    // Fetch devices on component mount or when unitId changes
    fetchDevices();
  }, [props.unitId]);

  return (
    <>
      <ToastContainer />

      <Button
        variant="contained"
        color="primary"
        startIcon={<DevicesOtherIcon />}
        onClick={() => {
          setOpen(true);
          fetchDevices(); // Fetch devices when the Devices button is clicked
        }}
      >
        View devices 
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50vw',
            maxWidth: '800px', // Set a maximum width for larger screens
            maxHeight: '80vh', // Set a maximum height for larger screens
            bgcolor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            p: 4,
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            Devices
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {devices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell>{device.id}</TableCell>
                    <TableCell>{device.device_name}</TableCell>
                    <TableCell>{device.device_type}</TableCell>
                    <TableCell>
                      <LogdataModal unitDeviceId={device.id} />
                    </TableCell>
                    {/* Add more columns based on your device object */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>
  );
}
