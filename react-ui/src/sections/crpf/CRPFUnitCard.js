import PropTypes from 'prop-types';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon'
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';

export const CRPFUnitCard = (props) => {
  const { unit } = props;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
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
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {/* You might want to use a property like lastUpdated */}
            Updated 2hr ago
          </Typography>
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
