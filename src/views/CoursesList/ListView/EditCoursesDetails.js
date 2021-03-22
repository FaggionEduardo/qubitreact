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
  TextareaAutosize
} from '@material-ui/core';



const useStyles = makeStyles(() => ({
  root: {},
  textarea:{
    fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize:'1rem',
    padding:'18.5px 14px',
    borderColor:" rgb(200, 200, 200)",
    borderRadius:4
  },
  label:{
    fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize:'1rem',
    margin:'0 14px',
    marginBottom:4,
    color:'#546e7a'
  },
  help:{
    fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize:'0.75rem',
    margin:'3px 14px',
    color:'#546e7a'
  }
}));

const CourseDetails = ({ className, details,edit,set, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState(details);
  
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  

  return (
    <form
      onSubmit={()=>edit(values)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="You can edit the course information."
          title="Course"
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
                helperText="Enter the title of the course"
                label="Title"
                name="title"
                onChange={handleChange}
                required
                value={values.title}
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
                label="Code"
                name="cod"
                onChange={handleChange}
                required
                value={values.cod}
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
              md={12}
              xs={12}
              style={{display:'flex',flexDirection:'column'}}
            >
              <label className={classes.label}>Description *</label>
              <TextareaAutosize
               rowsMin={6} 
               placeholder="Description *" 
               name="description"
               onChange={handleChange}
               required
               defaultValue={values.description}
               className={classes.textarea}
              />
              <span className={classes.help}>Formatting instructions:<br/> To style the text use **bold** or _italic_.<br/> To break line press enter twice. </span> 
              
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
                helperText="EX: Summer 2021"
                label="Period"
                name="period"
                onChange={handleChange}
                required
                value={values.period}
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
            Edit
          </Button>
        </Box>
      </Card>
    </form>
  );
};



export default CourseDetails;
