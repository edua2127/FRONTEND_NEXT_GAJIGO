import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import NavBar from '@/layout/NavBar'
import { ApiLink, ApiLinkClass } from '@/types/api-link.types'
import React, { useEffect, useState } from 'react'
import style from '@/styles/EditarLinguagem.module.css'
import { Tag } from '@/types/tag.types'
import TagService from '@/services/tag.service'
import AppLayout from '@/layout/AppLayout'
const EditarTag: NextPage = () => {
  const router = useRouter()
  const idTag = router.query.id

  const [tag, setTag] = useState<Tag>(new Tag())

  function getTag() {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/tags/${idTag}`
    console.log(url.href)
    TagService.get(url)
      .then((response) => {
        setTag(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function editar() {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/tags/${idTag}`
    const id: number = parseInt(idTag as string)
    const data = {
      id: id,
      created: tag.created,
      updated: tag.updated,
      removed: tag.removed,
      active: tag.active,
      name: tag.name,
      description: tag.description,
      taggedLectures: tag.taggedLectures,
    }

    TagService.update(url, data)
      .then(() => {
        console.log('editado com sucesso')
        Router.push(`/auth/tags`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getTag()
  }, [])

  return (
    <AppLayout text='Editação da Tag'>
      
        <section className={style.cadastro_palestra_section}>
          <article className={style.editar_events_article_checkbox}>
            <label className={style.editar_events_label_checkbox}>
              <span>Ativar Tag:</span>
              <input
                type='checkbox'
                checked={tag.active}
                className={style.editar_events_checkbox_input}
                onChange={(e) => {
                  setTag({ ...tag, active: e.target.checked })
                }}
              />
            </label>
          </article>
          <article className={style.cadastro_palestra_label}>
            <label className={style.cadastro_palestra_label}>
              <span>Nome da Tag</span>
              <input
                type='text'
                value={tag.name}
                className={style.cadastro_palestra_input_grande}
                onChange={(e) => setTag({ ...tag, name: e.target.value })}
              />
            </label>
            <label className={style.cadastro_palestra_label}>
              <span>Descrição da Tag</span>
              <input
                type='text'
                value={tag.description}
                className={style.cadastro_palestra_input_grande}
                onChange={(e) => setTag({ ...tag, description: e.target.value })}
              />
            </label>
          </article>
          <article className={style.cadastro_palestra_article_button}>
            <button
              className={style.cadastro_palestra_button_cancelar}
              onClick={() => Router.back()}
            >
              Voltar
            </button>
            <button className={style.cadastro_palestra_button} onClick={editar}>
              Editar
            </button>
          </article>
        </section>
      
    </AppLayout>
  )
}

export default EditarTag
