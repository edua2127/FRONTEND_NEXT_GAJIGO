import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import NavBar from '@/layout/NavBar'
import { ApiLink, ApiLinkClass } from '@/types/api-link.types'
import React, { useEffect, useState } from 'react'
import style from '@/styles/EditarLinguagem.module.css'
import { Lecture } from '@/types/lecture.types'
import LectureService from '@/services/lecture.service'
import { Language } from '@/types/language.types'
import { Tag } from '@/types/tag.types'
import { User } from '@/types/user.types'
import { interval } from '@/types/event.types'
import TagService from '@/services/tag.service'
import UserService from '@/services/user.service'
import LanguageService from '@/services/languages.service'

import AppLayout from '@/layout/AppLayout'
const EditarPalestra: NextPage = () => {
  const router = useRouter()
  const idLecture = router.query.id

  const [lecture, setLecture] = useState<Lecture>(new Lecture())

  const [languages, setLanguages] = useState<Language[]>([])
  const [palestrantes, setPalestrantes] = useState<User[]>([])
  const [participantes, setParticipantes] = useState<User[]>([])
  const [tag, setTag] = useState<Tag[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  function getLecture() {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/lectures/${idLecture}`
    console.log(url.href)
    LectureService.get(url)
      .then((response) => {
        setLecture({ ...lecture, ...response })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function getLanguages() {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/languages`
    setLoading(true)
    LanguageService.getAll(url)
      .then((response) => {
        setLanguages(response._embedded.languages)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function getPalestrantesAndParticipantes() {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/users`
    UserService.get(url)
      .then((response) => {
        // @ts-ignore
        setPalestrantes(response._embedded.users.filter((user) => !user.admin))
        // @ts-ignore
        setParticipantes(response._embedded.users.filter((user) => !user.admin))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function getTags() {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/tags`
    TagService.get(url)
      .then((response) => {
        // @ts-ignore
        setTag(response._embedded.tags)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function editar() {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/lectures/${idLecture}`

    LectureService.update(url, lecture)
      .then((response) => {
        console.log(response)
        Router.back()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    setLoading(true)
    getLecture()
    getLanguages()
    getPalestrantesAndParticipantes()
    getTags()
    setLoading(false)
  }, [idLecture])

  const handleChangeDatadeInicio = (event: any) => {
    setLecture({ ...lecture, interval: { ...lecture.interval, startDate: event.target.value } })
  }

  const handleChangeDatadeFim = (event: any) => {
    setLecture({ ...lecture, interval: { ...lecture.interval, endDate: event.target.value } })
  }

  return (
    <AppLayout text='Edição da Palestra'>
      {loading ||
      lecture.speakers === undefined ||
      lecture.participants === undefined ||
      lecture.tags === undefined ? (
        <p>Carregando...</p>
      ) : (
        <section className={style.cadastro_palestra_section}>
          <article className={style.cadastro_palestra_article}>
            <label className={style.cadastro_palestra_label}>
              <span>Nome da Palestra</span>
              <input
                className={style.cadastro_palestra_input}
                type='text'
                value={lecture.name}
                onChange={(e) => setLecture({ ...lecture, name: e.target.value })}
              />
            </label>
            <label className={style.cadastro_palestra_label}>
              <span>Descrição da Palestra</span>
              <input
                className={style.cadastro_palestra_input}
                type='text'
                value={lecture.description}
                onChange={(e) => setLecture({ ...lecture, description: e.target.value })}
              />
            </label>
          </article>
          <article className={style.cadastro_palestra_article}>
            <label className={style.cadastro_palestra_label}>
              <span>Modo de Atendimento</span>
              <select
                className={style.cadastro_palestra_input}
                value={lecture.attendanceMode}
                onChange={(e) => setLecture({ ...lecture, attendanceMode: e.target.value })}
              >
                <option value=''>Selecione</option>
                <option value='Offline'>Presencial</option>
                <option value='Online'>Remoto</option>
                <option value={'Mixed'}>Remoto e Presencial</option>
              </select>
            </label>
            <label className={style.cadastro_palestra_label}>
              <span>Idioma da Palestra</span>
              <select
                className={style.cadastro_palestra_input}
                value={lecture.language}
                onChange={(e) => setLecture({ ...lecture, language: e.target.value })}
              >
                <option value=''>Selecione</option>
                {languages.length > 0 &&
                  languages.map((language, index) => {
                    return (
                      <option key={index} value={language._links.self.href}>
                        {language.name}
                      </option>
                    )
                  })}
              </select>
            </label>
          </article>
          <article className={style.cadastro_palestra_article}>
            <label className={style.cadastro_palestra_label}>
              <span>Palestrante Inicial da Palestra</span>
              <select
                className={style.cadastro_palestra_input}
                value={lecture.speakers[0]}
                onChange={(e) => setLecture({ ...lecture, speakers: [e.target.value] })}
              >
                <option value=''>Selecione</option>
                {palestrantes.length > 0 &&
                  palestrantes.map((palestrante, index) => {
                    return (
                      <option key={index} value={palestrante._links.self.href}>
                        {palestrante.name}
                      </option>
                    )
                  })}
              </select>
            </label>
            <label className={style.cadastro_palestra_label}>
              <span>Tag inical</span>
              <select
                className={style.cadastro_palestra_input}
                value={lecture.tags[0]}
                onChange={(e) => setLecture({ ...lecture, tags: [e.target.value] })}
              >
                <option value=''>Selecione</option>
                {tag.length > 0 &&
                  tag.map((tag, index) => {
                    return (
                      <option key={index} value={tag._links.self.href}>
                        {tag.name}
                      </option>
                    )
                  })}
              </select>
            </label>
          </article>
          <article className={style.cadastro_palestra_article}>
            <label className={style.cadastro_palestra_label}>
              <span>Data de Inicio</span>
              <input
                className={style.cadastro_palestra_input}
                type='datetime-local'
                value={lecture.interval.startDate}
                onChange={(e) => handleChangeDatadeInicio(e)}
              />
            </label>
            <label className={style.cadastro_palestra_label}>
              <span>Data de Fim</span>
              <input
                className={style.cadastro_palestra_input}
                type='datetime-local'
                value={lecture.interval.endDate}
                onChange={(e) => handleChangeDatadeFim(e)}
              />
            </label>
          </article>
          <article className={style.cadastro_palestra_article}>
            <label className={style.cadastro_palestra_label}>
              <span>Participante inicial</span>
              <select
                className={style.cadastro_palestra_input_grande}
                value={lecture.participants[0]}
                onChange={(e) => setLecture({ ...lecture, participants: [e.target.value] })}
              >
                <option value=''>Selecione</option>
                {participantes.length > 0 &&
                  participantes.map((participante, index) => {
                    return (
                      <option key={index} value={participante._links.self.href}>
                        {participante.name}
                      </option>
                    )
                  })}
              </select>
            </label>
          </article>
          <article className={style.cadastro_palestra_article_button}>
            <button
              onClick={() => Router.back()}
              className={style.cadastro_palestra_button_cancelar}
            >
              Cancelar
            </button>
            <button onClick={editar} className={style.cadastro_palestra_button}>
              Editar
            </button>
          </article>
        </section>
      )}
    </AppLayout>
  )
}

export default EditarPalestra
