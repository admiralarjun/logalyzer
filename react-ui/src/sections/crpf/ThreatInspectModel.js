import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography, Table, TableBody, TableCell, TableRow, Stack, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { fetchPlaybookById } from 'src/utils/fetchPlaybooks';
import { useState, useEffect } from 'react';
import { fetchThreatsById } from 'src/utils/fetchThreats';
import ReactMarkdown from 'react-markdown';

// Define your styles
const dialogStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  border: '2px solid #000',
  backgroundColor: 'white',
  overflow: 'scroll',
  maxHeight: '80vh',
  boxShadow: 24,
  borderRadius: '20px',
  padding: '1rem',
};

const tableStyle = {
  width: '100%',
  marginTop: '16px',
};

function ThreatInspectModal({ open, onClose, log }) {

  const [Threat, setThreat] = useState()
  const [playBooks, setplayBooks] = useState([])

  useEffect(() => {

    if (log) {
      fetchThreatsById(log.threat)
        .then(data => {
          setThreat(data);
    
          // Fetch the first playbook after the threat data has been fetched
          return fetchPlaybookById(data.playbooks[0]);
        })
        .then(data => {
          setplayBooks(data);
        })
        .catch(error => {
          console.error('Error fetching threat or playbook', error);
        });
    }
  }, [log]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle>
        Log Details
        <IconButton style={{ position: 'absolute', right: '8px', top: '8px' }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
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
                  <Typography variant='h3'>Threat Info</Typography>
                  {Threat && (
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>{Threat.id}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>{Threat.name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell>{Threat.description}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Signature</TableCell>
                          <TableCell>{Threat.signature}</TableCell>
                        </TableRow>
                        <TableRow style={{ color: Threat.color }}>
                          <TableCell>Score</TableCell>
                          <TableCell>{Threat.score}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Reference Links</TableCell>
                          <TableCell>{Threat.ref_links}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Creation Time</TableCell>
                          <TableCell>{Threat.creation_time}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Playbooks</TableCell>
                          <TableCell>{Threat.playbooks.join(', ')}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='h3'>Playbook for {playBooks.name}</Typography>
                  <ReactMarkdown>{playBooks.content}</ReactMarkdown>
                </Grid>
              </Grid>
            </Stack>
          )}
      </DialogContent>
    </Dialog>
  );
}

export default ThreatInspectModal;