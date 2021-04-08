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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    marginTop: '10vw',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down("md")]: {
      marginTop: 116,
    },
  },
  title: {
    textAlign: 'center',
    fontSize: '2vw',
    margin: '5vh 0',
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
      <Typography className={classes.title} variant="h1">Theses</Typography>

      <div className={classes.theses}>
        {loading ? "" : <>
          {error ? <>Error loading theses</>
            :
            <>
              <Divider />
              {theses.map((itemTheses) => (
                <div key={itemTheses.id}>
                  <div className={classes.itemTheses} >
                    {marked(itemTheses.key + ". " + itemTheses.title)}
                    <a href={itemTheses.link}>Link here!</a>
                  </div>
                  <Divider />
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

export default (ThesesView);