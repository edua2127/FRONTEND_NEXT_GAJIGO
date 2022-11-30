import NavBar from '@/layout/NavBar'
import type { NextPage } from 'next'
import Router from 'next/router'
import React, { useState } from 'react'
import { User } from '@/types/user.types'
import style from '@/styles/cadastroPalestrante.module.css'
import UserService from '@/services/user.service'

import AppLayout from '@/layout/AppLayout'
const CadastroPalestrante: NextPage = () => {
  const [user, setUser] = useState<User>(new User())

  function cadastrar() {
    UserService.create(user)
      .then((response) => {
        console.log(response)
        Router.push(`/auth/palestrantes`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <AppLayout text='Cadastro de Palestrantes'>
      
        <main>
          <section className={style.cadastro_palestra_section}>
            <article className={style.cadastro_palestra_article}>
              <label className={style.cadastro_palestra_label}>
                <span>Nome do Palestrante</span>
                <input
                  type='text'
                  placeholder='Nome do Palestrante'
                  className={style.cadastro_palestra_input}
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </label>
              <label className={style.cadastro_palestra_label}>
                <span>Descrição do Palestrante</span>
                <input
                  type='text'
                  placeholder='Descrição do Palestrante'
                  className={style.cadastro_palestra_input}
                  value={user.description}
                  onChange={(e) => setUser({ ...user, description: e.target.value })}
                />
              </label>
            </article>
            <article className={style.cadastro_palestra_article}>
              <label className={style.cadastro_palestra_label}>
                <span>Nome de Usuario do Palestrante</span>
                <input
                  type='text'
                  placeholder='Nome de Usuário'
                  className={style.cadastro_palestra_input}
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
              </label>
              <label className={style.cadastro_palestra_label}>
                <span>Senha do Palestrante</span>
                <input
                  type='text'
                  placeholder='Senha'
                  className={style.cadastro_palestra_input}
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </label>
            </article>
            <article className={style.cadastro_palestra_article}>
              <label className={style.cadastro_palestra_label}>
                <span>Telefone do Palestrante</span>
                <input
                  type='text'
                  placeholder='Telefone do Palestrante'
                  className={style.cadastro_palestra_input}
                  value={user.telephone}
                  onChange={(e) => setUser({ ...user, telephone: e.target.value })}
                />
              </label>
              <label className={style.cadastro_palestra_label}>
                <span>E-mail do Palestrante</span>
                <input
                  type='text'
                  placeholder='E-mail do Palestrante'
                  className={style.cadastro_palestra_input}
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </label>
            </article>
            <article className={style.cadastro_palestra_article_button}>
              <button
                className={style.cadastro_palestra_button_cancelar}
                onClick={() => Router.back()}
              >
                Voltar
              </button>
              <button className={style.cadastro_palestra_button} onClick={cadastrar}>
                Cadastrar
              </button>
            </article>
          </section>
        </main>
      
    </AppLayout>
  )
}

export default CadastroPalestrante
