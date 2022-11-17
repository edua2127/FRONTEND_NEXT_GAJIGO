import type { NextPage } from 'next'
import NavBar from '@/layout/NavBar'
import React from 'react'
import style from '@/styles/CadastroPalestra.module.css'

const CadastroPalestra: NextPage = () => {
    const dateType = new Date(Date.now())

    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [dateDeInicio, setDateDeInicio] = React.useState(dateType)
    const [dateDeFim, setDateDeFim] = React.useState(dateType)
    const [modoDeAtendimento, setModoDeAtendimento] = React.useState('')
    const [sala, setSala] = React.useState('')
    const [tag, setTag] = React.useState('')

    function cadastroPalestra() {
        const data = {
            name,
            description,
            dateDeInicio,
            dateDeFim,
            modoDeAtendimento,
            sala,
            tag
        }
        console.log(data)
    }

    return (
        <NavBar>
            <>
                <header>
                    <h1>Cadastro de Palestras</h1>
                </header>
                <main>
                    <section className={style.cadastro_palestra_section}>
                        <article className={style.cadastro_palestra_article}>
                            <label className={style.cadastro_palestra_label}>
                                <span>Nome da Palestra</span>
                                <input type="text" className={style.cadastro_palestra_input} value={name}
                                onChange={(e) => setName(e.target.value)}/>
                            </label>
                            <label>
                                <span>Descrição</span>
                                <textarea className={style.cadastro_palestra_input}
                                value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </label>
                        </article>
                        <article className={style.cadastro_palestra_article}>
                            <label className={style.cadastro_palestra_label}>
                                <span>Sala</span>
                                <select className={style.cadastro_palestra_input}
                                value={sala} onChange={(e) => setSala(e.target.value)}>
                                    <option value="1">Sala 1</option>
                                    <option value="2">Sala 2</option>
                                    <option value="3">Sala 3</option>
                                </select>
                            </label>
                            <label>
                                <span>Tag</span>
                                <textarea className={style.cadastro_palestra_input}
                                value={tag} onChange={(e) => setTag(e.target.value)}/>
                            </label>
                        </article>
                        <article className={style.cadastro_palestra_article}>
                            <label className={style.cadastro_palestra_label}>
                                <span>Data de Início</span>
                                <input type="date" className={style.cadastro_palestra_input}
                                value={dateDeInicio.toString()} onChange={(e) => setDateDeInicio(new Date(e.target.value))}/>
                            </label>
                            <label>
                                <span>Data de Fim</span>
                                <input type="date" className={style.cadastro_palestra_input}
                                value={dateDeFim.toString()} onChange={(e) => setDateDeFim(new Date(e.target.value))}/>
                            </label>
                        </article>
                        <article className={style.cadastro_palestra_article}>
                            <label className={style.cadastro_palestra_label}>
                                <span>Modo de Atendimento</span>
                                <select className={style.cadastro_palestra_input}
                                value={modoDeAtendimento} onChange={(e) => setModoDeAtendimento(e.target.value)}>
                                    <option value="">Selecione</option>
                                    <option value="Offline">Presencial</option>
                                    <option value="Online">Remoto</option>
                                    <option value={"Mixed"}>Remoto e Presencial</option>
                                </select>
                            </label>
                        </article>
                        <article className={style.cadastro_palestra_article_button}>
                            <button className={style.cadastro_palestra_button}>Cadastrar</button>
                        </article>
                    </section>
                </main>
            </>
        </NavBar>
    )
}

export default CadastroPalestra
