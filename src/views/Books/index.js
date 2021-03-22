import React, { useState } from 'react';
import Page from 'src/components/Page';
import { useMutation,useQuery, gql } from '@apollo/client';
import marked from "../../utils/marked"
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
        fontSize:'4.5vw',
      },
    },
    books:{
        width:'80%',
        [theme.breakpoints.down("sm")]: {
          width:'100%',
        },
    },
    itemBooks:{
      margin:'4% 0',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize:'1vw',
      [theme.breakpoints.down("sm")]: {
        fontSize:'3vw',
      },
    },
    
    
    
  }));
  const BookQuery = gql`
  query BookQuery{
    books{
        id
        title
        link
    }
  }
`;

const BooksView = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(BookQuery);
  return (
    
      <Page
        title="Books"
        className={classes.root}
      >
        <Typography className={classes.title} variant="h1">Books</Typography>
    
        <div className={classes.books}>
        {loading?"":<>
        {error? <>Error loading books</> 
        :
        <>
          <Divider/>
          {data.books.map((itemBooks) => (
            <div key={itemBooks.id}>
            <div className={classes.itemBooks} >
             {marked(itemBooks.title)} 
             <a href={itemBooks.link}>Link here!</a>
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

export default (BooksView);