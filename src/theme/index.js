import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';
import { enUS } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#0075bd'
    },
    secondary: {
      main: colors.indigo[500]
    },
  
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography
},enUS);

export default theme;
