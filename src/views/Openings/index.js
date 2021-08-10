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
    color: '#263238',
    [theme.breakpoints.down("md")]: {
      marginTop: 116,
    },
  },
  title: {
    textAlign: 'center',
    fontSize: '2vw',
    margin: '5vh 0',
    color: '#005fb1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down("sm")]: {
      fontSize: '5vw',
    },
  },
  openings: {
    width: '80%',
    [theme.breakpoints.down("sm")]: {
      width: '100%',
    },
  },
  itemOpenings: {
    margin: '4% 0',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1vw',
    display: 'flex',
    flexDirection: 'column',
    wordWrap: 'break-word',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3vw',
    },
  },
  titleOpenings: {
    fontSize: '1.4vw',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3.5vw',
    },
  },
  descriptionOpenings: {
    margin: '2% 0',
  },


}));
const OpeningQuery = gql`
  query OpeningQuery{
    openings{
      id
      title
      link
      description
      minqualifications
      prefqualifications
    }
  }
`;

const OpeningsView = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(OpeningQuery);
  return (

    <Page
      title="Openings"
      className={classes.root}
    >
      <Typography className={classes.title} variant="h1">Openings
      <Divider style={{ width: '14%', marginTop: '1%', backgroundColor: '#ffb621' }} />
      </Typography>

      <div className={classes.openings}>
        {loading ? "" : <>
          {error ? <>Error loading openings</>
            :
            <>
              <Divider />
              {data.openings.length == 0 ?
                <Fade left>
                  <div>
                    <div className={classes.itemOpenings} >
                      Sorry, there isn't content here yet.
                  </div>
                  </div>
                </Fade>
                : ""}
              {data.openings.map((itemOpenings) => (
                <Fade key={itemOpenings.id} left>
                  <div>
                    <div className={classes.itemOpenings} >
                      <b className={classes.titleOpenings}>{itemOpenings.title} </b>
                      <div className={classes.descriptionOpenings}>{marked(itemOpenings.description)}</div>
                      <b className={classes.titleOpenings}>Minimum Qualifications </b>
                      <div className={classes.descriptionOpenings}>{marked(itemOpenings.minqualifications)}</div>
                      <b className={classes.titleOpenings}>Preferred Qualifications </b>
                      <div className={classes.descriptionOpenings}>{marked(itemOpenings.prefqualifications)}</div>
                      {itemOpenings.link ?
                        <a href={itemOpenings.link}>Link here!</a>
                        : ""}
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

export default (OpeningsView);