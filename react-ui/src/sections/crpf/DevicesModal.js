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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';

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
      style={{ margin: '10px 0' }} // Add some margin to the button
    >
      View devices 
    </Button>

    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
      <DialogTitle>
        Devices
        <IconButton style={{ position: 'absolute', right: '8px', top: '8px' }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent style={{ maxHeight: '80vh', overflow: 'auto' }}> {/* Set the height and make it scrollable */}
          <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.id} >
                  <TableCell>Device ID: {device.id}</TableCell>
                  <TableCell>{device.device_name}</TableCell>
                  <TableCell>{device.device_type}</TableCell>
                  <TableCell>
                    <LogdataModal unitDeviceId={device.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
      </DialogContent>
    </Dialog>
  </>
);
}
