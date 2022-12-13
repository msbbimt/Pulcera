import { makeStyles } from '@mui/styles';


export const useStylesHeader = makeStyles(theme => ({
    toolbarMargin: {
      ...theme.mixins.toolbar,
      marginBottom: "3em",
      [theme.breakpoints.down("md")]: {
          marginBottom: "2em"
      },
      [theme.breakpoints.down("xs")]: {
          marginBottom: "1.25em"
      }
  },
  logo: {
      height: "4.5em",
      [theme.breakpoints.down("md")]: {
          height: "3.5em"
      },
      [theme.breakpoints.down("xs")]: {
          height: "2.5em"
      }
  },
  logoContainer: {
      padding: 0,
      "&:hover": {
          backgroundColor: "transparent"
      }
  },
  tabContainer: {
      marginLeft: 'auto'
  },
  tab: {
      ...theme.typography.tab,
      minWidth: 10,
      marginLeft: "25px"
  },
  button: {
      ...theme.typography.estimate,
      borderRadius: "50px",
      marginLeft: "50px",
      marginRight: "25px"
      /*height: "45px",*/
    },
    drawerIcon: {
        height: "50px",
        width: "50px"
    },
    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    drawer: {
        backgroundColor: theme.palette.common.blueFuerte
    },
    drawerItem: {
        ...theme.typography.drawer, /**letra blanca */
        opacity: 0.7
    },
    drawerItemSelected : {
       opacity: 1
    }

}))
