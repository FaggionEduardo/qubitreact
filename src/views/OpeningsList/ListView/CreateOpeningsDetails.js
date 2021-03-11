import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation,useQuery, gql } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Typography
} from '@material-ui/core';



const useStyles = makeStyles(() => ({
  root: {}
}));

const OpeningDetails = ({ className, create, set,...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState(
    {
      title:"",
      link:"",
      description:"",
      minqualifications:"",
      prefqualifications:""
      
    }
  );
  
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  

  return (
    <form
      onSubmit={()=>create(values)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="You can register information for a opening."
          title="Opening"
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
                helperText="Enter the title of the Opening"
                label="Title"
                name="title"
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
                label="Description"
                name="description"
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
                label="Minimum Qualifications"
                name="minqualifications"
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
                label="Preferred Qualifications"
                name="prefqualifications"
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
                label="Link"
                name="link"
                onChange={handleChange}
                required
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
            style={{marginRight:10,backgroundColor:"#8B0000",color:'#fff'}}
            variant="contained"
            onClick={()=>set(false)}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Register
          </Button>
        </Box>
      </Card>
    </form>
  );
};



export default OpeningDetails;
