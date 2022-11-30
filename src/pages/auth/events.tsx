import type { NextPage } from 'next'
import NavBar from '@/layout/NavBar'
import Router from 'next/router'
import style from '@/styles/Events.module.css'
import { useEffect, useState } from 'react'
import UserService from '@/services/user.service'
import EventService from '@/services/event.service'
import { IEvent } from '@/types/event.types'
import { ApiLink, ApiLinkClass } from '@/types/api-link.types'
import AppLayout from '@/layout/AppLayout'

const Event: NextPage = () => {
  const [events, setEvents] = useState<IEvent[]>([])
  const [idCorrentUser, setUrlCorrentUser] = useState<number>(0)

  async function getEvents() {
    const url: ApiLink = new ApiLinkClass()

    url.href = `${process.env.NEXT_PUBLIC_API_URL}/users/${idCorrentUser}/events`

    EventService.getAll(url).then((response) => {
      console.log(response._embedded.events)
      setEvents(response._embedded.events)
    })
  }

  async function deleteEvents(id: number) {
    const url: ApiLink = new ApiLinkClass()

    url.href = `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`

    EventService.delete(url)
      .then((response) => {
        console.log(response)
        getEvents()
      })
      .catch((error) => {
        console.log(error)
        alert('existe alguma dependecia com esse evento')
      })
  }

  async function getCorrentUser() {
    const user = await UserService.getCorrentUser()
    setUrlCorrentUser(user.id)
    console.log(user)
  }

  useEffect(() => {
    getCorrentUser()
  }, [])

  useEffect(() => {
    if (idCorrentUser !== 0) {
      getEvents()
    }
  }, [idCorrentUser])

  return (
    <AppLayout text='Eventos'>
      <>
        <main>
          <section className={style.events_section}>
            <article className={style.events_article_cadastro_and_listar}>
              <button
                className={style.btn_grad}
                onClick={() => Router.push('/auth/cadastroEvents')}
              >
                Cadastrar
              </button>
            </article>
            <article className={style.events_article_table}>
              <table className={style.events_table}>
                <thead className={style.events_table_thead}>
                  <tr className={style.events_table_tr}>
                    <th className={style.events_table_th}>Nome do Evento</th>
                    <th className={style.events_table_th}>Descrição</th>
                    <th className={style.events_table_th}>Data de Inicio</th>
                    <th className={style.events_table_th}>Data de Terminio</th>
                    <th className={style.events_table_th}>Status do Evento</th>
                    <th className={style.events_table_th}>Modo de Atendimento</th>
                    <th className={style.events_table_th}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length > 0 &&
                    events.map((event) => {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      const id = event._links.self.href.split('/').pop()
                      const statusEventLocal = {
                        EventCancelled: 'Cancelado',
                        EventPostponed: 'Adiado',
                        EventScheduled: 'Agendado',
                        EventRescheduled: 'Reagendado',
                      }
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      const statusEvent = statusEventLocal[event.status]

                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      const description = event.description

                      return (
                        <tr key={id} className={style.events_table_tr}>
                          <td className={style.events_table_td}>{event.name}</td>
                          <td className={style.events_table_td}>{description}</td>
                          <td className={style.events_table_td}>{event.interval.startDate}</td>
                          <td className={style.events_table_td}>{event.interval.endDate}</td>
                          <td className={style.events_table_td}>{statusEvent}</td>
                          <td className={style.events_table_td}>{event.attendanceMode}</td>
                          <td className={style.events_table_td_actions}>
                            <button
                              className={style.events_button_selecionar}
                              onClick={() => Router.push(`/salas/${id}`)}
                            >
                              selecionar
                            </button>
                            <button
                              className={style.events_button_editar}
                              onClick={() => Router.push(`/editarEvents/${id}`)}
                            >
                              Editar
                            </button>
                            <button
                              className={style.events_button_excluir}
                              onClick={() => deleteEvents(id)}
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

export default Event
