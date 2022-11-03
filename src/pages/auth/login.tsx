import type { NextPage } from 'next'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";
import { FormLogin } from '@/types/auth.types'
import {useRouter} from "next/router";
import UserService from '@/services/user.service'

const Login: NextPage = () => {

    const router = useRouter()

    const [error, setError] = React.useState<string>('')

    const [login, setLogin] = React.useState<FormLogin>({
        username: '',
        password: '',
    })

    const handleSubmit = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (login.password && login.username) {
            UserService.login(login)
                .then(() => {
                    const returnUrl = router.query.returnUrl || '/'
                    router.push(returnUrl.toString())
                })
                .catch((error) => {
                    setError(error)
                    console.log(error)
                })
        }
    }

    return (
       <Grid xs={12} height={'100vh'} direction={'column'} justifyContent={'center'} container>
           <Box mx={3} sx={
               {
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                   alignSelf: 'center',
                   justifyContent: 'center',
                   gap: '10px'
               }}>
               <Grid item>
                   <TextField
                       id="outlined-basic"
                       label="Username"
                       variant="outlined"
                       required
                       value={login.username}
                       onChange={(e) =>
                           setLogin({...login, username: e.target.value})}
                       autoFocus/>
               </Grid>

               <Grid item>
                   <TextField
                       id="outlined-basic"
                       label="Password"
                       variant="outlined"
                       type="text"
                       required
                       value={login.password}
                       onChange={(e) =>
                           setLogin({...login, password: e.target.value})}
                       autoFocus/>
               </Grid>
               <Grid item xs={12} sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-end',
               }}>
                   <Button variant="outlined" onClick={handleSubmit}>Login</Button>
               </Grid>

           </Box>
       </Grid>

    )
}

export default Login