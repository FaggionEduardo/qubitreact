import React, { useState } from 'react';
import Page from 'src/components/Page';
import { useMutation, useQuery, gql } from '@apollo/client';
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
import Fade from 'react-reveal/Fade';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    marginTop: '10vw',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#263238',
    [theme.breakpoints.down("md")]: {
      marginTop: 116,
    },
  },
  title: {
    textAlign: 'center',
    fontSize: '2vw',
    margin: '5vh 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#005fb1',
    [theme.breakpoints.down("sm")]: {
      fontSize: '4.5vw',
    },
  },
  theses: {
    width: '80%',
    [theme.breakpoints.down("sm")]: {
      width: '100%',
    },
  },
  itemTheses: {
    margin: '4% 0',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1vw',
    marginLeft: '2%',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3vw',
      marginLeft: '4%',
    },
  },



}));
const TheseQuery = gql`
  query TheseQuery{
    theses{
        id
        title
        link
    }
  }
`;

const ThesesView = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(TheseQuery);
  const theses = []
  if (!loading && !error) {
    for (var i = 0; i < data.theses.length; i++) {

      theses[i] = { ...data.theses[i], key: data.theses.length - i }
    }
  }
  return (

    <Page
      title="Theses"
      className={classes.root}
    >
      <Typography className={classes.title} variant="h1">Theses
      <Divider style={{ width: '10%', marginTop: '1%', backgroundColor: '#ffb621' }} />
      </Typography>

      <div className={classes.theses}>
        {loading ? "" : <>
          {error ? <>Error loading theses</>
            :
            <>
              <Divider />
              {theses.length == 0 ?
                <Fade left>
                  
                    <div className={classes.itemTheses} >
                      Sorry, there isn't content here yet.
                  
                  </div>
                </Fade>
                : ""}
              {theses.map((itemTheses) => (
                <Fade key={itemTheses.id} left>
                  <div>
                    <div className={classes.itemTheses} >
                      {marked(itemTheses.key + ". " + itemTheses.title)}
                      <a href={itemTheses.link}>Link here!</a>
                    </div>
                    <Divider />
                  </div>
                </Fade>
              ))}
            </>
          }
        </>
        }

      </div>
    </Page>

  );
};

export default (ThesesView);