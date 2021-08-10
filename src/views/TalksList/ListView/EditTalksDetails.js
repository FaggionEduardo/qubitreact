import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';



const useStyles = makeStyles(() => ({
  root: {}
}));

const TalkDetails = ({ className, details, edit, set, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState(details);
  useEffect(() => {


    setValues({
      ...values,
      year: addZeroes(values.year, 2)
    })
  }, []);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const addZeroes = (num, len) => {
    var numberWithZeroes = String(num);
    var counter = numberWithZeroes.length;

    while (counter < len) {

      numberWithZeroes = "0" + numberWithZeroes;

      counter++;

    }

    return numberWithZeroes;
  }

  return (
    <form
      onSubmit={() => edit(values)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="You can edit the talk information."
          title="Talk"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Year"
                helperText="Enter the year of the talk. Ex: 21"
                name="year"
                type="text"
                value={values.year}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Location"
                name="location"
                helperText="Ex: USA"
                value={values.location}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>





          </Grid>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Text"
                name="text"
                helperText="To style the text use **bold** or _italic_"
                onChange={handleChange}
                value={values.text}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Link"
                name="link"
                onChange={handleChange}

                value={values.link}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            style={{ marginRight: 10, backgroundColor: "#8B0000", color: '#fff' }}
            variant="contained"
            onClick={() => set(false)}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"

          >
            Edit
          </Button>
        </Box>
      </Card>
    </form>
  );
};



export default TalkDetails;
