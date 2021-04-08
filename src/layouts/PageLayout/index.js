import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TopBar from './TopBar';
import FootBar from './FootBar';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    justifyContent: 'center',

  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'auto',
    minHeight: '100vh'
  }

}));

const DashboardLayout = ({ Children }) => {
  const classes = useStyles();


  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <TopBar />
        <Children />

      </div>
      <FootBar />
    </div>
  );
};

export default DashboardLayout;
