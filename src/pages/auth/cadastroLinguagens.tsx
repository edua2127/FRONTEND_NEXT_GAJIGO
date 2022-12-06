import type { NextPage } from 'next'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '@/styles/cadastroLinguagens.module.css'
import AppLayout from '@/layout/AppLayout'
import { useCreateLanguageMutation } from '@/store/languages/api'
const CadastroLinguagens: NextPage = () => {
  const [name, setName] = useState('')
  const [saveLanguage, { isSuccess }] = useCreateLanguageMutation()

  useEffect(() => {
    if (isSuccess) {
      Router.push('/auth/linguagens')
    }
  }, [isSuccess])

  return (
    <AppLayout title='Cadastro de Linguagens'>
      <main>
        <section className={style.cadastro_palestra_section}>
          <article className={style.cadastro_palestra_article}>
            <label className={style.cadastro_palestra_label}>
              <span>Nome da Linguagem</span>
              <input
                type='text'
                placeholder='Nome da Linguagem'
                className={style.cadastro_palestra_input_grande}
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <button
              className={style.cadastro_palestra_button}
              onClick={() => saveLanguage({ name })}
            >
              Cadastrar
            </button>
          </article>
        </section>
      </main>
    </AppLayout>
  )
}

export default CadastroLinguagens
