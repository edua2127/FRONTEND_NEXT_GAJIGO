import type { NextPage } from 'next'
import * as React from 'react'
import { FormLogin } from '@/types/auth.types'
import {useRouter} from "next/router";
import UserService from '@/services/user.service'
import style from '@/styles/Login.module.css'
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
                    const returnUrl = router.query.returnUrl || '/auth/events'
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
               <header>
                     <h1>Sign in</h1>
               </header>
               <main className={style.login_main}>
                   <section className={style.login_section}>
                       <article className={style.login_article}>
                           <label className={style.login_label}>
                                <span>Username</span>
                                <input className={style.login_input} type="text" name="username" value={login.username} onChange={(e) => setLogin({...login, username: e.target.value})}/>
                           </label>
                            <label className={style.login_label}>
                                <span>Password</span>
                                <input className={style.login_input} type="password" name="password" value={login.password} onChange={(e) => setLogin({...login, password: e.target.value})}/>
                            </label>
                       </article>
                       <article className={style.login_article_button}>
                              <button className={style.login_button} onClick={handleSubmit}>Login</button>
                       </article>
                   </section>
               </main>
           </div>
    )
}

export default Login