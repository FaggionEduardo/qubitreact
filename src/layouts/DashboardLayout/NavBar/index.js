import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faBook, faUsers, faUser, faNewspaper, faAddressCard, faSquareRootAlt, faBookOpen, faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../../providers/Auth'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';

import NavItem from './NavItem';




const items = [

  {
    href: '/admin/users',
    icon: () => <FontAwesomeIcon size="lg" icon={faUser} />,
    title: 'Users'
  },
  {
    href: '/admin/members',
    icon: () => <FontAwesomeIcon size="lg" icon={faUsers} />,
    title: 'Team Members'
  },
  {
    href: '/admin/courses',
    icon: () => <FontAwesomeIcon size="lg" icon={faGraduationCap} />,
    title: 'Courses'
  },
  {
    href: '/admin/news',
    icon: () => <FontAwesomeIcon size="lg" icon={faNewspaper} />,
    title: 'News'
  },
  {
    href: '/admin/medias',
    icon: () => <FontAwesomeIcon size="lg" icon={faNewspaper} />,
    title: 'Media attention'
  },
  {
    href: '/admin/talks',
    icon: () => <FontAwesomeIcon size="lg" icon={faCommentAlt} />,
    title: 'Talks'
  },
  {
    href: '/admin/upcomings',
    icon: () => <FontAwesomeIcon size="lg" icon={faCommentAlt} />,
    title: 'Upcoming Talks'
  },
  {
    href: '/admin/openings',
    icon: () => <FontAwesomeIcon size="lg" icon={faAddressCard} />,
    title: 'Openings'
  },
  {
    href: '/admin/projects',
    icon: () => <FontAwesomeIcon size="lg" icon={faSquareRootAlt} />,
    title: 'Projects'
  },
  {
    href: '/admin/publications',
    icon: () => <FontAwesomeIcon size="lg" icon={faBookOpen} />,
    title: 'Publications'
  },
  {
    href: '/admin/theses',
    icon: () => <FontAwesomeIcon size="lg" icon={faBookOpen} />,
    title: 'Theses'
  },
  {
    href: '/admin/books',
    icon: () => <FontAwesomeIcon size="lg" icon={faBook} />,
    title: 'Books'
  },




];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { auth } = useAuth()

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {"Welcome, " + auth.user.name}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />


    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
