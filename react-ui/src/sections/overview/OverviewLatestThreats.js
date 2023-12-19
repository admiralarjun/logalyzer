import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';
import { ThreatsTable } from '../threats/ThreatsTable';
import { API_SERVER } from 'src/config/constant';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const OverviewLatestThreats = () => {
  const [threats, setThreats] = useState([]);
  useEffect(() => {
  (async () => {
    try {
      const response = await axios.get(`${API_SERVER}view_all_threats/`);
      setThreats(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching threats:', error);
    }
  })();
}, []);

  return (
    <Card>
      <CardHeader title="Latest threats" />
      <List>
        {threats.map((threat, index) => {
          const hasDivider = index < threats.length - 1;
          const ago = (threat.creation_time);
          return (
            <ListItem
              divider={hasDivider}
              key={threat.id}
            >
              <ListItemAvatar>
                {threat.score ? (
                  <Box
                    component="div"  // Use a div element
                    sx={{
                      borderRadius: 1,
                      height: 32,  // Adjust the height as needed
                      width: 32,   // Adjust the width as needed
                      backgroundColor: threat.bgcolor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',  // You may need to adjust text color based on background
                      fontWeight: 'bold',
                    }}
                  >
                    {threat.score}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      borderRadius: 1,
                      backgroundColor: 'neutral.200',
                      height: 48,
                      width: 48,
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={threat.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Updated ${ago} ago`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}