import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Collapse } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Dehaze";

const useStyles = makeStyles((theme) => ({
  buttonCollapse: {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    },

    boxShadow: "none",
    fontSize:'large'
  },
  dropdown: {
    position: 'absolute',
    top: 116,
    padding: '5%',
    left: 0,
    backgroundColor: "white",
    width: '80%',
    margin:"0 10%",
    opacity: 1,
    zIndex: 9999,
    borderTop: '3px solid #ffb621',
    maxHeight:'65vh',
    overflow:'scroll'
    },
 
}))

export default function  ButtonMenu (props){
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleMenu = () => {
      setOpen((prev) => !prev);
      
    };
    return (
      <div >
          
        
        <IconButton className={classes.buttonCollapse} onClick={handleMenu}>
             <MenuIcon fontSize='large'  />
        </IconButton>
       
         
    
        
    <div>
    <Collapse className={classes.dropdown} in={open}>    
            <div >
            {props.children}
            </div>
        
    </Collapse>
    </div>  
      </div>
    );
}

