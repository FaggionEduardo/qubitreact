import React, { useState } from 'react';
import Page from 'src/components/Page';
import { useMutation, useQuery, gql } from '@apollo/client';
import ItemMenu from "../../components/ItemMenu2"
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
  Avatar
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
    fontSize: '2.5vw',
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
  members: {
    display: 'flex',
    width: '100%',
    position: 'relative',
    flexWrap: 'wrap',
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column'
    },
  },
  itemMembers: {
    margin: '4% 2.5%',
    width: '20%',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    [theme.breakpoints.down("sm")]: {
      margin: '10% 5%',
      width: '90%',
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
  name: {
    fontSize: '1.4vw',
    marginTop: '5%',
    [theme.breakpoints.down("sm")]: {
      fontSize: '5vw',
    },
  },
  acting: {
    fontSize: '1vw',
    color: 'grey',
    [theme.breakpoints.down("sm")]: {
      fontSize: '4vw',
    },
  },
  email: {
    fontSize: '1vw',
    color: 'grey',
    margin: '1% 0',
    [theme.breakpoints.down("sm")]: {
      fontSize: '4vw',
    },
  },
  infos: {
    fontSize: '0.9vw',
    margin: '1% 0',
    cursor: 'pointer',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3.5vw',
    },
  },
  formation: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '0.9vw',
    margin: '1% 0',
    cursor: 'pointer',
    display: 'flex',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3.5vw',
    },
  },
  links: {
    fontSize: '0.9vw',
    margin: '1% 0',
    cursor: 'pointer',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3.5vw',
    },
  },
  menu: {
    width: '15vw',
    [theme.breakpoints.down("sm")]: {
      width: '80vw',

    },
  },
  noContent: {
    width: '100%',
    textAlign: 'center',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1vw',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3vw',
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
        formation
        links 
        linknames
        profile64
    }
  }
`;



const MembersView = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(MemberQuery);
  const members = []
  if (!loading && !error) {
    for (var i = 0; i < data.members.length; i++) {
      var obj = { linknames: data.members[i].linknames, links: data.members[i].links }
      var array = obj.linknames.split(',')
      var array2 = obj.links.split(',')
      for (var c = 0; c < array.length; c++) {
        array[c] = { key: c, name: array[c], link: array2[c] }
      }
      members[i] = { ...data.members[i], linkObj: array }
    }
  }
  return (

    <Page
      title="Team"
      className={classes.root}
    >
      <Typography className={classes.title} variant="h1">Team
      <Divider style={{ width: '10%', marginTop: '1%', backgroundColor: '#ffb621' }} />
      </Typography>

      <div className={classes.members}>
        {loading ? "" : <>
          {error ? <>Error loading members</>
            :

            <>
              {members.length == 0 ?
                <Fade left>
                  
                    <div className={classes.noContent} >
                      Sorry, there isn't content here yet.
                  
                  </div>
                </Fade>
                : ""}
              {
                members.map((itemMembers) => (
                  <Fade key={itemMembers.id} left>
                    <div className={classes.itemMembers}  >
                      <Avatar alt={itemMembers.name} src={itemMembers.profile64} className={classes.avatar} />
                      <Typography className={classes.name} variant="h1">{itemMembers.name}</Typography>
                      <Typography className={classes.acting} variant="body1">{itemMembers.acting}</Typography>
                      <Typography className={classes.email} variant="body1">{itemMembers.email}</Typography>
                      {itemMembers.formation || itemMembers.links || itemMembers.linknames ?
                        <ItemMenu className={classes.infos} item='More Infos +'>
                          <div className={classes.menu}>
                            {itemMembers.formation ?
                              <span className={classes.formation} ><b>Formation:</b>{marked(itemMembers.formation)}</span>
                              : ""}
                            {itemMembers.links && itemMembers.linknames ?
                              <div className={classes.links}>
                                Links:
            {itemMembers.linkObj.map((item) => (
                                <a key={item.key} href={item.link}>{item.name}</a>
                              ))}
                              </div>
                              : ""}
                          </div>
                        </ItemMenu>
                        : ""}

                    </div>
                  </Fade>
                ))
              }
            </>
          }
        </>
        }

      </div>
    </Page>

  );
};

export default (MembersView);