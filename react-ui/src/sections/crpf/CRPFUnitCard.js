import PropTypes from 'prop-types';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon'
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography, Button } from '@mui/material';
import DevicesModal from './DevicesModal';

export const CRPFUnitCard = (props) => {
  const { unit } = props;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        cursor:'pointer',
        height: '100%'
      }}

    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          {/* Assuming you have a logo property in the new structure */}
          <Avatar
            src={unit.logo}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {/* Change to use the name property */}
          {unit.name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {/* Change to use the description property */}
          {unit.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <Button>
            <DevicesModal unitId = {unit.id}/>
          </Button>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <PhoneIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {/* Change to use the personnel or any other relevant property */}
            {unit.contact}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

CRPFUnitCard.propTypes = {
  unit: PropTypes.object.isRequired
};
