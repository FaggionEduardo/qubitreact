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
  } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      margin:'5% 10%',
      width:'100%',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      textAlign:'center',
      [theme.breakpoints.down("sm")]: {
     
      },
    },
    title:{
      fontSize:'2vw',
      [theme.breakpoints.down("sm")]: {
        fontSize:'5vw',
      },
    },
    text:{
      fontSize:'1.5vw',
      marginTop:'4vh',
      [theme.breakpoints.down("sm")]: {
        fontSize:'3vw',
      },
    },
    sponsors:{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:'2%',
      [theme.breakpoints.down("sm")]: {
        flexDirection:'column',
        justifyContent:'center'
      },
    },
    sponsor:{
      width:'28%',
      [theme.breakpoints.down("sm")]: {
        width:'60%',
        marginTop:'8%'
      },
    }
  }));
const IntroductionView = () => {
  const classes = useStyles();
  return (
    
    <div className={classes.root}>
      <Typography className={classes.title} variant="h1">Sponsors & Industrial partiners</Typography>
      <div className={classes.sponsors}><img className={classes.sponsor} src="/static/liquid.png" alt="sponsor"/> <img className={classes.sponsor} src="/static/mpbc.png" alt="sponsor"/> <img className={classes.sponsor} src="/static/dora.png" alt="sponsor"/></div>
    </div>
  );
};

export default (IntroductionView);