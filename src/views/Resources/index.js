import React, { useState } from 'react';
import Page from 'src/components/Page';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
  topic: {
    marginTop: '2%',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1.2vw',
    width: '100%',
    fontWeight: 600,
    color: '#005fb1',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3.2vw',
      marginTop: '5%',
    },
  },
  paragraph: {
    marginTop: '2%',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1vw',
    width: '100%',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3vw',
      marginTop: '5%',
    },
  },
  mainParagraph: {
    marginTop: '2%',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1.4vw',
    width: '100%',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3.4vw',
      marginTop: '5%',
    },
  },
  list: {
    marginTop: '2%',
    marginLeft: '3%',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1vw',
    width: '100%',
    [theme.breakpoints.down("sm")]: {
      fontSize: '2.4vw',
      marginTop: '6%',
      marginLeft: '6%',
    },
  },
  list2: {
    marginTop: '2%',
    marginLeft: '4%',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1vw',
    width: '100%',
    [theme.breakpoints.down("sm")]: {
      fontSize: '3vw',
      marginTop: '5%',
      marginLeft: '5%',
    },
  },
  row: {
    display: 'flex',
    width: '100%',
    marginTop: '2%',
    justifyContent: 'space-between',
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column'
    },
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'column',
    width: '48%',
    [theme.breakpoints.down("sm")]: {
      width: '100%',
    },
  }
}));
const MentalView = () => {
  const classes = useStyles();
  return (

    <Page
      title="Mental Health"
      className={classes.root}
    >
      <Typography className={classes.title} variant="h1">Mental Health
      <Divider style={{ width: '18%', marginTop: '1%', backgroundColor: '#ffb621' }} />
      </Typography>
      <Divider style={{ width: '100%' }} />
      <Fade left>
        <div className={classes.mainParagraph} >
          Counseling and Psychological Services (CAPS) supports your mental health needs as you pursue your academic goals. Their services are designed to foster the development of healthy well-being needs.
      </div>
      </Fade>
      <Fade left>
        <div className={classes.paragraph} >
          Counseling and Psychological Services (CAPS) is a multidisciplinary student mental health center for the UCLA campus. CAPS supports the academic and student development missions of the University and the Division of Student Affairs.
      </div>
      </Fade>
      <Fade left>
        <div className={classes.paragraph} >
          CAPS offers a variety of services to meet your needs including:
      </div>
      </Fade>
      <Fade left>
        <ul className={classes.list}>
          <li>Crisis counseling available by phone 24 hours a day/7 days a week</li>
          <li>Emergency intervention</li>
          <li>Individual counseling and psychotherapy</li>
          <li>Group therapy</li>
          <li>Psychiatric evaluation and treatment</li>
          <li>Psychoeducational programs and workshops for students, staff and faculty</li>
          <li>Campus mental health and wellness promotion</li>
        </ul>
      </Fade>
      <Fade left>
        <div className={classes.paragraph} >
          CAPS is committed to promoting inclusion and the affirmation of individual and cultural diversity. Our services and training foster the development of healthy behaviors necessary for success in a complex global environment.
      </div>
      </Fade>
      <Fade left>
        <div className={classes.row}>
          <div className={classes.itemRow}>
            <div className={classes.topic} >
              Scheduling
      </div>
            <div className={classes.paragraph} >
              Appointments: (310) 825-0768
      </div>
          </div>
          <div className={classes.itemRow}>
            <div className={classes.topic} >
              Hours
      </div>
            <div className={classes.paragraph} >
              <a href='https://www.counseling.ucla.edu/#main-content-home'>CAPS Hours in the Time of COVID-19</a>
            </div>
          </div>
        </div>
      </Fade>
      <Fade left>
        <div className={classes.row}>
          <div className={classes.itemRow}>
            <div className={classes.topic} >
              Location
      </div>
            <div className={classes.paragraph} >
              Counseling Center<br />
            John Wooden Center West<br />
            221 Westwood Plaza (Bruin Plaza), Los Angeles, CA 90095<br />
              <a href="https://www.google.com/maps/place/34%C2%B004'16.8'N+118%C2%B026'45.6'W/@34.0713251,-118.4465482,19z/"><img src='/static/counseling-map.jpg' alt='map' style={{ margin: '2% 0', width: '100%' }}></img></a><br />
            Parking Structure 4 (P4) is closest to CAPS. Enter from Sunset Blvd. onto Westwood Plaza which leads directly to the underground parking structure. Stop by the parking info booth to purchase a parking permit.<br />
              <br />
            To find CAPS: If you exit the parking structure by the soccer and intramural fields walk towards the fields, down a couple steps and take a left. The entrance to CAPS is the last set of doors before Bruin Walk. If you exit by the Wooden Center gym (i.e. you emerge from the parking structure and see the Bruin Bear to your left), turn right out of the doors and make another right onto Bruin Walk. The entrance to CAPS is directly across from the soccer and intramural fields.
          </div>
          </div>
          <div className={classes.itemRow}>
            <div className={classes.topic} >
              What to Bring
      </div>
            <ul className={classes.list2}>
              <li>BruinCard</li>
              <li>Arrive 15 minutes before your appointment time</li>
              <li>There is a $20 fee for missed appointments and late cancellation (less than 24 hours before appointment time)</li>
            </ul>
          </div>
        </div>
      </Fade>
      <Fade left>
        <div className={classes.row}>
          <div className={classes.itemRow}>
            <div className={classes.topic} >
              Fees
      </div>
            <div className={classes.paragraph} >
              Patients eligible to be seen are current students, past students of the most previous academic term, and other UC campus students.<br />
              <br />
              <Accordion style={{ borderTop: '1px solid rgb(0, 0, 0, 0.3)', boxShadow: 'none', backgroundColor: "#f4f6f8" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: '#005fb1' }} />}

                >
                  <span><b style={{ color: '#005fb1' }}>UCSHIP</b><br />Currently registered UCLA students</span>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <b>Visits</b><br />
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}><span>CAPS Visit</span><span>$0</span></div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion style={{ borderTop: '1px solid rgb(0, 0, 0, 0.3)', boxShadow: 'none', backgroundColor: "#f4f6f8" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: '#005fb1' }} />}
                >
                  <span><b style={{ color: '#005fb1' }}>Waived UCSHIP</b><br />Currently registered UCLA students who have waived UCSHIP</span>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <b>Visits</b><br />
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}><span>CAPS Visit</span><span>$15</span></div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion style={{ borderTop: '1px solid rgb(0, 0, 0, 0.3)', boxShadow: 'none', backgroundColor: "#f4f6f8" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: '#005fb1' }} />}

                >
                  <span><b style={{ color: '#005fb1' }}>BruinCare</b><br />Currently registered UCLA students who have waived UCSHIP and bought BruinCare to get unlimited access to core services during the academic year</span>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <b>Visits</b><br />
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}><span>CAPS Visit</span><span>$15</span></div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion style={{ borderTop: '1px solid rgb(0, 0, 0, 0.3)', borderBottom: '1px solid rgb(0, 0, 0, 0.3)', boxShadow: 'none', backgroundColor: "#f4f6f8" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: '#005fb1' }} />}

                >
                  <span><b style={{ color: '#005fb1' }}>Fee for Service</b><br />Students from other UC campuses or UCLA students who are not currently registered, such as during summer session or who were registered in a recent term</span>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <b>Visits</b><br />
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}><span>CAPS Visit</span><span>$50/$150</span></div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <div className={classes.itemRow}></div>
        </div>
      </Fade>
    </Page >

  );
};

export default (MentalView);