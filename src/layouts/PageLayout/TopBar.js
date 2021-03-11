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
const useStyles = makeStyles((theme) => ({
  root: {
      backgroundColor:'white',
      position:'fixed',
    [theme.breakpoints.down("md")]: {
      position:'absolute'
    },
  },
  item:{
    color:"#263238",
    cursor:"pointer",
    padding:'0 15px',
    '&:hover': { 
      color:"#0075bd"
    }
  },
  menuItem:{
    color:"#263238",
    cursor:"pointer",
    '&:hover': { 
      color:"#0075bd"
    }
  },
  toolbar:{
    backgroundColor:'white',
    padding:"1% 0",
    display:'flex',
    justifyContent:'center',
    [theme.breakpoints.down("md")]: {
      justifyContent:'space-between',
      padding:"5px 10%"
    },
  },
  logo: {
    width: '15%',
    marginRight:'2%',
    [theme.breakpoints.down("md")]: {
      width:200,
    },
  },
  itemsDesktop:{
    display:'flex',
    [theme.breakpoints.down("md")]: {
      display: "none"
    },
  }
}));

const TopBar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root}>
     <Toolbar className={classes.toolbar}>
       <img className={classes.logo} alt="Logo" src="/static/totalLogo.png"/>
       <div className={classes.itemsDesktop}>
       <Link to="/"><Typography className={classes.item}>Home</Typography></Link>
       <ItemMenu className={classes.item} item={<span style={{display:'flex'}}>News & Talks<FontAwesomeIcon style={{marginLeft:2}} icon={faSortDown}/></span>}>
       <div>
       <Link to="/news"><MenuItem className={classes.menuItem}>News</MenuItem></Link>
        <Divider/>
       <Link to="/upcomings"><MenuItem className={classes.menuItem}>Upcoming talks and conference presentation</MenuItem></Link>
        <Divider/>
       <Link to="/talks"><MenuItem className={classes.menuItem}>All talks and conference presentation</MenuItem></Link>
        <Divider/>
        <MenuItem className={classes.menuItem}>Media attention</MenuItem>
       </div>
       </ItemMenu>
       <Link to="/team"><Typography className={classes.item}>Team</Typography></Link>
       <ItemMenu className={classes.item} item={<span style={{display:'flex'}}>Research<FontAwesomeIcon style={{marginLeft:2}} icon={faSortDown}/></span>}>
       <div>
        <MenuItem className={classes.menuItem}>Projects</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Publications</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Theses</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Books</MenuItem>
       </div>
       </ItemMenu>
       <Link to="/admin"><Typography className={classes.item}>Courses</Typography></Link>
       <Link to="/admin"><Typography className={classes.item}>Outreach</Typography></Link>
       <ItemMenu className={classes.item} item={<span style={{display:'flex'}}>Core group values<FontAwesomeIcon style={{marginLeft:2}} icon={faSortDown}/></span>}>
       <div>
        <MenuItem className={classes.menuItem}>Group constituition</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Diversity</MenuItem>
       </div>
       </ItemMenu>
       <ItemMenu className={classes.item} item={<span style={{display:'flex'}}>Resources<FontAwesomeIcon style={{marginLeft:2}} icon={faSortDown}/></span>}>
       <div>
        <MenuItem className={classes.menuItem}>Resources for mental health</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Group YouTube channel</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Mentoring</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Women in STEM</MenuItem>
       </div>
       </ItemMenu>
       <ItemMenu className={classes.item} item={<span style={{display:'flex'}}>Contact<FontAwesomeIcon style={{marginLeft:2}} icon={faSortDown}/></span>}>
       <div>
        <MenuItem className={classes.menuItem}>Contacts</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Requests for recommendation letters</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Openings</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Visiting directions</MenuItem>
       </div>
       </ItemMenu>
       </div>
       <ButtonMenu>
       <Link to="/">
       <MenuItem>
       <Typography className={classes.item}>Home</Typography>
       </MenuItem>
       </Link>
       <Divider/>
       <MenuItem>
       <ItemMenu className={classes.item} item={<span style={{display:'flex'}}>News & Talks<FontAwesomeIcon style={{marginLeft:2}} icon={faSortDown}/></span>}>
       <div>
       <Link to="/news"><MenuItem className={classes.menuItem}>News</MenuItem></Link>
        <Divider/>
        <Link to="/upcomings"><MenuItem className={classes.menuItem}>Upcoming talks and conference presentation</MenuItem></Link>
        <Divider/>
        <Link to="/talks"><MenuItem className={classes.menuItem}>All talks and conference presentation</MenuItem></Link>
        <Divider/>
        <MenuItem className={classes.menuItem}>Media attention</MenuItem>
       </div>
       </ItemMenu>
       </MenuItem>
       <Divider/>
       <MenuItem>
       <Link to="/team"><Typography className={classes.item}>Team</Typography></Link>
       </MenuItem>
       <Divider/>
       <MenuItem>
       <ItemMenu className={classes.item} item={<span style={{display:'flex'}}>Research<FontAwesomeIcon style={{marginLeft:2}} icon={faSortDown}/></span>}>
       <div>
        <MenuItem className={classes.menuItem}>Projects</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Publications</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Theses</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Books</MenuItem>
       </div>
       </ItemMenu>
       </MenuItem>
       <Divider/>
       <MenuItem>
       <Link to="/admin"><Typography className={classes.item}>Courses</Typography></Link>
       </MenuItem>
       <Divider/>
       <MenuItem>
       <Link to="/admin"><Typography className={classes.item}>Outreach</Typography></Link>
       </MenuItem>
       <Divider/>
       <MenuItem>
       <ItemMenu className={classes.item} item={<span style={{display:'flex'}}>Core group values<FontAwesomeIcon style={{marginLeft:2}} icon={faSortDown}/></span>}>
       <div>
        <MenuItem className={classes.menuItem}>Group constituition</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Diversity</MenuItem>
       </div>
       </ItemMenu>
       </MenuItem>
       <Divider/>
       <MenuItem>
       <ItemMenu className={classes.item} item={<span style={{display:'flex'}}>Resources<FontAwesomeIcon style={{marginLeft:2}} icon={faSortDown}/></span>}>
       <div>
        <MenuItem className={classes.menuItem}>Resources for mental health</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Group YouTube channel</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Mentoring</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Women in STEM</MenuItem>
       </div>
       </ItemMenu>
       </MenuItem>
       <Divider/>
       <MenuItem>
       <ItemMenu className={classes.item} item={<span style={{display:'flex'}}>Contact<FontAwesomeIcon style={{marginLeft:2}} icon={faSortDown}/></span>}>
       <div>
        <MenuItem className={classes.menuItem}>Contacts</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Requests for recommendation letters</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Openings</MenuItem>
        <Divider/>
        <MenuItem className={classes.menuItem}>Visiting directions</MenuItem>
       </div>
       </ItemMenu>
       </MenuItem>
       </ButtonMenu>
     </Toolbar>
    </AppBar>
  );
};


export default TopBar;
