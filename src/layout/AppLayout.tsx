import { AppBar, Drawer, List, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { alignProperty } from '@mui/material/styles/cssUtils'
import lightThemeOptions from '@/styles/theme/lightTheme'

import style from '@/styles/NavBar.module.css'
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
            {[
              { id: 1, nome: 'cadastrar', url: 'cadastroEvents' },
              { id: 2, nome: 'ver', url: 'events' },
            ].map((pagina) => (
              <ListItem key={pagina.id} disablePadding>
                <Link href={'/auth/' + pagina.url}>
                  <ListItemButton>
                    <ListItemText primary={'• ' + pagina.nome} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItemText primary={'LINGUAGENS'} />
            {[
              { id: 1, nome: 'cadastrar', url: 'cadastroLinguagens' },
              { id: 2, nome: 'ver', url: 'linguagens' },
            ].map((pagina) => (
              <ListItem key={pagina.id} disablePadding>
                <Link href={'/auth/' + pagina.url}>
                  <ListItemButton>
                    <ListItemText primary={'• ' + pagina.nome} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItemText primary={'TAGS'} />
            {[
              { id: 1, nome: 'cadastrar', url: 'cadastrarTags' },
              { id: 2, nome: 'ver', url: 'tags' },
            ].map((pagina) => (
              <ListItem key={pagina.id} disablePadding>
                <Link href={'/auth/' + pagina.url}>
                  <ListItemButton>
                    <ListItemText primary={'• ' + pagina.nome} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItemText primary={'PALESTRANTES'} />
            {[
              { id: 1, nome: 'cadastrar', url: 'cadastroPalestrante' },
              { id: 2, nome: 'ver', url: 'palestrantes' },
            ].map((pagina) => (
              <ListItem key={pagina.id} disablePadding>
                <Link href={'/auth/' + pagina.url}>
                  <ListItemButton>
                    <ListItemText primary={'• ' + pagina.nome} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <div className={style.nav_page_main}>{children}</div>
    </Box>
  )
}

export default AppLayout
