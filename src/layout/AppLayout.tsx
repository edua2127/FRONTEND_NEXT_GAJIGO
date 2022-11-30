import { AppBar, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'

import style from '@/styles/NavBar.module.css'
import { ReactNode, useEffect } from 'react'
import Head from 'next/head'
import { NavBar } from './NavBar'
import { useGetCurrentUserQuery } from '@/store/auth/api'
import { useRouter } from 'next/router'

type Props = {
  children: ReactNode
  title: string
}

const drawerWidth = 200
const appbarHeight = 75

const AppLayout = ({ children, title }: Props) => {
  const { isError: isUnauthenticated } = useGetCurrentUserQuery()
  const router = useRouter()

  useEffect(() => {
    if (isUnauthenticated) {
      router.push('/auth/login')
    }
  }, [isUnauthenticated])

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
