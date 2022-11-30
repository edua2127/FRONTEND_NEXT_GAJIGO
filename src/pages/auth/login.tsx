import type { NextPage } from 'next'
import * as React from 'react'
import { FormLogin } from '@/types/auth.types'
import { useRouter } from 'next/router'
import style from '@/styles/Login.module.css'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useLoginMutation } from '@/store/auth/api'
import { useEffect } from 'react'
const Login: NextPage = () => {
  const router = useRouter()
  const [login, { data, isSuccess }] = useLoginMutation()

  const [loginData, setLoginData] = React.useState<FormLogin>({
    username: '',
    password: '',
  })

  const handleSubmit = async (
    event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
    const { username, password } = loginData

    if (username && password) {
      login({ username, password })
    }
  }

  useEffect(() => {
    if (data) {
      const returnUrl = router.query.returnUrl?.toString() || '/auth/events'
      router.push(returnUrl)
    }
  }, [data, isSuccess])

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
                value={loginData.username}
                onChange={(event) => setLoginData({ ...loginData, username: event.target.value })}
              />
            </label>
            <label className={style.login_label}>
              <TextField
                className={style.login_input}
                id={'password'}
                label='Password'
                variant='outlined'
                type={'password'}
                value={loginData.password}
                onChange={(event) => setLoginData({ ...loginData, password: event.target.value })}
              />
            </label>
          </article>
          <article className={style.login_article_button}>
            <Button className={style.login_button} variant='contained' onClick={handleSubmit}>
              Login
            </Button>
          </article>
        </section>
      </main>
    </div>
  )
}

export default Login
