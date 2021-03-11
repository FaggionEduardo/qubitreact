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

const NewsDetails = ({ className, details,edit,set, ...rest }) => {
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
        image64:base64
      }
    )
   };
  const handleSubmit = (e) => {
    e.preventDefault()
    if(values.image64!==""){
    edit(values)
    }else{
    alert("Please provide the image")
    }
    
   };
  const addZeroes = (num, len) => {
    var numberWithZeroes = String(num);
    var counter = numberWithZeroes.length;
        
    while(counter < len) {
    
        numberWithZeroes = "0" + numberWithZeroes;
      
      counter++;
    
      }
    
    return numberWithZeroes;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="You can edit the news information."
          title="News"
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
                helperText="Enter the date of the news"
                name="date"
                type="date"
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
                label="Text"
                name="text"
                value={values.text}
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
                label="Link Name"
                name="urlname"
                value={values.urlname}
                onChange={handleChange}
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
                name="url"
                value={values.url}
                onChange={handleChange}
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
                label="Image Name"
                name="imagename"
                value={values.imagename}
                onChange={handleChange}
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
                Upload Image
                <input
                  type="file"
                  name="image64"
                  onChange={(val)=>handleImage(val)}
                  hidden
                  
                />
              </Button>
              <Typography
                color="textPrimary"
                variant="body1"
              >
              MAX SIZE:16MB
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



export default NewsDetails;
