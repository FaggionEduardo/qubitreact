import React from 'react';
import { withStyles } from '@material-ui/core/styles';
const styles = (theme) => ({
  div:{
    width:55,
    height:55,
    borderRadius:'50%',
    backgroundColor:'#ffffff',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    
  }
});
const Logo = (props) => {
  const { classes } = props;
  return (
    <div className={classes.div}>
      <img
      alt="Logo"
      src="/static/logo.png"
      style={{
        width:42,
      }}
      {...props}
    />
    </div>
    
  );
};

export default withStyles(styles)(Logo);
