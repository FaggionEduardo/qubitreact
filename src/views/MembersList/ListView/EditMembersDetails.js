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

const MemberDetails = ({ className, details,edit,set, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState(details);
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const  handleImage = async (event) => {
    var base64=await toBase64(event.target.files?.[0])
    setValues(
      {
        ...values,
        profile64:base64
      }
    )
   };
   const handleSubmit = (e) => {
    e.preventDefault()
    if(values.profile64!==""){
    edit(values)
    }else{
    alert("Please provide the profile image")
    }
    
   };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="You can edit the member information."
          title="Member"
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
                helperText="Enter the name of the member"
                label="Name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
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
                label="Email"
                name="email"
                type="email"
                onChange={handleChange}
                required
                value={values.email}
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
                label="Acting"
                name="acting"
                onChange={handleChange}
                required
                value={values.acting}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
             
              <Button
                variant="contained"
                component="label"
              >
                Upload Profile Image
                <input
                  type="file"
                  name="profile64"
                  onChange={(val)=>handleImage(val)}
                  hidden
                  
                />
              </Button>
              <Typography
                color="textPrimary"
                variant="body1"
              >
                Please provide in square format. Ex: 100 x 100; 50 x 50. MAX SIZE:16MB
              </Typography>
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



export default MemberDetails;
