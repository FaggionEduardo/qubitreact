import React, { useState } from 'react';
import Page from 'src/components/Page';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
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
import Fade from 'react-reveal/Fade';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
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
  },
  map: {
    height: '20vw',
    [theme.breakpoints.down("sm")]: {
      height: '40vw',
    },
  }
}));
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 34.06892233644397, lng: -118.44518052688879 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 34.06892233644397, lng: -118.44518052688879 }} />}
  </GoogleMap>
))

const ContactView = () => {
  const classes = useStyles();
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: 'c6a95cf520cc7f45e1f9ba5c9caf2b08',
    lat: '34.06892233644397',
    lon: '-118.44518052688879',
    lang: 'en',
    unit: 'imperial',
  });
  return (

    <Page
      title="Contacts & Visiting directions"
      className={classes.root}
    >
      <Typography className={classes.title} variant="h1">Contacts & Visiting directions
      <Divider style={{ width: '36%', marginTop: '1%', backgroundColor: '#ffb621' }} />
      </Typography>
      <Divider style={{ width: '100%' }} />

      <div className={classes.row}>
        <div className={classes.itemRow}>
          <Fade left>
            <div style={{ color: '#005fb1' }} className={classes.topic} >
              Visiting directions
      </div>
          </Fade>
          <Fade left>
            <div className={classes.topic} >
              UCLA Address
      </div>
          </Fade>
          <Fade left>
            <div className={classes.paragraph}>
              405 Hilgard Avenue<br />
            Los Angeles, CA, 90095<br />
            USA
      </div>
          </Fade>
          <Fade left>
            <div className={classes.paragraph}>
              <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcMBlR75RdAuvKIj_sevkbHrtlTx6zWMs"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div className={classes.map} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div>
          </Fade>
          <Fade left>
            <div className={classes.topic} >
              Campus Map
      </div>
          </Fade>
          <Fade left>
            <div className={classes.paragraph}>
              <a href="/static/CampusMap.pdf"><img src='/static/CampusMap.png' alt="campus map" style={{ width: '100%' }} /></a>
            </div>
          </Fade>
          <Fade left>
            <div className={classes.topic} >
              Weather at UCLA
      </div>
          </Fade>
          <Fade left>
            <div className={classes.paragraph}>
              <ReactWeather
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel="UCLA"
                unitsLabels={{ temperature: 'º', windSpeed: 'mph' }}
                showForecast={false}
                theme={{
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  gradientStart: '#0181C2',
                  gradientMid: '#04A7F9',
                  gradientEnd: '#4BC4F7',
                  locationFontColor: '#FFF',
                  todayTempFontColor: '#FFF',
                  todayDateFontColor: '#B5DEF4',
                  todayRangeFontColor: '#B5DEF4',
                  todayDescFontColor: '#B5DEF4',
                  todayInfoFontColor: '#B5DEF4',
                  todayIconColor: '#FFF',
                  forecastBackgroundColor: '#FFF',
                  forecastSeparatorColor: '#DDD',
                  forecastDateColor: '#777',
                  forecastDescColor: '#777',
                  forecastRangeColor: '#777',
                  forecastIconColor: '#4BC4F7',
                }}
              />
            </div>
          </Fade>
        </div>


        <div className={classes.itemRow}>
          <Fade left>
            <div style={{ color: '#005fb1' }} className={classes.topic} >
              Contacts
      </div>
          </Fade>
          <Fade left>
            <div className={classes.paragraph}>
              <b>Clarice D. Aiello (she/her)</b><br />
            Assistant Professor of Electrical and Computer Engineering<br />
             cla@ucla.edu<br />
            Twitter: <a href="https://twitter.com/ClariceDAiello">@ClariceDAiello</a><br />
            LinkedIn: <a href="https://www.linkedin.com/in/claricedaiello">@claricedaiello</a><br />
            </div>
          </Fade>
          <Fade left>
            <div className={classes.paragraph} >
              <br /><b>João Carlos Ribeiro-Silva (he/him)</b><br />
            Administrative Assistant<br />
            qubituclahelp@gmail.com<br />

            </div>
          </Fade>
        </div>

      </div>

    </Page >

  );
};

export default (ContactView);