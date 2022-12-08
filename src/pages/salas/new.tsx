import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { Room } from '@/types/room.types'
import { useEffect, useState } from 'react'
import style from '@/styles/CadastroSala.module.css'
import RoomService from '@/services/room.service'
import AppLayout from '@/layout/AppLayout'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
const CadastrarSala: NextPage = () => {
  const idEvent = useSelector((state: RootState) => state).reduxId.idEvent
  // @ts-ignore
  const [room, setRoom] = useState<Room>({
    name: '',
    description: '',
    event: '',
    lectures: [],
  })

  function cadastrar() {
    RoomService.create(room)
      .then(() => {
        console.log('cadastrado com sucesso')
        Router.back()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function getEvent() {
    const event = `http://localhost:8080/api/events/${idEvent}`
    setRoom({ ...room, event: event })
  }

  useEffect(() => {
    getEvent()
  }, [idEvent])

  return (
    <AppLayout title='Cadastrar da Sala'>
      <header className={style.cadastro_events_header}>
        <h1>Cadastrar Sala</h1>
      </header>
      <main>
        <section className={style.cadastro_events_section}>
          <article className={style.cadastro_events_article}>
            <label className={style.cadastro_events_label}>
              <span>Nome da Sala</span>
              <input
                type='text'
                value={room.name}
                className={style.cadastro_events_input}
                onChange={(e) => setRoom({ ...room, name: e.target.value })}
              />
            </label>
            <label className={style.cadastro_events_label}>
              <span>Descrição da Sala</span>
              <input
                type='text'
                value={room.description}
                className={style.cadastro_events_input}
                onChange={(e) => setRoom({ ...room, description: e.target.value })}
              />
            </label>
          </article>
          <article className={style.cadastro_events_article_button}>
            <Button
              style={{ marginRight: '2%', backgroundColor: '#B40707' }}
              variant='contained'
              onClick={() => Router.push('/salas')}
            >
              cancelar
            </Button>
            <Button style={{ backgroundColor: '#1DBF17' }} variant='contained' onClick={cadastrar}>
              Cadastrar
            </Button>
          </article>
        </section>
      </main>
    </AppLayout>
  )
}

export default CadastrarSala
