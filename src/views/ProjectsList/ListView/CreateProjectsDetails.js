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
  Typography,
  TextareaAutosize
} from '@material-ui/core';


const MembersQuery = gql`
  query MembersQuery{
    members {      
        id
        name
        email
        acting
        profile64
    }
  }
`;
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

const ProjectDetails = ({ className, create, set,...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState(
    {
      title:"",
      description:"",
      linknames:"",
      links:"",
      imagename:"",
      image64:"",
      members:"",
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
  const [members, setMembers] = useState(null);
  const [membersArray, setMembersArray] = useState([]);
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
  const handleAddMember = () => {
    var array=membersArray
    if(members!==null){
      if(array.indexOf(members)==-1){
        array.push(members)
        setMembersArray(array)
        setRender(render+1)
      }
    }
  };
  const handleChangeMember = (event, value) => {
    setMembers(value)
  };
  const handleRemoveMember = (key) => {
    var array=membersArray
    for(let c=0;c<array.length;c++){
      if(array[c].id==key){
        array.splice(c, 1);
      }
    }
    setMembersArray(array)
    setRender(render+1)
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
      if(membersArray.length!==0){

      var members=[]
      membersArray.map(member=>{
        members.push(member.id)
      })
      var links=[]
      var linknames=[]
      linksArray.map(link=>{
        links.push(link.links)
        linknames.push(link.linknames)
      })
      var req=values
      req.members=members.toString()
      req.links=links.toString()
      req.linknames=linknames.toString()
      create(req)
    }else{
      alert("Please provide members")
    }
    }else{
      alert("Please upload the image")
    }
   };
  const { loading, error, data } =  useQuery(MembersQuery);
  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="You can register information for a project."
          title="Project"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Enter the title of the project"
                label="Title"
                name="title"
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
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={11}
              xs={12}
            >
              <Autocomplete
                options={loading?[]:data.members}
                getOptionLabel={(option) => option.name}
                onChange={(e, value)=>handleChangeMember(e, value)}
                renderInput={(params) => <TextField {...params} label="Members" variant="outlined" />}
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
              <Button onClick={handleAddMember} color="primary" variant="contained" size="large" component="label">Add</Button>
            </Grid>
          </Grid>
          {membersArray.length!==0?
          <Grid 
          item
          md={12}
         >
            <List>
            <Divider />
              {membersArray.map((itemMember)=>(
              <div key={itemMember.id}>
                <ListItem style={{wordBreak: 'break-all'}}>
                <ListItemAvatar>
                  <Avatar src={itemMember.profile64}/>    
                  </ListItemAvatar>
                  <ListItemText primary={itemMember.name}/>
                  <ListItemText primary={itemMember.acting}/>
                  <ListItemText primary={itemMember.email}/>
                  <Button onClick={()=>handleRemoveMember(itemMember.id)} style={{backgroundColor:'#8B0000', color:'white'}} variant="contained"  component="label">x</Button>
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



export default ProjectDetails;
