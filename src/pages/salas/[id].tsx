import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { ApiLink, ApiLinkClass } from '@/types/api-link.types'
import React, { useEffect, useState } from 'react'
import { Room } from '@/types/room.types'
import RoomService from '@/services/room.service'
import style from '@/styles/EditarSala.module.css'
import AppLayout from '@/layout/AppLayout'
import Button from '@mui/material/Button'
const editarSala: NextPage = () => {
  const router = useRouter()
  const idSala = router.query.id
  // @ts-ignore
  const [sala, setSala] = useState<Room>({
    name: '',
    description: '',
    event: '',
    lectures: [],
  })

  function getSala() {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/rooms/${idSala}`
    RoomService.get(url)
      .then((response) => {
        setSala(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function editarSala() {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/rooms/${idSala}`
    RoomService.update(url, sala)
      .then(() => {
        Router.push('/salas')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getSala()
  }, [idSala])

  return (
    <AppLayout title='Editação da Sala'>
      <main>
        <section className={style.editar_sala_section}>
          <article className={style.editar_events_article_checkbox}>
            <label className={style.editar_events_label_checkbox}>
              <span>Ativar Sala</span>
              <input
                type='checkbox'
                checked={sala.active}
                className={style.editar_events_article_checkbox}
                onChange={(e) => {
                  setSala({ ...sala, active: e.target.checked })
                }}
              />
            </label>
          </article>
          <article className={style.editar_sala_article}>
            <label className={style.editar_sala_label}>
              <span>Nome da Sala</span>
              <input
                type='text'
                value={sala.name}
                className={style.editar_sala_input}
                onChange={(e) => setSala({ ...sala, name: e.target.value })}
              />
            </label>
            <label className={style.editar_sala_label}>
              <span>Descrição da Sala</span>
              <input
                type='text'
                value={sala.description}
                className={style.editar_sala_input}
                onChange={(e) => setSala({ ...sala, description: e.target.value })}
              />
            </label>
          </article>
          <article className={style.editar_sala_article_button}>
            <Button
              style={{ marginRight: '2%', backgroundColor: '#B40707' }}
              variant='contained'
              onClick={() => Router.push('/salas')}
            >
              cancelar
            </Button>
            <Button style={{ backgroundColor: '#4784ED' }} variant='contained' onClick={editarSala}>
              Salvar
            </Button>
          </article>
        </section>
      </main>
    </AppLayout>
  )
}

export default editarSala
