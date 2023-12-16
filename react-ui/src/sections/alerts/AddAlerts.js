import { useState } from 'react';
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

// Placeholder for ColorPicker, replace with the official MUI ColorPicker if available
const ColorPicker = ({ value, onChange }) => (
  <TextField
    type="color"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    label="Color"
  />
);

export default function ModernModalDialog() {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState('#000000'); // Default color

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        New Alerts
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            p: 4,
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            Create Alerts
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Fill in the information of the Alerts.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required />
              </FormControl>
              <FormControl>
                <FormLabel>Signature</FormLabel>
                <Input required />
              </FormControl>
              <FormControl>
                <FormLabel>Score</FormLabel>
                <Input type="number" required />
              </FormControl>
              <FormControl>
                <FormLabel>Color</FormLabel>
                <ColorPicker value={color} onChange={setColor} />
              </FormControl>
              <FormControl>
                <FormLabel>Background Color</FormLabel>
                <ColorPicker value={color} onChange={setColor} />
              </FormControl>
              <FormControl>
                <FormLabel>Reference Link</FormLabel>
                <Input required />
              </FormControl>
              <FormControl>
                <FormLabel>Playbook</FormLabel>
                <Input required />
              </FormControl>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
}
