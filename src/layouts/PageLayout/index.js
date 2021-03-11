import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TopBar from './TopBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    justifyContent:'center',

  },

}));

const DashboardLayout = ({Children}) => {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <TopBar />
      <Children />
    </div>
  );
};

export default DashboardLayout;
