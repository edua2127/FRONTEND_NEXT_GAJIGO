import type { NextPage } from 'next'
import NavBar from '@/layout/NavBar'
import React from 'react'
import style from '@/styles/CadastroEvents.module.css'
import UserService from "@/services/user.service";
const CadastroEvents: NextPage = () => {
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [dateDeInicio, setDateDeInicio] = React.useState('')
    const [dateDeFim, setDateDeFim] = React.useState('')
    const [modoDeAtendimento, setModoDeAtendimento] = React.useState('')
    const [statusDoEvento, setStatusDoEvento] = React.useState('')

    function cadastroEvento() {
            const data = {
                name: name,
                attendanceMode: modoDeAtendimento,
                interval: {
                    startDate: dateDeInicio,
                    endDate: dateDeFim,
                },
                active: true,
                owner: 'temp',
                description: description,
            }
            console.log(data)
    }

    return (
        <NavBar>
            <>
                <header className={style.cadastro_events_header}>
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
                                <input value={dateDeInicio.toString()} onChange={(e) => setDateDeInicio(e.target.value)} type="date" className={style.cadastro_events_input}/>
                            </label>
                            <label className={style.cadastro_events_label}>
                                <span>Data de Fim</span>
                                <input value={dateDeFim.toString()} onChange={(e) => setDateDeFim(e.target.value)} type="date" className={style.cadastro_events_input}/>
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
                            <button onClick={cadastroEvento} className={style.btn_grad}>Cadastrar</button>
                        </article>
                    </section>
                </main>
            </>
        </NavBar>
    )
}

export default CadastroEvents