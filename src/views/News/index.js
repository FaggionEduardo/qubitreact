import React, { useState } from 'react';
import Page from 'src/components/Page';
import { useMutation,useQuery, gql } from '@apollo/client';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
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
      [theme.breakpoints.down("md")]: {
        marginTop: 116,
      },
    },
    title:{
      textAlign:'center',
      fontSize:'2vw',
      margin:'5vh 0',
      [theme.breakpoints.down("sm")]: {
        fontSize:'5vw',
      },
    },
    news:{
      width:'60%',
      [theme.breakpoints.down("sm")]: {
        width:'100%',
      },
    },
    itemNews:{
      margin:'4% 0',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      display:'flex',
      flexDirection:'column',
      fontSize:'1vw',
      [theme.breakpoints.down("sm")]: {
        fontSize:'3vw',
      },
    },
    img:{
      marginTop:'2%',
      width:'50%',
      [theme.breakpoints.down("sm")]: {
        width:'100%',
      },
    },
    twitter:{
      width:'40%',
      padding:'0 5%',
      [theme.breakpoints.down("sm")]: {
        width:'100%',
      },
    },
    content:{
      display:'flex', 
      justifyContent:'space-between',
      [theme.breakpoints.down("sm")]: {
        flexDirection:'column'
      },

    }
  }));
  const NewsQuery = gql`
  query NewsQuery{
    news{
        id
        date
        text
        urlname
        url
        imagename
        image64
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
const NewsView = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(NewsQuery);
  return (
    
      <Page
        title="News"
        className={classes.root}
      >
        <Typography className={classes.title} variant="h1">News</Typography>
        <div className={classes.content}>
        <div className={classes.news}>
        {loading?"":<>
        {error? <>Error loading news</> 
        :
        <>
          <Divider/>
          {data.news.map((itemNews) => (
            <div key={itemNews.id}>
            <div className={classes.itemNews} >
              <div>
              <b>{addZeroes(new Date(parseInt(itemNews.date)).getUTCMonth()+1,2)+"."+addZeroes(new Date(parseInt(itemNews.date)).getUTCDate(),2)+"."+new Date(parseInt(itemNews.date)).getUTCFullYear()}</b> - {itemNews.text} 
            {itemNews.url?<> - <a href={itemNews.url}>{itemNews.urlname}</a></>:""}
            </div>
            {itemNews.image64?<img className={classes.img} src={itemNews.image64} alt={itemNews.imagename}/>:""}
            </div>
            <Divider/>
            </div>
          ))}
        </>
        }
        </>
        }
        
        </div>
        <div className={classes.twitter}>
        <TwitterTimelineEmbed
            sourceType="profile"
            screenName="qubit_ucla"
            options={{height: 500, width:'100%'}}
          />
        </div>
        </div>
    </Page>

  );
};

export default (NewsView);