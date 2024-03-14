import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import BuildingOffice2Icon from '@heroicons/react/24/solid/BuildingOffice2Icon'
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import ShieldExclamationIcon from '@heroicons/react/24/solid/ShieldExclamationIcon'
import BellAlertIcon from '@heroicons/react/24/solid/BellAlertIcon'
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import ExclamationCircleIcon from '@heroicons/react/24/solid/ExclamationCircleIcon';
import { SvgIcon } from '@mui/material';
import PlayIcon from '@heroicons/react/24/solid/PlayIcon'
export const items = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Threats',
    path: '/threats',
    icon: (
      <SvgIcon fontSize="small">
        <ShieldExclamationIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Alerts',
    path: '/alerts',
    icon: (
      <SvgIcon fontSize="small">
        <BellAlertIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Incidents',
    path: '/incidents',
    icon: (
      <SvgIcon fontSize="small">
        <ExclamationCircleIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Users',
    path: '/users',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'CRPF Units & Devices',
    path: '/cuds',
    icon: (
      <SvgIcon fontSize="small">
        <BuildingOffice2Icon />
      </SvgIcon>
    )
  },
  {
    title: 'Playbooks',
    path: '/playbooks',
    icon: (
      <SvgIcon fontSize="small">
        <PlayIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Login',
    path: '/auth/login',
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Register',
    path: '/auth/register',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Error',
    path: '/404',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    )
  }
];
