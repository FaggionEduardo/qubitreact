import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

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

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    e.preventDefault()
    setOpen(true);
  };
  const obj=props.array
  var array=obj.names.split(',')
  var array2=obj.links.split(',')

  for(var c=0;c<array.length;c++){
    array[c]={key:c,name:array[c],link:array2[c]}
  }

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
          {array.map((item) => (
            <div key={item.key}>
            <ListItem  style={{wordBreak: 'break-all'}}><a href={item.link}>{item.name}</a></ListItem>
            <Divider />
            </div>
            ))}
          </List>
        </Fade>
      </Modal>
    </>
  );
}