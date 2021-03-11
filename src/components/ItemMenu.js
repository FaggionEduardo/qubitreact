import React from "react";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { Collapse,Typography,Menu,Fade} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
 
 
}))
const StyledMenu = withStyles({
  paper: {
    backgroundColor: "white",
    borderTop: '3px solid #0075bd',
  },
})((props) => (
  <Menu
    getContentAnchorEl={null}
    TransitionComponent={Fade}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
));
export default function  ButtonMenu (props){
    
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(false);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget)
      
    };
    const handleClose = () => {
      setAnchorEl(false)
    };
    return (
      <div >
          
        
        <Typography className={props.className} variant="body1" onClick={handleMenu}>{props.item}</Typography>
       
         
    
        
    <div>    
    <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
            {props.children}
    </StyledMenu>    

    </div>  
      </div>
    );
}

