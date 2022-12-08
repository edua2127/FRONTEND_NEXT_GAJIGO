import type { NextPage } from 'next'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { Room } from '@/types/room.types'
import style from '@/styles/Room.module.css'
import RoomService from '@/services/room.service'
import { ApiLink, ApiLinkClass } from '@/types/api-link.types'
import AppLayout from '@/layout/AppLayout'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Button from '@mui/material/Button'
const Salas: NextPage = () => {
  const idEvent = useSelector((state: RootState) => state).reduxId.idEvent
  const [salas, setSalas] = useState<Room[]>([])

  useEffect(() => {
    if (idEvent === '') {
      Router.push('/events')
    }
  }, [idEvent])

  function getSalas() {
    console.clear()
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/events/${idEvent}/rooms`
    RoomService.getAll(url)
      .then((response) => {
        setSalas(response._embedded.rooms)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getSalas()
  }, [idEvent])

  function excluirSala(id) {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`
    RoomService.delete(url)
      .then(() => {
        getSalas()
      })
      .catch((error) => {
        console.log(error)
        alert('existe alguma dependecia com essa sala')
      })
  }

  return (
    <AppLayout title='Salas do Evento'>
      <main>
        <section className={style.room_section}>
          <article className={style.room_article_cadastro_and_listar}>
            <Button style={{marginRight: '2%', backgroundColor: '#1DBF17'}} variant="contained" onClick={()=> Router.push(`/salas/new`)}>Cadastrar</Button>
            <Button style={{ backgroundColor: '#B40707'}} variant="contained" onClick={()=> Router.push('/events')}>Voltar</Button>
          </article>
          <article className={style.room_article_table}>
            <table className={style.room_table}>
              <thead className={style.room_table_thead}>
                <tr className={style.room_table_tr}>
                  <th className={style.room_table_th}>Nome</th>
                  <th className={style.room_table_th}>Descrição</th>
                  <th className={style.room_table_th}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {salas.length > 0 &&
                  salas.map((sala) => {
                    const idRoom = sala._links.self.href.split('/').pop()
                    return (
                      <tr className={style.room_table_tr} key={idRoom}>
                        <td className={style.room_table_td}>{sala.name}</td>
                        <td className={style.room_table_td}>{sala.description}</td>
                        <td className={style.room_table_td_actions}>
                          <button
                            className={style.room_button_editar}
                            onClick={() => Router.push(`/salas/${idRoom}`)}
                          >
                            Editar
                          </button>
                          <button
                            className={style.room_button_excluir}
                            onClick={() => excluirSala(idRoom)}
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

export default Salas
