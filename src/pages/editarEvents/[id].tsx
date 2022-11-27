import Router, {useRouter} from "next/router";
import type {NextPage} from 'next'
import EventService from '@/services/event.service';
import {IEvent, Event} from "@/types/event.types";
import {ApiLink, ApiLinkClass} from '@/types/api-link.types';
import React, {useEffect, useState} from "react";
import NavBar from '@/layout/NavBar'
import style from '@/styles/EditarEvents.module.css'
const EditarEvento:NextPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const [event, setEvent] = useState<IEvent>(new Event())

    function resgataOsDadosDoEvento() {
        const url: ApiLink = new ApiLinkClass()
        url.href = `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`
        EventService.get(url).then((response) => {
            setEvent(response)
        })
    }

    function updateEvent() {
        const url: ApiLink = new ApiLinkClass()
        url.href = `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`
        console.log(url.href)
        EventService.update(url, event).then((response) => {
            Router.push('/auth/events')
        }).catch((error) => {
            console.log(error)
        })
    }


    useEffect(() => {
        resgataOsDadosDoEvento()
    }, [])

    return (
        <NavBar>
            <>
                <header className={style.editar_events_header}>
                   <h1>Editar Evento</h1>
                </header>
                <main>
                    <section className={style.editar_events_section}>
                        <article  className={style.editar_events_article}>
                            <label className={style.editar_events_label}>
                                <span>Nome do Evento</span>
                                <input className={style.editar_input} type="text" value={event.name}
                                    onChange={(e) => setEvent({...event, name: e.target.value})}/>
                            </label>
                            <label className={style.editar_events_label}>
                                <span>Descrição do Evento</span>
                                <input className={style.editar_input} type="text" value={event.description}
                                    onChange={(e) => setEvent({...event, description: e.target.value})}/>
                            </label>
                        </article>
                        <article className={style.editar_events_article}>
                            <label className={style.editar_events_label}>
                                <span>Data de Início</span>
                                <input className={style.editar_input}  type="datetime-local" value={event.interval.startDate}
                                    onChange={(e) => setEvent({...event, interval: {...event.interval, startDate: e.target.value}})}/>
                            </label>
                            <label className={style.editar_events_label}>
                                <span>Data de Fim</span>
                                <input className={style.editar_input}  type="datetime-local" value={event.interval.endDate}
                                    onChange={(e) => setEvent({...event, interval: {...event.interval, endDate: e.target.value}})}/>
                            </label>
                        </article>
                        <article className={style.editar_events_article}>
                            <label className={style.editar_events_label}>
                                <span>Modo de Atendimento</span>
                                <select value={event.attendanceMode} className={style.editar_input}
                                        onChange={(e) => setEvent({...event, attendanceMode: e.target.value})}>
                                    <option value="">Selecione</option>
                                    <option value="Offline">Presencial</option>
                                    <option value="Online">Remoto</option>
                                    <option value={"Mixed"}>Remoto e Presencial</option>
                                </select>
                            </label>
                            <label className={style.editar_events_label}>
                                <span>Status do Evento</span>
                                <select value={event.status} className={style.editar_input}
                                onChange={(e) => setEvent({...event, status: e.target.value})}>
                                    <option value="">Selecione</option>
                                    <option value="EventCancelled">Cancelado</option>
                                    <option value="EventPostponed">Adiado</option>
                                    <option value={"EventScheduled"}>Agendado</option>
                                    <option value={"EventRescheduled"}>Reagendado</option>
                                </select>
                            </label>
                        </article>
                        <article className={style.editar_events_article_button}>
                            <button  className={style.botao_excluir} onClick={() => Router.back()}>Cancelar</button>
                            <button className={style.botao_editar} onClick={updateEvent}>Salvar</button>
                        </article>
                    </section>
                </main>
            </>
        </NavBar>

    )
}

export default EditarEvento