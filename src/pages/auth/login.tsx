import type { NextPage } from 'next'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import { FormLogin } from '@/types/auth.types'
import {useRouter} from "next/router";
import UserService from '@/services/user.service'
import style from '@/styles/Login.module.css'
import Button from '@mui/material/Button';
const Login: NextPage = () => {

    const router = useRouter()

    const [error, setError] = React.useState<string>('')

    const [login, setLogin] = React.useState<FormLogin>({
        username: '',
        password: '',
    })

    const handleSubmit = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        console.log(login)
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
       <div className={style.login_body}>
           <header className={style.login_header}>
                    <h1>Login</h1>
           </header>
           <main>
               <form className={style.login_form}>
                   <TextField className={style.login_input} id={'username'} label={'Username'} value={login.username} onChange={(e) => setLogin({...login, username: e.target.value})}/>
                   <TextField className={style.login_input} id={'password'} label={'Password'} value={login.password} onChange={(e) => setLogin({...login, password: e.target.value})}/>
                   <Button onClick={handleSubmit} variant="outlined">Login</Button>
               </form>
           </main>
       </div>

    )
}

export default Login