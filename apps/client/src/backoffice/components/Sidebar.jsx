import { TurnedInNot, InboxOutlined, MailLockOutlined } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { NavLink, Navigate, useNavigate, useParams } from 'react-router-dom';

export const Sidebar = ({ drawerWidth }) => {

    const opcionesMenu = [
        {
            name:'Inicio',
            url: '/'
        },
        {
            name:'Inmuebles',
            url: '/inmuebles'
        },
        {
            name:'Metricas',
            url: '/metricas'
        }
    ];

    return (
        <Box
            component='nav'
            sx={{
                width: { sm: drawerWidth },
                flexShrink: { sm: 0 }
            }}
        >
            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >

                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>usuario</Typography>
                </Toolbar>
                <Divider />

                <List>
                    {opcionesMenu.map((opcion) => (
                        <ListItem key={opcion.name} disablePadding>
                            <NavLink to={opcion.url} className='nav-item nav-link'>
                                {opcion.name}
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
                <Divider />

            </Drawer>

        </Box>

    )
}
