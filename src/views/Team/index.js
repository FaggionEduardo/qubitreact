import React, { useState } from 'react';
import Page from 'src/components/Page';
import { useMutation,useQuery, gql } from '@apollo/client';

import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
    makeStyles, 
    Divider,
    Avatar
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
    },
    title:{
      textAlign:'center',
      fontSize:'2.5vw',
      margin:'5vh 0',
      [theme.breakpoints.down("sm")]: {
        fontSize:'8vw',
      },
    },
    members:{
        display:'flex',
        width:'100%',
        position:'relative',
        flexWrap: 'wrap',
        [theme.breakpoints.down("sm")]: {
          flexDirection:'column'
        },
    },
    itemMembers:{
      margin:'4% 2.5%',
      width:'20%',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      textAlign:'center',
      [theme.breakpoints.down("sm")]: {
        margin:'10% 5%',
        width:'90%',
      },
      
    },
    avatar: {
      width: '15vw',
      height: '15vw',
      [theme.breakpoints.down("sm")]: {
        width: '60vw',
        height: '60vw',
      },
    },
    name:{
      fontSize:'1.4vw',
      marginTop:'5%',
      [theme.breakpoints.down("sm")]: {
        fontSize:'5vw',
      },
    },
    acting:{
      fontSize:'1vw',
      color:'grey',
      [theme.breakpoints.down("sm")]: {
        fontSize:'4vw',
      },
    },
    email:{
      fontSize:'1vw',
      color:'grey',
      margin:'1% 0',
      [theme.breakpoints.down("sm")]: {
        fontSize:'4vw',
      },
    }
    
    
    
  }));
  const MemberQuery = gql`
  query MemberQuery{
    members{
        id
        name
        email
        acting
        profile64
    }
  }
`;

  

const MembersView = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(MemberQuery);
  return (
    
      <Page
        title="Team"
        className={classes.root}
      >
        <Typography className={classes.title} variant="h1">Team</Typography>
    
        <div className={classes.members}>
        {loading?"":<>
        {error? <>Error loading members</> 
        :
        <>
          
          {data.members.map((itemMembers) => (
            
            <div className={classes.itemMembers} key={itemMembers.id} >
            <Avatar alt={itemMembers.name} src={itemMembers.profile64 }className={classes.avatar} />
            <Typography className={classes.name} variant="h1">{itemMembers.name}</Typography>
            <Typography className={classes.acting} variant="body1">{itemMembers.acting}</Typography>
            <Typography className={classes.email} variant="body1">{itemMembers.email}</Typography>
             
            </div>
    
          ))}
        </>
        }
        </>
        }
        
        </div>        
    </Page>

  );
};

export default (MembersView);