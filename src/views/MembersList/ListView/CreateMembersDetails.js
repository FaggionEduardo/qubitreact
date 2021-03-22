import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation,useQuery, gql } from '@apollo/client';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
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

const MemberDetails = ({ className, create, set,...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState(
    {
      name:"",
      email:"",
      acting:"",
      formation:"",
      links:"",
      linknames:"",
      profile64:""
      
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
  const  handleImage = async (event) => {
   var base64=await toBase64(event.target.files?.[0])
   setValues(
     {
       ...values,
       profile64:base64
     }
   )
  };
  const handleChangeLink = (event) => {
    setLinks({
      ...links,
      [event.target.name]: event.target.value
    });
  };
  const handleAddLink = () => {
    var stringLinks=links.links.split('')
    var stringLinknames=links.linknames.split('')
    if(stringLinknames.indexOf(',')==-1 && stringLinks.indexOf(',')==-1){
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
  }else{
    alert('Invalid character ","')
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
  const handleSubmit = (e) => {
    e.preventDefault()
    if(values.profile64!==""){
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
          subheader="You can register information for a member."
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
                label="Formation"
                helperText="To style the text use **bold** or _italic_"
                name="formation"
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



export default MemberDetails;
