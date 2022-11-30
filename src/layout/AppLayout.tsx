import { AppBar, Drawer, List, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { alignProperty } from '@mui/material/styles/cssUtils'
import lightThemeOptions from '@/styles/theme/lightTheme'

type Props = {
    children: JSX.Element
    text: string
}
const drawerWidth = 200
const appbarHeight = 75

const AppLayout = ({ children, text }: Props) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position='fixed'
                color='secondary'
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    height: `${appbarHeight}px`,
                }}
            >
                <Toolbar>
                    <Typography variant='h6'>{text}</Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant='permanent'
                anchor='left'
            >
                <Toolbar>
                    <Typography variant='h6'>GAJIGO</Typography>
                </Toolbar>
                <Divider />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItemText primary={'EVENTOS'} />
                        {['Cadastrar', 'Ver', 'Gerenciar Cargos', 'Listar Totens'].map((text) => (
                            <ListItem key={text} disablePadding>
                                <Link href={'/evento/' + text.toLowerCase()}>
                                    <ListItemButton>
                                        <ListItemText primary={'• ' + text} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItemText primary={'PALESTRAS'} />
                        {['Cadastrar', 'Ver', 'Chick-ins'].map((text) => (
                            <ListItem key={text} disablePadding>
                                <Link href={'/palestra/' + text.toLowerCase()}>
                                    <ListItemButton>
                                        <ListItemText primary={'• ' + text} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItemText primary={'SALAS'} />
                        {['Cadastrar', 'Ver', 'Totens', 'Cronograma'].map((text) => (
                            <ListItem key={text} disablePadding>
                                <Link href={'/salas/' + text.toLowerCase()}>
                                    <ListItemButton>
                                        <ListItemText primary={'• ' + text} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItemText primary={'Usuarios'} />
                        {['Cadastrar'].map((text) => (
                            <ListItem key={text} disablePadding>
                                <Link href={'/usuarios/' + text.toLowerCase()}>
                                    <ListItemButton>
                                        <ListItemText primary={'• ' + text} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            <Box
                sx={{
                    display: 'flex',
                    width: `calc(100% - ${drawerWidth}px)`,
                    minHeight: `calc(100vh - ${appbarHeight}px)`,
                    mt: `${appbarHeight}px`,
                    background: 'white',
                }}
            >
                {children}
            </Box>
        </Box>
    )
}

export default AppLayout