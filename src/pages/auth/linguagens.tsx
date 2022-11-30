import NavBar from '@/layout/NavBar'
import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ApiLink, ApiLinkClass } from '@/types/api-link.types'
import { Language } from '@/types/language.types'
import LanguageService from '@/services/languages.service'
import style from '@/styles/Linguagens.module.css'

import AppLayout from '@/layout/AppLayout'
const Linguagens: NextPage = () => {
  const [linguagens, setLinguagens] = useState<Language[]>([])

  function getLanguages() {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/languages`
    LanguageService.get(url)
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setLinguagens(response._embedded.languages)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getLanguages()
  }, [])

  function excluirLinguagem(id: string) {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/languages/${id}`
    LanguageService.delete(url)
      .then(() => {
        getLanguages()
      })
      .catch((error) => {
        console.log(error)
        alert('existe alguma dependecia com essa linguagem')
      })
  }

  return (
    <AppLayout text='Linguagens'>
      <>
        <main>
          <section className={style.room_section}>
            <article className={style.room_article_cadastro_and_listar}>
              <button
                className={style.room_button_cadastrar}
                onClick={() => Router.push('/auth/cadastroLinguagens')}
              >
                Cadastrar
              </button>
            </article>
            <article className={style.room_article_table}>
              <table className={style.room_table}>
                <thead className={style.room_table_thead}>
                  <tr className={style.room_table_tr}>
                    <th className={style.room_table_th}>Nome</th>
                    <th className={style.room_table_th}>Data de Criação</th>
                    <th className={style.room_table_th}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {linguagens.length > 0 &&
                    linguagens.map((linguagem) => {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      const idLocal: string = linguagem._links.self.href.split('/').pop()
                      return (
                        <tr key={idLocal} className={style.room_table_th}>
                          <td className={style.room_table_td}>{linguagem.name}</td>
                          <td className={style.room_table_td}>{linguagem.created.toString()}</td>
                          <td className={style.room_table_td_actions}>
                            <button
                              className={style.room_button_editar}
                              onClick={() => Router.push(`/editarLinguagens/${idLocal}`)}
                            >
                              Editar
                            </button>
                            <button
                              className={style.room_button_excluir}
                              onClick={() => excluirLinguagem(idLocal)}
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
      </>
    </AppLayout>
  )
}

export default Linguagens
