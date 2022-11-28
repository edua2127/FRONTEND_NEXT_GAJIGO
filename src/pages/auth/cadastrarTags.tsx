import NavBar from '@/layout/NavBar'
import type {NextPage} from 'next'
import Router from "next/router";
import React, {useState} from "react";
import style from '@/styles/cadastroLinguagens.module.css'
import {Tag} from "@/types/tag.types";
import TagService from "@/services/tag.service";

const CadastroTags: NextPage = () => {

    const [tag, setTag] = useState<Tag>(new Tag())

    function cadastrar() {
        TagService.create(tag)
            .then(() => {
                console.log('cadastro realizado com sucesso')
                Router.push('/auth/tags')
            }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <NavBar>
            <>
                <header>
                    <h1>Cadastro de Tags</h1>
                </header>
                <main>
                    <section className={style.cadastro_palestra_section}>
                        <article className={style.cadastro_palestra_article}>
                            <label className={style.cadastro_palestra_label}>
                                <span>Nome da Tag</span>
                                <input type="text" placeholder="Nome da Tag" className={style.cadastro_palestra_input}
                                       value={tag.name}
                                       onChange={(e) => setTag({...tag, name: e.target.value})}/>
                            </label>
                            <label className={style.cadastro_palestra_label}>
                                <span>Descrição da Tag</span>
                                <input type="text" placeholder="Descrição da Tag"
                                       className={style.cadastro_palestra_input}
                                       value={tag.description}
                                       onChange={(e) => setTag({...tag, description: e.target.value})}/>
                            </label>
                        </article>
                        <article className={style.cadastro_palestra_article_button}>
                            <button className={style.cadastro_palestra_button_cancelar}  onClick={() => Router.back()}>Voltar</button>
                            <button className={style.cadastro_palestra_button}  onClick={cadastrar}>Cadastrar</button>
                        </article>
                    </section>
                </main>
            </>
        </NavBar>
    )

}

export default CadastroTags