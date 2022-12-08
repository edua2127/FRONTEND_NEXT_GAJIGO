import type { NextPage } from 'next'
import * as React from 'react'
import { useRouter } from 'next/router'
import style from '@/styles/Login.module.css'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useSignUpMutation } from '@/store/auth/api'
import { useEffect, useState } from 'react'

const SignUp: NextPage = () => {
  const [signUp, { isSuccess }] = useSignUpMutation()
  const router = useRouter()

  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  })

  const handleSubmit = async (
    event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()

    const { name, email, username, password } = signUpData

    if (name && email && username && password) {
      signUp(signUpData)
    }
  }

  function handleInput(target: HTMLInputElement) {
    const name = target.name
    const value = target.value
    setSignUpData({ ...signUpData, [name]: value })
  }

  useEffect(() => {
    if (isSuccess) {
      router.push('/auth/login')
    }
  }, [isSuccess])

  return (
    <div className={style.login_body}>
      <header>
        <h1>Sign Up</h1>
      </header>
      <main className={style.login_main}>
        <section className={style.login_section}>
          <article className={style.login_article}>
            <label className={style.login_label}>
              <TextField
                className={style.login_input}
                id='name'
                name='name'
                label='Name'
                variant='outlined'
                type='text'
                value={signUpData.name}
                onChange={(event) => handleInput(event.target as HTMLInputElement)}
              />
            </label>
            <label className={style.login_label}>
              <TextField
                className={style.login_input}
                id='email'
                name='email'
                label='Email'
                variant='outlined'
                type='email'
                value={signUpData.email}
                onChange={(event) => handleInput(event.target as HTMLInputElement)}
              />
            </label>
            <label className={style.login_label}>
              <TextField
                className={style.login_input}
                id='username'
                name='username'
                label='Username'
                variant='outlined'
                type='text'
                value={signUpData.username}
                onChange={(event) => handleInput(event.target as HTMLInputElement)}
              />
            </label>
            <label className={style.login_label}>
              <TextField
                className={style.login_input}
                id='password'
                name='password'
                label='Password'
                variant='outlined'
                type='password'
                value={signUpData.password}
                onChange={(event) => handleInput(event.target as HTMLInputElement)}
              />
            </label>
          </article>
          <article className={style.login_article_button}>
            <Button
              href={`/auth/login${
                router.query.returnUrl ? `?returnUrl=${router.query.returnUrl}` : ''
              }`}
            >
              Sign In
            </Button>
            <Button className={style.login_button} variant='contained' onClick={handleSubmit}>
              Sign Up
            </Button>
          </article>
        </section>
      </main>
    </div>
  )
}

export default SignUp
