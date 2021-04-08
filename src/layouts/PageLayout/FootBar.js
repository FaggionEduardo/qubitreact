import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Typography,
  MenuItem,
  Divider
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import ItemMenu from 'src/components/ItemMenu';
import ButtonMenu from 'src/components/ButtonMenu';
import { Facebook, Instagram, LinkedIn, YouTube } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    width: '100%',
    padding: '20px 0',
    marginTop: 4,
    boxShadow: "0 -3px 4px -2px rgb(0, 0, 0, 25%), 0 0px 1px 0px rgb(0, 0, 0, 31%)",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  item: {
    color: "#263238",
    padding: '0.5vw 0',
    fontSize: "1vw",
    [theme.breakpoints.down("md")]: {
      fontSize: "3vw",
      padding: '1vw 0',
    },
  },
  icon: {
    fontSize: "3vw",
    color: "#263238",
    margin: "2vw 3vw",
    cursor: "pointer",
    '&:hover': {
      color: "#0075bd"
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "8vw",
    },
  }


}));

const FootBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.item}>Stay connected with us:</Typography>
      <div style={{ display: 'flex' }}>
        <Facebook className={classes.icon} />
        <Instagram className={classes.icon} />
        <LinkedIn className={classes.icon} />
        <YouTube className={classes.icon} />
      </div>
    </div>
  );
};


export default FootBar;
