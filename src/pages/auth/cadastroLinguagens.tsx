import NavBar from '@/layout/NavBar'
import type { NextPage } from 'next'
import Router from 'next/router'
import React, { useState } from 'react'
import style from '@/styles/cadastroLinguagens.module.css'
import { Language } from '@/types/language.types'
import LanguagesService from '@/services/languages.service'
import AppLayout from '@/layout/AppLayout'
const CadastroLinguagens: NextPage = () => {
    const [language, setLanguage] = useState<Language>(new Language())

    function cadastrar() {
        LanguagesService.create(language)
            .then(() => {
                console.log('cadastro realizado com sucesso')
                Router.push('/auth/linguagens')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <AppLayout text='Cadastro de Linguagens'>
            <>
                <main>
                    <section className={style.cadastro_palestra_section}>
                        <article className={style.cadastro_palestra_article}>
                            <label className={style.cadastro_palestra_label}>
                                <span>Nome da Linguagem</span>
                                <input
                                    type='text'
                                    placeholder='Nome da Linguagem'
                                    className={style.cadastro_palestra_input_grande}
                                    value={language.name}
                                    onChange={(e) =>
                                        setLanguage({ ...language, name: e.target.value })
                                    }
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
                            <button className={style.cadastro_palestra_button} onClick={cadastrar}>
                                Cadastrar
                            </button>
                        </article>
                    </section>
                </main>
            </>
        </AppLayout>
    )
}

export default CadastroLinguagens
