import type { NextPage } from 'next'
import Router from 'next/router'
import { ApiLink, ApiLinkClass } from '@/types/api-link.types'
import { useEffect, useState } from 'react'
import { Lecture } from '@/types/lecture.types'
import style from '@/styles/Lecture.module.css'
import LectureService from '@/services/lecture.service'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import AppLayout from '@/layout/AppLayout'

import Button from '@mui/material/Button'
const Palestra: NextPage = () => {
  const idEvent = useSelector((state: RootState) => state).reduxId.idEvent
  const [lectures, setLectures] = useState<Lecture[]>([])

  function getPalestrasDoEvento() {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/events/${idEvent}/lectures`
    LectureService.getAll(url)
      .then((response) => {
        setLectures(response._embedded.lectures)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function excluirPalestra(id: number) {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/lectures/${id}`
    LectureService.delete(url)
      .then(() => {
        getPalestrasDoEvento()
      })
      .catch((error) => {
        console.log(error)
        alert('Erro ao excluir palestra, existe alguma dependência com essa palestra')
      })
  }
  useEffect(() => {
    getPalestrasDoEvento()
  }, [idEvent])

  return (
    <AppLayout title='Palestras do Evento'>
      <main>
        <section className={style.lecture_section}>
          <article className={style.lecture_article_cadastro_and_voltar}>
            <Button
              style={{ marginRight: '2%', backgroundColor: '#1DBF17' }}
              variant='contained'
              onClick={() => Router.push(`/palestras/new`)}
            >
              Cadastrar
            </Button>
            <Button
              style={{ backgroundColor: '#B40707' }}
              variant='contained'
              onClick={() => Router.push('/events')}
            >
              Voltar
            </Button>
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
                    const id = Number(lecture._links.self.href.split('/').pop())
                    return (
                      <tr key={lecture.id} className={style.lecture_table_tr}>
                        <td className={style.lecture_table_td}>{lecture.name}</td>
                        <td className={style.lecture_table_td}>{lecture.description}</td>
                        <td className={style.lecture_table_td_actions}>
                          <button
                            className={style.lecture_button_editar}
                            onClick={() => Router.push(`/display-totem/${id}`)}
                          >
                            Totem
                          </button>
                          <button
                            className={style.lecture_button_editar}
                            onClick={() => Router.push(`/palestras/${id}`)}
                          >
                            Editar
                          </button>
                          <button
                            className={style.lecture_button_excluir}
                            onClick={() => excluirPalestra(id)}
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
