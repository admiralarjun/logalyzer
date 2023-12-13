import PropTypes from 'prop-types';
import BellSnoozeIcon from '@heroicons/react/24/solid/BellSnoozeIcon'
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const OverviewThreatsIgnored = (props) => {
  const { value, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Threats ignored
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <BellSnoozeIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewThreatsIgnored.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};
