import type { NextPage } from 'next'
import NavBar from '@/layout/NavBar'
import React from 'react'
import style from '@/styles/CadastroEvents.module.css'
const CadastroEvents: NextPage = () => {
    const dateType = new Date(Date.now())
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [dateDeInicio, setDateDeInicio] = React.useState(dateType)
    const [dateDeFim, setDateDeFim] = React.useState(dateType)
    const [modoDeAtendimento, setModoDeAtendimento] = React.useState('')
    const [statusDoEvento, setStatusDoEvento] = React.useState('')

    function cadastroEvento() {

        const data = {
            name,
            description,
            dateDeInicio,
            dateDeFim,
            modoDeAtendimento,
            statusDoEvento
        }
        console.log(data)
    }

    return (
        <NavBar>
            <>
                <header>
                    <h1>Cadastro de Eventos</h1>
                </header>
                <main>
                    <section className={style.cadastro_events_section}>
                        <article className={style.cadastro_events_article}>
                            <label className={style.cadastro_events_label}>
                                <span>Nome do Evento</span>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className={style.cadastro_events_input}/>
                            </label>
                            <label className={style.cadastro_events_label}>
                                <span>Descrição</span>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)}  className={style.cadastro_events_input} />
                            </label>
                        </article>
                        <article className={style.cadastro_events_article}>
                            <label className={style.cadastro_events_label}>
                                <span>Data de Início</span>
                                <input value={dateDeInicio.toString()} onChange={(e) => setDateDeInicio(new Date(e.target.value))} type="date" className={style.cadastro_events_input}/>
                            </label>
                            <label className={style.cadastro_events_label}>
                                <span>Data de Fim</span>
                                <input value={dateDeFim.toString()} onChange={(e) => setDateDeFim(new Date(e.target.value))} type="date" className={style.cadastro_events_input}/>
                            </label>
                        </article>
                        <article className={style.cadastro_events_article}>
                            <label className={style.cadastro_events_label}>
                                <span>Modo de Atendimento</span>
                                <select value={modoDeAtendimento} onChange={(e) => setModoDeAtendimento(e.target.value)} className={style.cadastro_events_input}>
                                    <option value="">Selecione</option>
                                    <option value="Offline">Presencial</option>
                                    <option value="Online">Remoto</option>
                                    <option value={"Mixed"}>Remoto e Presencial</option>
                                </select>
                            </label>
                            <label className={style.cadastro_events_label}>
                                <span>Status do Evento</span>
                                <select value={statusDoEvento} onChange={(e) => setStatusDoEvento(e.target.value)} className={style.cadastro_events_input}>
                                    <option value="">Selecione</option>
                                    <option value="EventCancelled">Cancelado</option>
                                    <option value="EventPostponed">Adiado</option>
                                    <option value={"EventScheduled"}>Agendado</option>
                                    <option value={"EventRescheduled"} >Reagendado</option>
                                </select>
                            </label>
                        </article>
                        <article className={style.cadastro_events_article_button}>
                            <button onClick={cadastroEvento} className={style.cadastro_events_button}>Cadastrar</button>
                        </article>
                    </section>
                </main>
            </>
        </NavBar>
    )
}

export default CadastroEvents