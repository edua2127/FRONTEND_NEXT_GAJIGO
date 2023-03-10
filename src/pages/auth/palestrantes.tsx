import type { NextPage } from 'next'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { ApiLink, ApiLinkClass } from '@/types/api-link.types'
import { User } from '@/types/user.types'
import UserService from '@/services/user.service'
import style from '@/styles/User.module.css'

import AppLayout from '@/layout/AppLayout'
const Palestrantes: NextPage = () => {
  const [palestrantes, setPalestrantes] = useState<User[]>([])
  const [users, setUsers] = useState<User[]>([])

  function getUsers() {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/users`
    UserService.getAll(url)
      .then((response) => {
        setUsers(response._embedded.users)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (users.length > 0) {
      setPalestrantes(users.filter((user) => !user.admin))
    }
  }, [users])

  function excluirPalestrante(id: number) {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
    UserService.delete(url)
      .then((response) => {
        getUsers()
      })
      .catch((error) => {
        console.log(error)
        alert('existe alguma dependecia com esse palestrante')
      })
  }

  return (
    <AppLayout title='Palestrantes'>
      <main>
        <section className={style.room_section}>
          <article className={style.room_article_cadastro_and_listar}>
            <button
              className={style.room_button_cadastrar}
              onClick={() => Router.push(`/auth/cadastroPalestrante`)}
            >
              Cadastrar Palestrante
            </button>
          </article>
          <article className={style.room_article_table}>
            <table className={style.room_table}>
              <thead className={style.room_table_thead}>
                <tr className={style.room_table_tr}>
                  <th className={style.room_table_th}>Nome</th>
                  <th className={style.room_table_th}>Descri????o</th>
                  <th className={style.room_table_th}>Email</th>
                  <th className={style.room_table_th}>Tefefone</th>
                  <th className={style.room_table_th}>A????es</th>
                </tr>
              </thead>
              <tbody>
                {palestrantes.length > 0 &&
                  palestrantes.map((palestrante) => {
                    const id = Number(palestrante._links.self.href.split('/').pop())
                    return (
                      <tr key={palestrante.id} className={style.room_table_tr}>
                        <td className={style.room_table_td}>{palestrante.name}</td>
                        <td className={style.room_table_td}>{palestrante.description}</td>
                        <td className={style.room_table_td}>{palestrante.email}</td>
                        <td className={style.room_table_td}>{palestrante.telephone}</td>
                        <td className={style.room_table_td_actions}>
                          <button
                            className={style.room_button_editar}
                            onClick={() => Router.push(`/editarPalestrantes/${id}`)}
                          >
                            Editar
                          </button>
                          <button
                            className={style.room_button_excluir}
                            onClick={() => excluirPalestrante(id)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </article>
        </section>
      </main>
    </AppLayout>
  )
}

export default Palestrantes
