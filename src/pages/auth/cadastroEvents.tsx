import type {NextPage} from 'next'
import NavBar from '@/layout/NavBar'
import React from 'react'
import style from '@/styles/CadastroEvents.module.css'
import UserService from "@/services/user.service";
import EventService from '@/services/event.service';
import {Event} from '@/types/event.types';

import Router from 'next/router'
const CadastroEvents: NextPage = () => {
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [dateDeInicio, setDateDeInicio] = React.useState('')
    const [dateDeFim, setDateDeFim] = React.useState('')
    const [modoDeAtendimento, setModoDeAtendimento] = React.useState('')
    const [statusDoEvento, setStatusDoEvento] = React.useState('')
    const [owner, setOwner] = React.useState('')
    const [location, setLocation] = React.useState('')
    function cadastroEvento() {
        const evento = criaEvento()
        console.log(evento)
        EventService.create(evento).then(() => {
            console.log('Evento criado com sucesso')
            Router.push('/auth/events')
        }).catch((error) => {
            console.log('Erro ao criar evento: ' + error)
        } )

    }

    function criaEvento() {
        const evento = new Event()
        evento.name = name
        evento.attendanceMode = modoDeAtendimento
        evento.interval.startDate = dateDeInicio
        evento.interval.endDate = dateDeFim
        evento.owner = owner
        evento.active = true
        evento.description = description
        evento.owner = owner
        evento.attendanceMode = modoDeAtendimento
        evento.status = statusDoEvento
        evento.location = location
        return evento
    }

    async function transformaIdDoCorrentUserEmUrl() {
        const user = await UserService.getCorrentUser();
        setOwner('http://localhost:8080/api/users/' + user.id);
    }

    React.useEffect(() => {
        transformaIdDoCorrentUserEmUrl();
    }, [])

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
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text"
                                       className={style.cadastro_events_input}/>
                            </label>
                            <label className={style.cadastro_events_label}>
                                <span>Descrição</span>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                                          className={style.cadastro_events_input}/>
                            </label>
                        </article>
                        <article className={style.cadastro_events_article}>
                            <label className={style.cadastro_events_label}>
                                <span>Data de Início</span>
                                <input value={dateDeInicio.toString()} onChange={(e) => setDateDeInicio(e.target.value)}
                                       type="datetime-local" className={style.cadastro_events_input}/>
                            </label>
                            <label className={style.cadastro_events_label}>
                                <span>Data de Fim</span>
                                <input value={dateDeFim.toString()} onChange={(e) => setDateDeFim(e.target.value)}
                                       type="datetime-local" className={style.cadastro_events_input}/>
                            </label>
                        </article>
                        <article className={style.cadastro_events_article}>
                            <label className={style.cadastro_events_label}>
                                <span>Modo de Atendimento</span>
                                <select value={modoDeAtendimento} onChange={(e) => setModoDeAtendimento(e.target.value)}
                                        className={style.cadastro_events_input}>
                                    <option value="">Selecione</option>
                                    <option value="Offline">Presencial</option>
                                    <option value="Online">Remoto</option>
                                    <option value={"Mixed"}>Remoto e Presencial</option>
                                </select>
                            </label>
                            <label className={style.cadastro_events_label}>
                                <span>Status do Evento</span>
                                <select value={statusDoEvento} onChange={(e) => setStatusDoEvento(e.target.value)}
                                        className={style.cadastro_events_input}>
                                    <option value="">Selecione</option>
                                    <option value="EventCancelled">Cancelado</option>
                                    <option value="EventPostponed">Adiado</option>
                                    <option value={"EventScheduled"}>Agendado</option>
                                    <option value={"EventRescheduled"}>Reagendado</option>
                                </select>
                            </label>
                        </article>
                        <article className={style.cadastro_events_article}>
                            {modoDeAtendimento === 'Offline' || modoDeAtendimento === 'Mixed'  ? 
                            (<label className={style.cadastro_events_label}>
                                <span>Localização</span>
                                <input value={location} className={style.cadastro_palestra_input_grande} onChange={(e) => setLocation(e.target.value)} type="text" />
                            </label>) : 
                            (<label className={style.cadastro_events_label}>
                                <span>Localização</span>
                                <input value={location} className={style.cadastro_palestra_input_grande} onChange={(e) => setLocation(e.target.value)} type="text" disabled/>
                            </label>)}
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