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
  projectTitle: {
    fontSize: '1.8vw',
    margin: '1% 0',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3.4vw',
    },
  },
  description: {
    fontSize: '1vw',
    wordWrap: 'break-word',
    textAlign: 'left',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3vw',
    },
  },
  projects: {
    width: '80%',
    textAlign: 'center',
    [theme.breakpoints.down("sm")]: {
      width: '100%'
    },

  },
  itemProjects: {
    margin: '4% 0',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1vw',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3vw',
    },
  },
  img: {
    width: '80%',
    margin: '2% 0',
  },
  divLink: {
    margin: "1% 0"
  },
  link: {
    marginLeft: '20px'
  },
  members: {
    display: 'flex',
    justifyContent: 'center',
    margin: '5% 0',
    flexWrap: 'wrap'
  },
  memberDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '15%',
    margin: '0 2.5%',
    [theme.breakpoints.down("sm")]: {
      width: '40%',
      margin: '0 5%',
    },
  },
  member: {
    height: '8vw',
    width: '8vw',
    [theme.breakpoints.down("sm")]: {
      height: '15vw',
      width: '15vw',
    },
  },
  memberName: {
    fontSize: '0.8vw',
    margin: '2% 0',
    [theme.breakpoints.down("sm")]: {
      fontSize: '2.5vw',
    },
  }



}));
const ProjectQuery = gql`
  query ProjectQuery{
    projects{
        id
        title
        description
        linknames
        links
        imagename
        image64
        members
    }
  }
`;
const MembersQuery = gql`
  query MembersQuery($id:ID!){
    member(id:$id) {      
        id
        name
        email
        acting
        profile64
    }
  }
`;
const ProjectsView = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(ProjectQuery);
  const projects = []
  if (!loading && !error) {
    for (var i = 0; i < data.projects.length; i++) {
      var obj = { linknames: data.projects[i].linknames, links: data.projects[i].links }
      var array = obj.linknames.split(',')
      var array2 = obj.links.split(',')
      for (var c = 0; c < array.length; c++) {
        array[c] = { key: c, name: array[c], link: array2[c] }
      }
      projects[i] = { ...data.projects[i], linkObj: array }
    }
  }

  return (

    <Page
      title="Projects"
      className={classes.root}
    >
      <Typography className={classes.title} variant="h1">Projects
      <Divider style={{ width: '12%', marginTop: '1%', backgroundColor: '#ffb621' }} />
      </Typography>
      <Fade left>
        <div className={classes.projects}>
          <Divider />

          {loading ? "" : <>
            {error ? <>Error loading projects</>
              :
              <>
                {projects.length == 0 ?
                  <Fade left>
                    <div>
                      <div className={classes.itemProjects} >
                        Sorry, there isn't content here yet.
                  </div>
                    </div>
                  </Fade>
                  : ""}
                {projects.map((itemProjects) => (
                  <Fade key={itemProjects.id} left>
                    <div>
                      <div className={classes.itemProjects} >
                        <Typography className={classes.projectTitle} variant="h1">{itemProjects.title}</Typography>
                        <img className={classes.img} src={itemProjects.image64} alt={itemProjects.imagename} />
                        <span className={classes.description}>{marked(itemProjects.description)}</span>
                        {itemProjects.linknames !== "" ?
                          <div className={classes.divLink}>
                            Links:
             {itemProjects.linkObj.map((item) => (
                            <a key={item.key} className={classes.link} href={item.link}>{item.name}</a>
                          ))}
                          </div>
                          : ""}
                        <div className={classes.members}>
                          {itemProjects.members.split(',').map(member => (
                            <Members key={member} id={member} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Fade>
                ))}
              </>
            }
          </>
          }

        </div>
      </Fade>
    </Page>

  );
};
const Members = ({ id }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(MembersQuery, {
    variables: { id: id },
  });
  return (
    <div className={classes.memberDiv}>
      <Avatar className={classes.member} src={loading ? '' : data.member.profile64} />
      <Typography className={classes.memberName} variant="body1">{loading ? '' : data.member.name}</Typography>
    </div>
  )
}
export default (ProjectsView);