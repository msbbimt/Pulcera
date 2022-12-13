import React, { useContext, useState } from 'react';
import { Drawer, Toolbar, Typography, Box, Divider, ListItem, ListItemAvatar, ListItemText, List, IconButton, ListItemButton } from "@mui/material";
import { Link  } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import Avatar from '@mui/material/Avatar';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useSelector } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import { makeStyles } from "@mui/styles";
import  "../../styles/graphics.css";




export const SideBar = ({ drawerWidth }, props) => {
 
    const { displayName } = useSelector( state => state.auth ); // Aquí obtengo el nombre del usuario, porque en este punto ya está autenticado


 
return (
    <> 

    <Box 
        component="nav" 
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
        >
    
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor:'#222A41' },
          }}
          open
        >
            <Toolbar>
                <IconButton aria-label="account circle">
                    <AccountCircleIcon sx={{ color: 'gray' }}/>
                </IconButton>
                <Typography variant='h6' className='text-color-sidebar' noWrap component='div' sx={{ paddingLeft:'10px' }}>  
                     { displayName }
                </Typography>
                
            </Toolbar>
          <List component="nav" aria-label="mailbox folders" sx={{ width: '100%', maxWidth: 360 }} >
                <Divider variant="middle" component="li" className='divider-color-white'/>
                    
                        <ListItem autoFocus={true} >
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar>
                                        <HomeIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <Link to="/" style={{textDecoration:'none'}} className='text-color-sidebar'>Home</Link>
                            </ListItemButton>
                        </ListItem>
                
                    <Divider variant="middle" component="li" />
                    
                    <ListItem>
                        <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar>
                                        <DashboardIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <Link to="/Dashboard" style={{textDecoration:'none'}} className='text-color-sidebar'>Dashboard</Link>
                        </ListItemButton>
                    </ListItem>
                 
                        <ListItem>
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar>
                                        <QueryStatsIcon />
                                    </Avatar>
                                </ListItemAvatar>
                            <Link to="/Temporalidad" style={{textDecoration:'none'}} className='text-color-sidebar'>Temporalidad</Link>
                            </ListItemButton>
                        </ListItem>
        
            <Divider variant="middle" component="li" className='divider-color-white'/>
            
            <ListItem>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <MonitorHeartIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <Link to="/" style={{textDecoration:'none'}} className='text-color-sidebar'>Ritmo cardiaco</Link>
                </ListItemButton>
            </ListItem>
            
        
            <Divider variant="inset" component="li" className='divider-color-white' />
        
            <ListItem>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <SentimentDissatisfiedIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <Link to="/" style={{textDecoration:'none'}} className='text-color-sidebar'>Estres</Link>
                </ListItemButton>
            </ListItem>

            <Divider variant="inset" component="li" className='divider-color-white' />
        
            <ListItem>
                <ListItemButton divider={true}>
                    <ListItemAvatar>
                        <Avatar>
                            <BedtimeIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <Link to="/" style={{textDecoration:'none'}} className='text-color-sidebar'>Sueño</Link>
                </ListItemButton>
            </ListItem>
          </List>

        </Drawer>
 
    </Box>


    </>
    
  )
}


