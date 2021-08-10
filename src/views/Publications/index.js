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
  Divider,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import PlusIcon from '@material-ui/icons/Add';
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
  publicationTitle: {
    fontSize: '1.2vw',
    margin: '1% 0',
    marginLeft: '2%',
    textAlign: 'left',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3vw',
      marginLeft: '4%'
    },
  },
  description: {
    fontSize: '1vw',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3vw',
    },
  },
  publications: {
    width: '80%',
    textAlign: 'center',
    marginBottom: '2%',
    [theme.breakpoints.down("sm")]: {
      width: '100%'
    },

  },
  itemPublications: {

    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1vw',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3vw',
    },
  },
  img: {
    width: '70%',
    margin: '2% 15%',
  },
  divLink: {
    margin: "1% 0"
  },
  link: {
    marginLeft: '20px'
  },
  details: {
    flexDirection: 'column',
  },
  accordion: {
    marginTop: '1%'
  }
}));
const PublicationQuery = gql`
  query PublicationQuery{
    publications{
        id
        title
        description
        linknames
        links
        imagename
        image64
    }
  }
`;
const PublicationsView = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(PublicationQuery);
  const publications = []
  if (!loading && !error) {
    for (var i = 0; i < data.publications.length; i++) {
      var obj = { linknames: data.publications[i].linknames, links: data.publications[i].links }
      var array = obj.linknames.split(',')
      var array2 = obj.links.split(',')
      for (var c = 0; c < array.length; c++) {
        array[c] = { key: c, name: array[c], link: array2[c] }
      }
      publications[i] = { ...data.publications[i], linkObj: array, key: data.publications.length - i }
    }
  }

  return (

    <Page
      title="Publications"
      className={classes.root}
    >
      <Typography className={classes.title} variant="h1">Publications
      <Divider style={{ width: '16%', marginTop: '1%', backgroundColor: '#ffb621' }} />
      </Typography>

      <div className={classes.publications}>
        <Divider />
        {loading ? "" : <>
          {error ? <>Error loading publications</>
            :
            <>
              {publications.length == 0 ?
                <Fade left>
                  <br />
                  <div>
                    <div className={classes.itemPublications} >
                      Sorry, there isn't content here yet.
                  </div>
                  </div>
                </Fade>
                : ""}
              {publications.map((itemPublications) => (
                <Fade key={itemPublications.id} left>
                  <div>
                    <div className={classes.itemPublications} >
                      <Accordion className={classes.accordion}>
                        <AccordionSummary
                          expandIcon={<PlusIcon />}

                        >
                          <span className={classes.publicationTitle} >{marked(itemPublications.key + '. ' + itemPublications.title)}</span>
                        </AccordionSummary>
                        <AccordionDetails className={classes.details}>
                          <img className={classes.img} src={itemPublications.image64} alt={itemPublications.imagename} />
                          <span className={classes.description}>{marked(itemPublications.description)}</span>
                          {itemPublications.linknames !== "" ?
                            <div className={classes.divLink}>
                              Links:
             {itemPublications.linkObj.map((item) => (
                              <a key={item.key} className={classes.link} href={item.link}>{item.name}</a>
                            ))}
                            </div>
                            : ""}
                        </AccordionDetails>
                      </Accordion>
                    </div>
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

export default (PublicationsView);