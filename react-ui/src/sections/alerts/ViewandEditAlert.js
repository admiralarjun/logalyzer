import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { API_SERVER } from 'src/config/constant';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import Grid from '@mui/material/Grid';
export default function ViewandEditAlert(props) {
  const [open, setOpen] = useState(false);
  
  const [playbooks, setPlaybooks] = useState([]);

  const[alertData,setalertData] = useState([]);
  const[crpfunitData,setcrpfunitData] = useState([]);
  const[crpfdeviceData,setcrpfdeviceData] = useState([]);
  const[threatData,setthreatData] = useState([]);
  const[loglinedata,setloglinedata] = useState([]);
  const[usersdata,setusersdata] = useState([]);
  const [status, setStatus] = useState(props.alert_status);
  const [userid, setUserid] = useState(props.assignid);
  
  // setStatus(props.alert_status);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Status",status);
    console.log("Userid",userid);
    const url = `${API_SERVER}update_alert/${alertData.id}/`;

    const formData = {
      status: status,
      assignee: userid,
    }
    console.log(formData);

  try {
    const response = await axios.post(url, formData);
    console.log(response.data);
    setOpen(false);
    toast.success('Alert details updated successfully!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000, // Auto close the notification after 3000 milliseconds (3 seconds)
    });
  } catch (error) {
    console.error(error);
    setOpen(false);
    toast.error('Error updating alert details!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000, // Auto close the notification after 3000 milliseconds (3 seconds)
    });
  }
  };

  return (
    <>
      <ToastContainer
        />

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

              setStatus(props.alert_status);

              console.log("userid",userid);
              console.log("assigene id",props.assignid)
              console.log("status",status);


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
              <img src={`http://localhost:8000${crpfunitData.unit_image}`}
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
          <Typography  color="text.secondary" gutterBottom variant="button" >
            <a href={`/playbooks/${threatData.playbooks}`}>View playbook</a>
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
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
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
            Update
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
