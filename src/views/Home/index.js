import React, { useState } from 'react';
import Page from 'src/components/Page';
import Introduction from "./IntroductionView"
import Sponsors from "./SponsorsView"
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

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      marginTop: '10vw',
      width:'80%',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      [theme.breakpoints.down("md")]: {
        marginTop: 116,
      },
    }
  }));
const HomeView = () => {
  const classes = useStyles();
  return (
    
      <Page
        title="Home"
        className={classes.root}
      >
        <Introduction/>
        <Divider style={{width:'100%'}}/>
        <Sponsors/>
    </Page>

  );
};

export default (HomeView);