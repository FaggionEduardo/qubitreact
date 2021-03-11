import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation,useQuery, gql } from '@apollo/client';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from '@material-ui/core/ListItemText';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const PublicationDetails = ({ className, create, set,...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState(
    {
      title:"",
      description:"",
      linknames:"",
      links:"",
      imagename:"",
      image64:"",
    }
  );
  const [linksNumber, setLinksNumber] = useState(0)
  const [render, setRender] = useState(0)
  const [links, setLinks] = useState(
    {
      linknames:"",
      links:"",
      
    }
  );
  
  const [linksArray, setLinksArray] = useState([]);

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
  const handleChangeLink = (event) => {
    setLinks({
      ...links,
      [event.target.name]: event.target.value
    });
  };
  const handleAddLink = () => {
    var key=linksNumber+1
    var obj=links
    obj.key=linksNumber
    var array=linksArray
    if(array.indexOf(obj)==-1){
      obj.key=key
      array.push(obj)
      setLinksNumber(key)
      setLinksArray(array)
    }  
  };


  const handleRemoveLink = (key) => {
    var array=linksArray
    for(let c=0;c<array.length;c++){
      if(array[c].key==key){
        array.splice(c, 1);
      }
    }
    setLinksArray(array)
    setRender(render+1)
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
  const  handleSubmit = async (e) => {
      e.preventDefault()
      if(values.image64!==""){
      var links=[]
      var linknames=[]
      linksArray.map(link=>{
        links.push(link.links)
        linknames.push(link.linknames)
      })
      var req=values
      req.links=links.toString()
      req.linknames=linknames.toString()
      create(req)
    
    }else{
      alert("Please upload the image")
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
          subheader="You can register information for a publication."
          title="Publication"
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
                helperText="Enter the title of the publication"
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
                label="Image Name"
                name="imagename"
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
                name="linknames"
                onChange={handleChangeLink}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={5}
              xs={12}
            >
              <TextField
                fullWidth
                label="Link"
                name="links"
                onChange={handleChangeLink}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={1}
              xs={12}
              container
              alignItems='center'
              justify="center"
            >
            <Button onClick={handleAddLink} color="primary" variant="contained" size="large" component="label">Add</Button>
            </Grid>
          </Grid>
          {linksArray.length!==0?
          <Grid 
          item
          md={12}
         >
            <List>
            <Divider />
              {linksArray.map((itemLink)=>(
              <div key={itemLink.key}>
                <ListItem style={{wordBreak: 'break-all'}}>
                  <ListItemText primary={itemLink.linknames}/>
                  <ListItemText primary={itemLink.links}/>
                  <Button onClick={()=>handleRemoveLink(itemLink.key)} style={{backgroundColor:'#8B0000', color:'white'}} variant="contained"  component="label">x</Button>
                </ListItem>
              <Divider />
              </div>
              ))}
            
          </List>
          </Grid>:""
          }
          
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



export default PublicationDetails;
