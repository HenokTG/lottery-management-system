import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Avatar, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ExtensionIcon from '@mui/icons-material/Extension';

// icons
import { ChartBar as ChartBarIcon } from '../../icons/chart-bar';
import { User as UserIcon } from '../../icons/user';
import { Users as UsersIcon } from '../../icons/users';
import { Report } from '../../icons/report';
import { ActivityLog as Log } from '../../icons/activity-log';
import { Cog as CogIcon } from '../../icons/cog';
// import { Logo } from '../auxilary/logo';
import { Download } from '../../icons/download';

// components
import { NavItem } from './nav-item';

const items = [
  {
    href: '/app/dashboard',
    icon: <ChartBarIcon fontSize="small" />,
    title: 'Dashboard',
  },
  {
    href: '/app/operators',
    icon: <UsersIcon fontSize="small" />,
    title: 'Operators',
  },
  {
    href: '/app/licence-catagories',
    icon: <EmojiEventsIcon fontSize="small" />,
    title: 'Licence Catagories',
  },
  {
    href: '/app/games',
    icon: <ExtensionIcon fontSize="small" />,
    title: 'Games',
  },
  {
    href: '/app/downloads',
    icon: <Download fontSize="small" />,
    title: 'Download Manager',
  },

  {
    href: '/app/report',
    icon: <Report fontSize="small" />,
    title: 'Report',
    children: [
      { href: '/app/report/revenue', title: 'Revenue' },
      { href: '/app/report/online-betting-transactions', title: 'Online Betting' },
      { href: '/app/report/offline-betting-transactions', title: 'Offline Betting' },
      {
        href: '/app/report/winning-ticket',
        title: 'Winning Ticket',
      },
      {
        href: '/app/report/operator-wallet',
        title: 'Operator Wallet',
      },
    ],
  },
  {
    href: '/app/payment-report',
    icon: <Report fontSize="small" />,
    title: 'Payment Report',
    children: [
      {
        href: '/app/payment-report/payment-distribution',
        title: 'Payment Distribution',
      },
      { href: '/app/payment-report/payment-transactions', title: 'Payment Transactions' },
      { href: '/app/payment-report/bonus-transactions', title: 'Bonus Transactions' },
    ],
  },
  {
    href: '/app/management',
    icon: <UserIcon fontSize="small" />,
    title: 'Management',
    children: [
      {
        href: '/app/management/role-management',
        title: 'Role Management',
      },
      {
        href: '/app/management/user-management',
        title: 'User Management',
      },
    ],
  },
  {
    href: '/app/app-settings',
    icon: <CogIcon fontSize="small" />,
    title: 'App Settings',
    children: [
      {
        href: '/app/app-settings/general',
        title: 'General',
      },
      {
        href: '/app/app-settings/system-modules',
        title: 'System Modules',
      },
      {
        href: '/app/app-settings/operator-apps',
        title: 'Operator Apps',
      },
      {
        href: '/app/app-settings/payment-method',
        title: 'Payment Methods',
      },
      {
        href: '/app/app-settings/currency',
        title: 'Currency Settings',
      },
      {
        href: '/app/app-settings/country-locations',
        title: 'Locations: Country',
      },
      {
        href: '/app/app-settings/regional-locations',
        title: 'Locations: Regions',
      },
      {
        href: '/app/app-settings/tax-rules',
        title: 'Tax Rules',
      },
    ],
  },

  {
    href: '/app/activity-logs',
    icon: <Log fontSize="small" />,
    title: 'Activity Logs',
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose, role, userProfile } = props;
  const router = { pathname: 'useRouter()' };

  const renderedNavs = role === 'admin' ? items : [0, 3, 4, 5, 6].map((x) => items[x]);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'auto',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '0.2em',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        <div>
          <Box sx={{ p: 3, backgroundColor: 'neutral.300' }}>
            <RouterLink to="/app/dashboard">
              <Avatar alt="Converx Technology" src="/static/convex.png" variant="rounded" sx={{ width: 200 }} />
            </RouterLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.14)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1,
              }}
            >
              <div>
                <Typography sx={{ color: 'primary.main' }} variant="subtitle1">
                  {`${userProfile.firstName} ${userProfile.lastName}`}
                </Typography>
                <Typography sx={{ color: 'primary.main' }} variant="caption">
                  User privilege : {role === 'admin' ? 'Admin' : 'Operator'}
                </Typography>
              </div>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {renderedNavs.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} subgroup={item.children} />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.300',
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.300',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  role: PropTypes.string,
  userProfile: PropTypes.object,
};
