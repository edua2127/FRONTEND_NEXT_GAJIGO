import type { NextPage } from 'next'
import * as React from 'react'
import { FormLogin } from '@/types/auth.types'
import { useRouter } from 'next/router'
import UserService from '@/services/user.service'
import style from '@/styles/Login.module.css'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
const Login: NextPage = () => {
    const router = useRouter()

    const [error, setError] = React.useState<string>('')

    const [login, setLogin] = React.useState<FormLogin>({
        username: '',
        password: '',
    })

    const handleSubmit = (
        event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>,
    ) => {
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
                            <TextField
                                className={style.login_input}
                                id={'username'}
                                label='Username'
                                variant='outlined'
                                type={'text'}
                                value={login.username}
                                onChange={(event) =>
                                    setLogin({ ...login, username: event.target.value })
                                }
                            />
                        </label>
                        <label className={style.login_label}>
                            <TextField
                                className={style.login_input}
                                id={'password'}
                                label='Password'
                                variant='outlined'
                                type={'password'}
                                value={login.password}
                                onChange={(event) =>
                                    setLogin({ ...login, password: event.target.value })
                                }
                            />
                        </label>
                    </article>
                    <article className={style.login_article_button}>
                        <Button
                            className={style.login_button}
                            variant='contained'
                            onClick={handleSubmit}
                        >
                            Login
                        </Button>
                    </article>
                </section>
            </main>
        </div>
    )
}

export default Login
