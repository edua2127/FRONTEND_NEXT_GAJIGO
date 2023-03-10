import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { ApiLink, ApiLinkClass } from '@/types/api-link.types'
import React, { useEffect, useState } from 'react'
import style from '@/styles/EditarLinguagem.module.css'
import { Language } from '@/types/language.types'
import LanguageService from '@/services/languages.service'
import AppLayout from '@/layout/AppLayout'
const EditarLinguagem: NextPage = () => {
  const router = useRouter()
  const idLinguagem = router.query.id

  const [language, setLanguage] = useState<Language>({
    active: true,
    name: '',
    id: 0,
    _links: { self: { href: '' } },
    created: new Date(),
    updated: new Date(),
    removed: new Date(),
  })

  function getLanguage() {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/languages/${idLinguagem}`
    console.log(url.href)
    LanguageService.get(url)
      .then((response) => {
        setLanguage(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function editar() {
    const url: ApiLink = new ApiLinkClass()
    url.href = `${process.env.NEXT_PUBLIC_API_URL}/languages/${idLinguagem}`

    const id: number = parseInt(idLinguagem as string)

    const data = {
      id: id,
      created: language.created,
      updated: language.updated,
      removed: language.removed,
      active: language.active,
      name: language.name,
      lectures: [],
    }

    LanguageService.update(url, data)
      .then(() => {
        console.log('editado com sucesso')
        Router.push(`/auth/linguagens`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getLanguage()
  }, [])

  return (
    <AppLayout title='Editar Linguagem'>
      <header className={style.user_page_header}>
        <h1>Editar Linguagem</h1>
      </header>
      <main>
        <section className={style.cadastro_palestra_section}>
          <article className={style.editar_events_article_checkbox}>
            <label className={style.editar_events_label_checkbox}>
              <span>Ativar Linguagem</span>
              <input
                className={style.cadastro_palestra_input}
                type='checkbox'
                checked={language.active}
                onChange={(e) => setLanguage({ ...language, active: e.target.checked })}
              />
            </label>
          </article>
          <article className={style.cadastro_palestra_label}>
            <label className={style.cadastro_palestra_label}>
              <span>Nome da Linguagem</span>
              <input
                type='text'
                value={language.name}
                className={style.cadastro_palestra_input_grande}
                onChange={(e) => setLanguage({ ...language, name: e.target.value })}
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
      </main>
    </AppLayout>
  )
}

export default EditarLinguagem
