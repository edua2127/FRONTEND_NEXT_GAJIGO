import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import style from '@/styles/CadastroEvents.module.css'
import AppLayout from '@/layout/AppLayout'
import { useCreateEventMutation } from '@/store/events/api'
import { useGetCurrentUserQuery } from '@/store/auth/api'
import Router from 'next/router'
import Button from '@mui/material/Button'
const CadastroEvents: NextPage = () => {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')
  const [attendanceMode, setAttendanceMode] = React.useState('')
  const [status, setStatus] = React.useState('')
  const [owner, setOwner] = React.useState('')
  const [location, setLocation] = React.useState('')

  const [saveEvent, { isSuccess }] = useCreateEventMutation()
  const { data: currentUser } = useGetCurrentUserQuery()

  const criaEvento = () => ({
    name,
    description,
    interval: {
      startDate,
      endDate,
    },
    attendanceMode,
    status,
    owner,
    location,
  })

  useEffect(() => {
    if (isSuccess) {
      Router.push('/events')
    }
  }, [isSuccess])

  useEffect(() => {
    setOwner('/' + currentUser?.id)
  }, [currentUser])

  return (
    <AppLayout title='Cadastro de Eventos'>
      <main>
        <section className={style.cadastro_events_section}>
          <article className={style.cadastro_events_article}>
            <label className={style.cadastro_events_label}>
              <span>Nome do Evento</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                className={style.cadastro_events_input}
              />
            </label>
            <label className={style.cadastro_events_label}>
              <span>Descrição</span>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={style.cadastro_events_input}
              />
            </label>
          </article>
          <article className={style.cadastro_events_article}>
            <label className={style.cadastro_events_label}>
              <span>Data de Início</span>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type='datetime-local'
                className={style.cadastro_events_input}
              />
            </label>
            <label className={style.cadastro_events_label}>
              <span>Data de Fim</span>
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                type='datetime-local'
                className={style.cadastro_events_input}
              />
            </label>
          </article>
          <article className={style.cadastro_events_article}>
            <label className={style.cadastro_events_label}>
              <span>Modo de Atendimento</span>
              <select
                value={attendanceMode}
                onChange={(e) => setAttendanceMode(e.target.value)}
                className={style.cadastro_events_input}
              >
                <option value=''>Selecione</option>
                <option value='Offline'>Presencial</option>
                <option value='Online'>Remoto</option>
                <option value={'Mixed'}>Remoto e Presencial</option>
              </select>
            </label>
            <label className={style.cadastro_events_label}>
              <span>Status do Evento</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={style.cadastro_events_input}
              >
                <option value=''>Selecione</option>
                <option value='EventCancelled'>Cancelado</option>
                <option value='EventPostponed'>Adiado</option>
                <option value={'EventScheduled'}>Agendado</option>
                <option value={'EventRescheduled'}>Reagendado</option>
              </select>
            </label>
          </article>
          <article className={style.cadastro_events_article}>
            {attendanceMode === 'Offline' || attendanceMode === 'Mixed' ? (
              <label className={style.cadastro_events_label}>
                <span>Localização</span>
                <input
                  value={location}
                  className={style.cadastro_palestra_input_grande}
                  onChange={(e) => setLocation(e.target.value)}
                  type='text'
                />
              </label>
            ) : (
              <label className={style.cadastro_events_label}>
                <span>Localização</span>
                <input
                  value={location}
                  className={style.cadastro_palestra_input_grande}
                  onChange={(e) => setLocation(e.target.value)}
                  type='text'
                  disabled
                />
              </label>
            )}
          </article>
          <article className={style.cadastro_events_article_button}>
            <Button
              style={{ marginRight: '2%', backgroundColor: '#B40707' }}
              variant='contained'
              onClick={() => Router.push('/events')}
            >
              cancelar
            </Button>
            <Button
              style={{ backgroundColor: '#1DBF17' }}
              variant='contained'
              onClick={() => saveEvent(criaEvento())}
            >
              Cadastrar
            </Button>
          </article>
        </section>
      </main>
    </AppLayout>
  )
}

export default CadastroEvents
