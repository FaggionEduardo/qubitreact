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
  talks: {
    width: '80%',
    [theme.breakpoints.down("sm")]: {
      width: '100%',
    },
  },
  itemTalks: {
    margin: '4% 0',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1vw',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3vw',
    },
  },



}));
const TalkQuery = gql`
  query TalkQuery{
    talks{
        id
        year
        location
        text
        link
    }
  }
`;
const addZeroes = (num, len) => {
  var numberWithZeroes = String(num);
  var counter = numberWithZeroes.length;

  while (counter < len) {

    numberWithZeroes = "0" + numberWithZeroes;

    counter++;

  }

  return numberWithZeroes;
}
const TalksView = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(TalkQuery);
  return (

    <Page
      title="Talks"
      className={classes.root}
    >
      <Typography className={classes.title} variant="h1">All talks and conference presentation
      <Divider style={{ width: '46%', marginTop: '1%', backgroundColor: '#ffb621' }} />
      </Typography>

      <div className={classes.talks}>
        {loading ? "" : <>
          {error ? <>Error loading talks</>
            :
            <>
              <Divider />
              {data.talks.length == 0 ?
                <Fade left>
                  <div>
                    <div className={classes.itemTalks} >
                      Sorry, there isn't content here yet.
                  </div>
                  </div>
                </Fade>
                : ""}
              {data.talks.map((itemTalks) => (
                <Fade key={itemTalks.id} left>
                  <div>
                    <div className={classes.itemTalks} >
                      <b>{itemTalks.location + " " + addZeroes(itemTalks.year, 2)}</b> {marked(itemTalks.text)}
                      {itemTalks.link ? <a href={itemTalks.link}>Link here!</a> : ""}
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

export default (TalksView);