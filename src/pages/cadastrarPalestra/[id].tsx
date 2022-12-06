import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { Lecture } from '@/types/lecture.types'
import React, { useEffect, useState } from 'react'
import style from '@/styles/CadastroPalestra.module.css'

import AppLayout from '@/layout/AppLayout'
import { useCreateLectureMutation } from '@/store/lectures/api'
import { useListUsersQuery } from '@/store/users/api'
import { useListTagsQuery } from '@/store/tags/api'
import { useListLanguagesQuery } from '@/store/languages/api'
import { convertQueryToNumberOrSkip } from '@/utils'
import { useGetRoomByIdQuery } from '@/store/rooms/api'
import roomService from '@/services/room.service'

import { ApiLink, ApiLinkClass } from '@/types/api-link.types'
const CadastroPalestra: NextPage = () => {
  const router = useRouter()
  const idRoom = router.query.id
  const [lecture, setLecture] = useState<Partial<Lecture>>({
    name: '',
    description: '',
    room: `${process.env.NEXT_PUBLIC_API_URL}/rooms/${idRoom}`,
    event: '',
    language: '',
    tags: [],
    interval: {
      startDate: '',
      endDate: '',
    },
    attendanceMode: '',
  })

  const [saveLecture, { isSuccess }] = useCreateLectureMutation()
  const { data: room, isSuccess: foundRoom } = useGetRoomByIdQuery(
    convertQueryToNumberOrSkip(router, idRoom),
  )
  const { data: lecturers } = useListUsersQuery(null)
  const { data: languages } = useListLanguagesQuery(null)
  const { data: tags } = useListTagsQuery(null)

  useEffect(() => {
    if (isSuccess) {
      Router.back()
    } else {
      console.log(lecture)
    }
  }, [isSuccess])

  useEffect(() => {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/rooms/${idRoom}/event`
    roomService
      .get(url)
      .then((response) => {
        // @ts-ignore
        setLecture({ ...lecture, event: response._links.self.href })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleChangeDatadeInicio = (event: any) => {
    const startDate = event.target.value

    // Typescript complains about this code, claiming the other side of
    // interval could be undefined. This seems to me to be a typescript
    // bug as even if the typing was wrong it should complain about the
    // current side as well.
    setLecture({
      ...lecture,
      // @ts-ignore
      interval: { ...lecture.interval, startDate: startDate === undefined ? '' : startDate },
    })
  }

  const handleChangeDatadeFim = (event: any) => {
    const endDate = event.target.value

    setLecture({
      ...lecture,
      // @ts-ignore
      interval: { ...lecture.interval, endDate: endDate === undefined ? '' : endDate },
    })
  }

  const cadastrarPalestra = () => {
    saveLecture(lecture)
    console.log(lecture)
  }

  return (
    <AppLayout title='Cadastro da Palestra'>
      <main>
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
                {languages &&
                  languages.length > 0 &&
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
                value={lecture && lecture.speakers ? lecture.speakers[0] : ''}
                onChange={(e) => setLecture({ ...lecture, speakers: [e.target.value] })}
              >
                <option value=''>Selecione</option>
                {lecturers &&
                  lecturers.length > 0 &&
                  lecturers.map((palestrante, index) => {
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
                value={lecture && lecture.tags ? lecture.tags[0] : ''}
                onChange={(e) => setLecture({ ...lecture, tags: [e.target.value] })}
              >
                <option value=''>Selecione</option>
                {tags &&
                  tags.length > 0 &&
                  tags.map((tag, index) => {
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
                value={lecture.interval?.startDate}
                onChange={(e) => handleChangeDatadeInicio(e)}
              />
            </label>
            <label className={style.cadastro_palestra_label}>
              <span>Data de Fim</span>
              <input
                className={style.cadastro_palestra_input}
                type='datetime-local'
                value={lecture.interval?.endDate}
                onChange={(e) => handleChangeDatadeFim(e)}
              />
            </label>
          </article>
          <article className={style.cadastro_palestra_article_button}>
            <button
              onClick={() => Router.back()}
              className={style.cadastro_palestra_button_cancelar}
            >
              Cancelar
            </button>
            <button onClick={cadastrarPalestra} className={style.cadastro_palestra_button}>
              Cadastrar
            </button>
          </article>
        </section>
      </main>
    </AppLayout>
  )
}

export default CadastroPalestra
