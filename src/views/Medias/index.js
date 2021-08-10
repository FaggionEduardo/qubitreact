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
  medias: {
    width: '80%',
    [theme.breakpoints.down("sm")]: {
      width: '100%',
    },
  },
  itemMedias: {
    margin: '4% 0',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1.5vw',
    marginLeft: '2%',
    color: "#005fb1",


    [theme.breakpoints.down("sm")]: {
      fontSize: '4vw',
      marginLeft: '4%',
    },
  },
  link: {
    '&:-webkit-any-link': {
      color: "#005fb1"
    },
    '&:hover': {
      color: "#ffb621"
    },
  }



}));
const MediaQuery = gql`
  query MediaQuery{
    medias{
        id
        title
        link
    }
  }
`;

const MediasView = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(MediaQuery);
  const medias = []

  return (

    <Page
      title="Media attention"
      className={classes.root}
    >
      <Typography className={classes.title} variant="h1">Media attention
      <Divider style={{ width: '10%', marginTop: '1%', backgroundColor: '#ffb621' }} />
      </Typography>

      <div className={classes.medias}>
        {loading ? "" : <>
          {error ? <>Error loading medias</>
            :
            <>
              <Divider />
              {data.medias.length == 0 ?
                <Fade left>
                  <div>
                    <div className={classes.itemMedias} >
                      Sorry, there isn't content here yet.
                  </div>
                  </div>
                </Fade>
                : ""}
              {data.medias.map((itemMedias) => (
                <Fade key={itemMedias.id} left>
                  <div >
                    <div className={classes.itemMedias} >

                      <a className={classes.link} href={itemMedias.link}>{marked(itemMedias.title)}</a>
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

export default (MediasView);