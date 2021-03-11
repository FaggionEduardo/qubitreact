import React, { useState, useEffect } from 'react';
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
  root: {}
}));

const ProjectDetails = ({ className, details,edit,set, ...rest  }) => {
  var array=details.linknames.split(',')
  var array2=details.links.split(',')
  var arrayMembers=details.members.split(',')
  for(var c=0;c<array.length;c++){
    array[c]={key:c,linknames:array[c],links:array2[c]}
  }
  const classes = useStyles();
  const [values, setValues] = useState(details);
  const [linksNumber, setLinksNumber] = useState(array.length-1)
  const [render, setRender] = useState(0)
  const [links, setLinks] = useState(
    {
      linknames:"",
      links:"",
      
    }
  );
  const [linksArray, setLinksArray] = useState(array[0].links!==""?array:[]);
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
  const handleInitialMember = (member) => {
    var array=membersArray
  
    if(member!==null){
      if(array.indexOf(member)==-1){
        array.push(member)
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
      const req={
        ...details,
        members:members.toString(),
        links:links.toString(),
        linknames:linknames.toString()
      }
      edit(req)
    }else{
      alert('Please provide members')
    }
   };
   const { loading, error, data } =  useQuery(MembersQuery);
   useEffect(() => {
  arrayMembers.map(id=>{

    if(!loading){
      data.members.map(member=>{
        if(member.id==id){
          
          handleInitialMember(member)
        }
      })
    }
  })
  },[])
  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="You can edit information for a project."
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
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Enter the title of the project"
                label="Title"
                name="title"
                onChange={handleChange}
                value={values.title}
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
                value={values.description}
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
                value={values.imagename}
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
            Edit
          </Button>
        </Box>
      </Card>
    </form>
  );
};



export default ProjectDetails;
