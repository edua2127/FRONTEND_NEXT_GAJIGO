import { Drawer, List, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'

type Props = {
  drawerWidth: number
}

type NavBarLink = {
  id: number
  name: string
  url: string
}

type NavBarItemProps = {
  name: string
  links: NavBarLink[]
}

const NavBarItem = ({ name, links }: NavBarItemProps) => {
  // TODO remove /auth/ as it has nothing to do with any of these links
  return (
    <>
      <List>
        <ListItemText primary={name} />
        {links.map((link) => (
          <ListItem key={link.id} disablePadding>
            <Link href={'/auth/' + link.url}>
              <ListItemButton>
                <ListItemText primary={`• ${link.name}`} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  )
}

export const NavBar = ({ drawerWidth }: Props) => {
  return (
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
      <Box sx={{ overflow: 'auto', ml: 2 }}>
        <NavBarItem
          name='EVENTOS'
          links={[
            { id: 1, name: 'Cadastrar', url: 'cadastroEvents' },
            { id: 2, name: 'Ver', url: 'events' },
            { id: 3, name: 'Cronograma', url: '' },
            { id: 4, name: 'Gerenciar Cargos', url: '' },
            { id: 5, name: 'Listar Totens', url: '' },
          ]}
        />
        <NavBarItem
          name='PALESTRAS'
          links={[
            { id: 1, name: 'Cadastrar', url: 'cadastroPalestra' },
            { id: 2, name: 'Ver', url: 'palestras' },
          ]}
        />
        <NavBarItem
          name='SALAS'
          links={[
            { id: 1, name: 'Cadastrar', url: 'cadastrarTags' },
            { id: 2, name: 'Ver', url: 'tags' },
            { id: 3, name: 'Cronograma', url: '' },
            { id: 4, name: 'Totens da Sala', url: '' },
          ]}
        />
        <NavBarItem
          name='USUARIOS'
          links={[
            { id: 1, name: 'Cadastrar', url: 'cadastroPalestrante' },
          ]}
        />
      </Box>
    </Drawer>
  )
}
