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
    margin: '3% 10%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    [theme.breakpoints.down("sm")]: {

    },
  },
  title: {
    fontSize: '2vw',
    paddingBottom: '1%',
    color: '#005fb1',
    [theme.breakpoints.down("sm")]: {
      fontSize: '5vw',
    },
  },

  sponsors: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column',
      justifyContent: 'center'
    },
  },
  sponsor: {
    width: '28%',
    [theme.breakpoints.down("sm")]: {
      width: '60%',
      marginTop: '8%'
    },
  }
}));
const IntroductionView = () => {
  const classes = useStyles();
  return (
    <Fade left>
      <div className={classes.root}>
        <Typography className={classes.title} variant="h1">Sponsors & Industrial partiners</Typography>
        <Divider style={{ width: '40%', backgroundColor: '#ffb621' }} />
        <div className={classes.sponsors}><img className={classes.sponsor} src="/static/liquid.png" alt="sponsor" /> <img className={classes.sponsor} src="/static/mpbc.png" alt="sponsor" /> <img className={classes.sponsor} src="/static/dora.png" alt="sponsor" /></div>
      </div>
    </Fade>
  );
};

export default (IntroductionView);