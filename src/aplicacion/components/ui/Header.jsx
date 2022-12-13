import React, { useContext, useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Tabs, Tab, useScrollTrigger, ListItemButton, Divider, Box, Drawer, Toolbar, Button, Menu, MenuItem, Typography, Grid, ListItem, ListItemAvatar, ListItemText, List } from "@mui/material";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import CssBaseline from '@mui/material/CssBaseline';
import { startLogout } from "../../../store/auth";
import { useStylesHeader } from "../../styles/useStylesHeader";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import "../../styles/styles.css";
import "../../styles/graphics.css";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import logo from "../../img/logo.png"

const drawerWidth = 260;

/*
function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}
*/


export const Header = (props) => {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        console.log("handleDrawerToggle");
        setMobileOpen(!mobileOpen);
    };

    /**************************************** */

    const classes = useStylesHeader();
    const theme = useTheme();
    //const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const [value, setValue] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);


    const handleChange = (e, newValue) => {
        console.log("handleChange", newValue);
        setValue(newValue);
    };


    const { displayName } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(startLogout());
    };



    const routes = [
        { name: "Home", link: "/", activeIndex: 0 },
        { name: "Dashboard", link: "/Dashboard", activeIndex: 1 },
        { name: "Analitica", link: "/Analitica", activeIndex: 2 }
    ]
    /*
    useEffect(() => {
        [...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (value !== route.activeIndex) {
                        setValue(route.activeIndex)
                        if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
                            setSelectedIndex(route.selectedIndex)
                        }
                    }
                    break;
                    default:
                        break;
            }
        })
 
    }, [value, selectedIndex, routes]);
*/


    const tabs = (
        <React.Fragment>
            <Tabs value={value} onChange={handleChange} className={classes.tabContainer} indicatorColor="primary"></Tabs>
        </React.Fragment>
    );

    const list = (
        <React.Fragment>
            <Toolbar>
                <IconButton aria-label="account circle">
                    <AccountCircleIcon sx={{ color: 'gray' }} />
                </IconButton>
                <Typography variant='h6' className='text-color-sidebar' noWrap component='div' sx={{ paddingLeft: '10px' }}>
                    {displayName}
                </Typography>

            </Toolbar>

            <List disablePadding>
                {/*
                {routes.map(route => (
                    <ListItem divider button component={Link} to={route.link} selected={value === route.activeIndex} onClick={() => {setOpenDrawer(false);
                    setValue(route.activeIndex)}}>
                        <ListItemText className={value === route.activeIndex ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem } disableTypography>{route.name}</ListItemText>
                    </ListItem>
                ))}
                */}


                <Divider variant="middle" component="li" className='divider-color-white' />

                <ListItem
                    autoFocus={true}
                    onClick={() => {
                        setMobileOpen(false);
                        setValue(1);
                    }}
                    component={Link}
                    button
                    to="/"
                    selected={value === 1}
                >
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>
                                <HomeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText className={
                            value === 1
                                ? [classes.drawerItem, classes.drawerItemSelected]
                                : [classes.drawerItem]
                        }
                            disableTypography
                        >
                            Home
                        </ListItemText>
                    </ListItemButton>
                </ListItem>

                <Divider variant="middle" component="li" className='divider-color-white' />

                <ListItem
                    onClick={() => {
                        setMobileOpen(false);
                        setValue(2);
                    }}
                    component={Link}
                    to="/Dashboard"
                    selected={value === 2}
                >
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>
                                 <QueryStatsIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText className={
                            value === 2
                                ? [classes.drawerItem, classes.drawerItemSelected]
                                : [classes.drawerItem]
                        }
                            disableTypography
                            primary="Análisis"
                            secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                  </Typography>
                                  {" por periodo"}
                                </React.Fragment>
                              }
                            >
                            
                        </ListItemText>
                    </ListItemButton>
                </ListItem>

                <ListItem
                    onClick={() => {
                        setMobileOpen(false);
                        setValue(3);
                    }}
                    component={Link}
                    to="/Temporalidad"
                    selected={value === 3}
                >
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>
                                 <QueryStatsIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText className={
                            value === 3
                                ? [classes.drawerItem, classes.drawerItemSelected]
                                : [classes.drawerItem]
                        }
                            disableTypography
                            primary="Análisis"
                            secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                  </Typography>
                                  {" por temporalidad"}
                                </React.Fragment>
                              }
                            >
                            
                        </ListItemText>
                    </ListItemButton>
                </ListItem>


            { /*
                <Divider variant="middle" component="li" className='divider-color-white' />

                <ListItem
                    onClick={() => {
                        setMobileOpen(false);
                        setValue(4);
                    }}
                    component={Link}
                    to="/Analitica"
                    selected={value === 4}
                >
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>
                                <MonitorHeartIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText className={
                            value === 4
                                ? [classes.drawerItem, classes.drawerItemSelected]
                                : [classes.drawerItem]
                        }
                            disableTypography>
                            Ritmo cardiaco
                        </ListItemText>
                    </ListItemButton>
                </ListItem>


                <Divider variant="inset" component="li" className='divider-color-white' />

                <ListItem
                    onClick={() => {
                        setMobileOpen(false);
                        setValue(5);
                    }}
                    component={Link}
                    to="/Analitica"
                    selected={value === 5}
                >
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>
                                <SentimentDissatisfiedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText className={
                            value === 5
                                ? [classes.drawerItem, classes.drawerItemSelected]
                                : [classes.drawerItem]
                        }
                            disableTypography>
                            Estres
                        </ListItemText>
                    </ListItemButton>
                </ListItem>

                <Divider variant="inset" component="li" className='divider-color-white' />

                <ListItem
                    onClick={() => {
                        setMobileOpen(false);
                        setValue(6);
                    }}
                    component={Link}
                    to="/Analitica"
                    selected={value === 6}
                >
                    <ListItemButton divider={true}>
                        <ListItemAvatar>
                            <Avatar>
                                <BedtimeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText className={
                            value === 6
                                ? [classes.drawerItem, classes.drawerItemSelected]
                                : [classes.drawerItem]
                        }
                            disableTypography>
                            Sueño
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            */}

            </List>

        </React.Fragment>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(99.8% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    borderRadius: 2,
                    backgroundColor: 'common.blueFuerte'
                }}

            >

                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Button component={Link} to="/" onClick={() => setValue(0)} className={classes.logoContainer} disableRipple>
                        <img alt="logo" className={classes.logo} src={logo} />
                    </Button>
                    <Typography className={classes.tab} variant="h6" noWrap component="div">
                        MONITOREO DE LA FRECUENCIA CARDIACA 
                    </Typography>



                    {tabs}

                    <IconButton
                        className={classes.button}
                        onClick={onLogout}
                    >
                        <LogoutOutlined />
                    </IconButton>


                </Toolbar>

            </AppBar>


            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"

            >

                <Drawer // Better open performance on mobile.
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRadius: 2 }
                    }}
                    classes={{ paper: classes.drawer }}
                >
                    {list}
                </Drawer>


                <Drawer // Better open performance on deskop.
                    variant="permanent"
                    value={value}
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRadius: 2 },
                    }}
                    open
                    classes={{ paper: classes.drawer }}
                >
                    {list}
                </Drawer>


            </Box>


            <div className={classes.toolbarMargin} />
        </React.Fragment>
    );
}
