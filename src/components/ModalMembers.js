import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { useQuery, gql } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    width:'50vw',
    maxHeight:'90vh',
    overflowY:'scroll'
  
  },
 
  
}));
const MembersQuery = gql`
  query MembersQuery($id:ID!){
    member(id:$id) {      
        id
        name
        email
        acting
        profile64
    }
  }
`;
export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const membersId=props.array.split(',')
 
  
  const handleOpen = (e) => {
    e.preventDefault()
    setOpen(true);
  };
  
  

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <a href="" onClick={handleOpen} className={props.className}>{props.title}</a>
        
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <List className={classes.paper}>
            <Divider />
          {membersId.map((item) => (
           <Item key={item} id={parseInt(item)}/>
            ))}
          </List>
        </Fade>
      </Modal>
    </>
  );
}
const Item =  ({id}) => {
  const { loading, error, data } =  useQuery(MembersQuery, {
    variables: { id:id },
  });
  return(
  <>
  <ListItem style={{wordBreak: 'break-all'}}>
      <ListItemAvatar>
          <Avatar src={loading?'':data.member.profile64}/>
            
      </ListItemAvatar>
      <ListItemText primary={loading?'':data.member.name} secondary={loading?'':data.member.acting} />
    </ListItem>
  <Divider />
  </>
  )
}