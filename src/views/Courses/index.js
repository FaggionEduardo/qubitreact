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
  courses: {
    width: '80%',
    [theme.breakpoints.down("sm")]: {
      width: '100%',
    },
  },
  itemCourses: {
    margin: '4% 0',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1vw',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3vw',
    },
  },
  titleCourses: {
    fontSize: '1.4vw',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3.5vw',
    },
  },
  descriptionCourses: {
    margin: '2% 0',
  },


}));
const CourseQuery = gql`
  query CourseQuery{
    courses{
        id
        title
        description
        cod
        period
        link
    }
  }
`;

const CoursesView = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(CourseQuery);
  return (

    <Page
      title="Courses"
      className={classes.root}
    >
      <Typography className={classes.title} variant="h1">
        Courses
        <Divider style={{ width: '12%', marginTop: '1%', backgroundColor: '#ffb621' }} />
      </Typography>

      <div className={classes.courses}>
        {loading ? "" : <>
          {error ? <>Error loading courses</>
            :
            <>
              <Divider />
              {data.courses.length == 0 ?
                <Fade left>
                  <div>
                    <div className={classes.itemCourses} >
                      Sorry, there isn't content here yet.
                  </div>
                  </div>
                </Fade>
                : ""}
              {data.courses.map((itemCourses) => (
                <Fade key={itemCourses.id} left>
                  <div>
                    <div className={classes.itemCourses} >
                      <b className={classes.titleCourses}>{itemCourses.title} - {itemCourses.cod} </b>
                      <span className={classes.descriptionCourses}>{marked(itemCourses.description)}</span>
                      <b>{itemCourses.period}</b>
                      {itemCourses.link ?
                        <a href={itemCourses.link}>Link here!</a>
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

export default (CoursesView);