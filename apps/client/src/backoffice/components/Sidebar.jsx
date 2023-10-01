import { TurnedInNot, InboxOutlined, MailLockOutlined } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export const Sidebar = ({ drawerWidth }) => {
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
                    {['Inicio', 'Inmuebles', 'Metricas'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => {return (<Navigate to='/inicio' />)}}>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />

            </Drawer>

        </Box>

    )
}
