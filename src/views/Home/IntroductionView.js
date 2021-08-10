import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
  Divider
} from '@material-ui/core';
import Fade from 'react-reveal/Fade';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 25%',
    marginBottom: '8%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: '4%',
    zIndex: 10,
    [theme.breakpoints.down("sm")]: {
      margin: '0',
      marginBottom: "10%",
    },
  },
  img: {
    width: '40%',
    opacity: 0.15,
    marginTop: '5%',
    position: 'absolute',
    zIndex: 0,
    [theme.breakpoints.down("sm")]: {
      width: '90%',
      marginTop: '10%',
    },
  },
  title: {
    fontSize: '2vw',
    marginTop: '6%',
    paddingBottom: '1%',
    color: '#005fb1',
    [theme.breakpoints.down("sm")]: {
      fontSize: '5vw',
    },
  },
  text: {
    fontSize: '1.5vw',
    marginTop: '2%',
    color: '#263238',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3.4vw',
    },
  }
}));
const IntroductionView = () => {
  const classes = useStyles();
  return (

    <>
      <img alt="logo" src="/static/logo.png" className={classes.img} />
      <Fade left>
        <div className={classes.root}>
          <Typography className={classes.title} variant="h1">Welcome to QuBiT</Typography>
          <Divider style={{ width: '50%', backgroundColor: '#ffb621' }} />
          <Typography className={classes.text} variant="h4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rutrum dui tortor, nec imperdiet tortor tristique non. Nullam eget augue vel massa imperdiet consectetur. Mauris bibendum vulputate justo ut porttitor. Vivamus fringilla purus ac eros laoreet malesuada. Nam velit nulla, imperdiet in ligula eu, iaculis luctus sem. Phasellus id lobortis eros. Nunc ut volutpat odio. Proin posuere enim vel erat venenatis malesuada. Nullam leo libero, aliquet ut nisi et, pellentesque placerat erat. Curabitur iaculis sodales dolor, vel venenatis justo pretium eu. Donec rhoncus lorem placerat luctus imperdiet. Maecenas at mattis turpis, vitae blandit libero. Vivamus non purus sit amet lacus iaculis finibus quis id quam. Nam viverra, dui et hendrerit cursus, dui sapien tempus nunc, a congue arcu ante vitae elit. Maecenas varius velit neque. Integer lacinia pellentesque sem non tempus.</Typography>
        </div>
      </Fade>
    </>
  );
};

export default (IntroductionView);