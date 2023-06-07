import PropTypes from 'prop-types';
// React
import { useState } from 'react';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';

// @mui
import { Button, ListItem, Box, List, Collapse } from '@mui/material';

// components
import Iconify from '../auxilary/Iconify';

// Styles
const ListItemStyle = {
  borderRadius: 1,
  color: 'neutral.900',
  justifyContent: 'flex-start',
  textAlign: 'left',
  pl: 3,
  textTransform: 'none',
  width: '100%',
  '& .MuiButton-startIcon': {
    color: 'neutral.900',
  },
  '&:hover': {
    backgroundColor: 'rgba(255,255,255, 0.38)',
  },
};

const ActiveListItemStyle = {
  backgroundColor: 'rgba(255,255,255, 0.58)',
  color: 'info.dark',
  fontWeight: 'fontWeightBold',
  '& .MuiButton-startIcon': {
    color: 'info.main',
  },
};

const ActiveChildStyle = {
  color: 'success.main',
  fontWeight: 'fontWeightBold',
};

export const NavItem = (props) => {
  const { pathname } = useLocation();

  const groupPath = pathname.split('/').slice(0, 2).join('/');

  const activeRoute = (path) => (path ? !!matchPath({ path, end: true }, pathname) : false);
  const groupRoute = (path) => (path ? !!matchPath({ path, end: true }, groupPath) : false);

  const { href, icon, title, subgroup, ...others } = props;
  const active = activeRoute(href);
  const isActiveGroup = groupRoute(href);

  console.log(groupPath, href, isActiveGroup);
  const [open, setOpen] = useState(isActiveGroup);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  if (subgroup) {
    return (
      <>
        <ListItem
          disableGutters
          sx={{
            display: 'flex',
            mb: 0.5,
            py: 0,
          }}
          {...others}
          onClick={handleOpen}
        >
          <Button
            startIcon={icon}
            endIcon={
              <Iconify
                icon={open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                sx={{ width: 24, height: 24 }}
              />
            }
            disableRipple
            sx={{
              ...ListItemStyle,
              ...(isActiveGroup && ActiveListItemStyle),
            }}
          >
            <Box sx={{ flexGrow: 1 }}>{title}</Box>
          </Button>
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subgroup.map((item) => {
              const { title, href, icon } = item;

              const childActive = activeRoute(href);

              return (
                <ListItem
                  key={title}
                  disableGutters
                  sx={{
                    mb: 0.5,
                    pl: 4,
                    py: 0,
                  }}
                  {...others}
                >
                  <Button
                    component={RouterLink}
                    to={href}
                    startIcon={icon}
                    disableRipple
                    sx={{
                      ...ListItemStyle,
                      ...(childActive && ActiveChildStyle),
                    }}
                  >
                    <Box>{title}</Box>
                  </Button>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
      }}
      {...others}
    >
      <Button
        component={RouterLink}
        to={href}
        startIcon={icon}
        disableRipple
        sx={{
          ...ListItemStyle,
          ...(active && ActiveListItemStyle),
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
  subgroup: PropTypes.array,
};
