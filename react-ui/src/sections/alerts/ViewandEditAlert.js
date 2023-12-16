import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { API_SERVER } from 'src/config/constant';
import { fetchPlaybooks } from 'src/utils/fetchPlaybooks';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import Grid from '@mui/material/Grid';


const ColorPicker = ({ value, onChange }) => (
  <TextField
    type="color"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    label="Color"
  />
);

export default function ViewandEditAlert(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [signature, setSignature] = useState('');
  const [score, setScore] = useState(0);
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#000000');
  const [ref_links, setRefLinks] = useState('');
  const [selectedPlaybooks, setSelectedPlaybooks] = useState([]);
  const [playbooks, setPlaybooks] = useState([]);

  const[alertData,setalertData] = useState([]);
  const[crpfunitData,setcrpfunitData] = useState([]);
  const[crpfdeviceData,setcrpfdeviceData] = useState([]);
  const[threatData,setthreatData] = useState([]);
  const[loglinedata,setloglinedata] = useState([]);
  const[usersdata,setusersdata] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <>
    <ToastContainer />

      <Button
        onClick={async () => {
            try {
              const [
                alertResponse,
                crpfUnitResponse,
                crpfDeviceResponse,
                ThreatResponse,
                LoglineResponse,
                UserDataResponse,
              ] = await Promise.all([
                axios.get(API_SERVER + `view_alert_by_id/${props.alert_id}`),
                axios.get(API_SERVER + `view_unit_by_id/${props.crpf_unit_id}`),
                axios.get(API_SERVER + `view_device_by_id/${props.crpf_device_id}`),
                axios.get(API_SERVER + `view_threat_by_id/${props.threat_signature_id}`),
                axios.get(API_SERVER + `view_log_line_by_id/${props.log_line}`),
                axios.get(API_SERVER+ `view_all_users`),
              ]);
        
              setalertData(alertResponse.data);
              console.log("Alert Data", alertData);
        
              // Uncomment the following lines if needed
              setcrpfunitData(crpfUnitResponse.data);
              console.log("Crpf Unit Data", crpfunitData);
        
              setcrpfdeviceData(crpfDeviceResponse.data);
              console.log("Crpf Device Data", crpfdeviceData);
        
              setthreatData(ThreatResponse.data);
              console.log("Threat Response", threatData);
        
              setloglinedata(LoglineResponse.data);
            
              setusersdata(UserDataResponse.data);


            } catch (error) {
              console.error("Error fetching data:", error);
            }
        
            setOpen(true);
          }}
      >
     <SettingsApplicationsSharpIcon sx={{ color: 'black' }}/>
      </Button>
      <Modal open={open} onClose={handleClose}>
      <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60vw',
            maxHeight: '80vh',
            overflow: 'scroll',
            bgcolor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            p: 4,
          }}
        >
          <div style={{ textAlign: 'center', margin: 'auto' }}>
          <Grid container spacing={2} justifyContent="center" alignItems="center" justifySelf="center">
            <Grid item xs={12}>
              <Typography variant="h6" component="div" gutterBottom>
                Alert Details
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Attack Performed: {threatData.name}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} style={{ textAlign: 'left',paddingLeft:"2rem"  }} >
              <Typography variant="h6" component="div" gutterBottom style={{ textAlign: 'center',padding: "1rem" }}>
                Affected Unit/Device Details
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
            Unit Name: {crpfunitData.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Unit Description: {crpfunitData.description}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Unit Location: {crpfunitData.location}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Unit Contact Info: {crpfunitData.contact}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Unit Latitude: {crpfunitData.latitude}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Unit Longitude: {crpfunitData.longitude}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Unit Mail Address: {crpfunitData.mail_address}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Device Name: {crpfdeviceData.device_name}
          </Typography> 
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Device Type: {crpfdeviceData.device_type}
          </Typography>
         
            </Grid>

            <Grid item xs={12} sm={6} justifyContent="center" alignItems="center">
              <Typography variant="h6" component="div" gutterBottom>
                Location
              </Typography>
              <img src={`http://localhost:8000/${crpfunitData.unit_image}`}
               alt="Unit Location"
               style={{ width: '20rem', height: 'auto', maxWidth: '100%' }}
              ></img>
            </Grid>

            {/* <Grid item xs={12}>
              <Typography variant="h6" component="div" gutterBottom>
                Log Details
              </Typography>
             <Typography variant="body1" color="text.secondary" gutterBottom>
            Log Content: {loglinedata.content}
          </Typography> 
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Log Created At: {loglinedata.creation_time}
          </Typography>
            </Grid> */}

            <Grid item xs={12} sm={6} style={{ textAlign: 'left',paddingLeft:"2rem" }}>
              <Typography variant="h6" component="div" gutterBottom style={{ textAlign: 'center',padding: "1rem" }}>
                Threat Signature Details
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
            Threat Name: {threatData.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Threat Description: {threatData.description}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Threat Signature: {threatData.signature}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Threat Score: {threatData.score}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Threat Reference Links: {threatData.ref_links}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            PlayBooks Related to the threat: {threatData.playbooks}
          </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <form onSubmit={handleSubmit}>
                <Typography variant="h6" component="div" gutterBottom padding={2}>
                  Update Alert Details
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} xl={6}>
                    <FormControl>
                      <FormLabel>Status</FormLabel>
                      <Select
                        label="Status"
                        value={alertData.status}
                        onChange={(e) => setDescription(e.target.value)}
                      >
                        <MenuItem value="Resolved">Resolved</MenuItem>
                        <MenuItem value="Unresolved">Unresolved</MenuItem>
                        <MenuItem value="Ignored">Ignored</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} xl={6}>
                  <FormControl fullWidth>
                  <FormLabel id="user-select-label">Select User</FormLabel>
                  <Select
                    labelId="user-select-label"
                    id="user-select"
                    // value={selectedUser}
                    // onChange={handleSelectChange}
                  >
                    {usersdata.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.username}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
          </div>
        </Box>
      </Modal>
    </>
  );
}
