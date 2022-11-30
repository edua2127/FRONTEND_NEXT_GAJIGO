import { AppBar, Drawer, List, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'

import style from '@/styles/NavBar.module.css'
import { ReactNode } from 'react'
import Head from 'next/head'
import { NavBar } from './NavBar'

type Props = {
  children: ReactNode
  title: string
}

const drawerWidth = 200
const appbarHeight = 75

const AppLayout = ({ children, title }: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Head>
        <title>{title}</title>
      </Head>

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
          <Typography variant='h6'>{title}</Typography>
        </Toolbar>
      </AppBar>

      <NavBar drawerWidth={drawerWidth} />
      <div className={style.nav_page_main}>{children}</div>
    </Box>
  )
}

export default AppLayout
