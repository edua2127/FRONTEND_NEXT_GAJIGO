import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import NavBar from '@/layout/NavBar'
import { ApiLink, ApiLinkClass } from '@/types/api-link.types'
import { useEffect, useState } from 'react'
import RoomService from '@/services/room.service'
import { Lecture } from '@/types/lecture.types'
import style from '@/styles/Lecture.module.css'
import LectureService from '@/services/lecture.service'

import AppLayout from '@/layout/AppLayout'
const Palestra: NextPage = () => {
  const router = useRouter()
  const idSala = router.query.id
  const [lectures, setLectures] = useState<Lecture[]>([])

  function getPalestrasDaSala() {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/rooms/${idSala}/lectures`
    RoomService.get(url)
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setLectures(response._embedded.lectures)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function excluirPalestra(id: string) {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/lectures/${id}`
    LectureService.delete(url)
      .then(() => {
        getPalestrasDaSala()
      })
      .catch((error) => {
        console.log(error)
        alert('Erro ao excluir palestra, existe alguma dependência com essa palestra')
      })
  }
  useEffect(() => {
    getPalestrasDaSala()
  }, [idSala])

  return (
    <AppLayout text='Palestras da Sala'>
      
        <main>
          <section className={style.lecture_section}>
            <article className={style.lecture_article_cadastro_and_voltar}>
              <button
                className={style.lecture_button_cadastrar}
                onClick={() => Router.push(`/cadastrarPalestra/${idSala}`)}
              >
                Cadastrar Palestra
              </button>
              <button className={style.lecture_button_voltar} onClick={() => Router.back()}>
                Voltar
              </button>
            </article>
          </section>
          <section className={style.lecture_section}>
            <article className={style.lecture_article_table}>
              <table className={style.lecture_table}>
                <thead className={style.lecture_table_thead}>
                  <tr className={style.lecture_table_tr}>
                    <th className={style.lecture_table_th}>Nome</th>
                    <th className={style.lecture_table_th}>Descrição</th>
                    <th className={style.lecture_table_th}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {lectures.length > 0 &&
                    lectures.map((lecture) => {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      const idLocal: string = lecture._links.self.href.split('/').pop()
                      return (
                        <tr key={idLocal} className={style.lecture_table_tr}>
                          <td className={style.lecture_table_td}>{lecture.name}</td>
                          <td className={style.lecture_table_td}>{lecture.description}</td>
                          <td className={style.lecture_table_td_actions}>
                            <button
                              className={style.lecture_button_editar}
                              onClick={() => Router.push(`/editarPalestra/${idLocal}`)}
                            >
                              Editar
                            </button>
                            <button
                              className={style.lecture_button_excluir}
                              onClick={() => excluirPalestra(idLocal)}
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

export default Palestra
