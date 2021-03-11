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
    },
    title:{
      textAlign:'center',
      fontSize:'2vw',
      margin:'5vh 0',
      [theme.breakpoints.down("sm")]: {
        fontSize:'4vw',
      },
    },
    talks:{
        width:'80%',
        [theme.breakpoints.down("sm")]: {
          width:'100%',
        },
    },
    itemTalks:{
      margin:'4% 0',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize:'1vw',
      [theme.breakpoints.down("sm")]: {
        fontSize:'3vw',
      },
    },
    
    
    
  }));
  const UpcomingQuery = gql`
  query UpcomingQuery{
    upcomings{
        id
        date
        text
        link
    }
  }
`;
const addZeroes = (num, len) => {
  var numberWithZeroes = String(num);
  var counter = numberWithZeroes.length;
      
  while(counter < len) {
  
      numberWithZeroes = "0" + numberWithZeroes;
    
    counter++;
  
    }
  
  return numberWithZeroes;
}
const UpcomingsView = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(UpcomingQuery);
  return (
    
      <Page
        title="Upcomings Talks"
        className={classes.root}
      >
        <Typography className={classes.title} variant="h1">Upcoming talks and conference presentation</Typography>
    
        <div className={classes.talks}>
        {loading?"":<>
        {error? <>Error loading talks</> 
        :
        <>
          <Divider/>
          {data.upcomings.map((itemTalks) => (
            <div key={itemTalks.id}>
            <div className={classes.itemTalks} >
              <b>{addZeroes(new Date(parseInt(itemTalks.date)).getUTCMonth()+1,2)+"."+addZeroes(new Date(parseInt(itemTalks.date)).getUTCDate(),2)+"."+new Date(parseInt(itemTalks.date)).getUTCFullYear()}</b> - {itemTalks.text}  - <a href={itemTalks.link}>Link here!</a>
            </div>
            <Divider/>
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

export default (UpcomingsView);