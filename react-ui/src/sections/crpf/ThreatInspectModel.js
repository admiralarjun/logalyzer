import React from 'react';
import Modal from '@mui/material/Modal';
import { Box, Typography, Table, TableBody, TableCell, TableRow, Stack, Grid } from '@mui/material';
import { fetchPlaybookById } from 'src/utils/fetchPlaybooks';
import { useState, useEffect } from 'react';
// Define your styles
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  border: '2px solid #000',
  backgroundColor: 'white',
  boxShadow: 24,
  borderRadius: '20px',
  padding: '1rem',
};

const tableStyle = {
  width: '100%',
  marginTop: '16px',
};

function ThreatInspectModal({ open, onClose, log }) {

  const [playbook, setPlaybook] = useState(null);

  useEffect(() => {
    if (log && log.playbook) {
      fetchPlaybookById(log.playbook)
        .then(data => {
          setPlaybook(data);
        })
        .catch(error => {
          console.error('Error fetching playbook', error);
        });
    }
  }, [log]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Log Details
        </Typography>
        {log && (
          <Stack spacing={2}>
            
            <Table sx={tableStyle}>
              <TableBody>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>{log.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Content</TableCell>
                  <TableCell>{log.content}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Creation Time</TableCell>
                  <TableCell>{new Date(log.creation_time).toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Threat</TableCell>
                  <TableCell>{log.threat}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CRPF Unit</TableCell>
                  <TableCell>{log.crpf_unit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CRPF Device</TableCell>
                  <TableCell>{log.crpf_device}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                Threat Info
              </Grid>
              <Grid item xs={6}>
                <Typography>Playbook</Typography>
                {playbook && (
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>{playbook.id}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>{playbook.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>{playbook.description}</TableCell>
                      </TableRow>
                      {/* Add other playbook info here */}
                    </TableBody>
                  </Table>
                )}
              </Grid>
            </Grid>
          </Stack>
        )}
      </Box>
    </Modal>
  );
}

export default ThreatInspectModal;