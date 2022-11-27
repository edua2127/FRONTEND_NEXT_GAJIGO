import type {NextPage} from 'next'
import NavBar from '@/layout/NavBar'
import Router from 'next/router'
import style from '@/styles/Events.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import UserService from "@/services/user.service";
import EventService from '@/services/event.service';
import {IEvent} from "@/types/event.types";
import {ApiLink, ApiLinkClass} from '@/types/api-link.types';

const Event: NextPage = () => {

    const [events, setEvents] = useState<IEvent[]>([])
    const [idCorrentUser, setUrlCorrentUser] = useState<number>(0)

    async function getEvents() {
        const url: ApiLink = new ApiLinkClass()

        url.href = `${process.env.NEXT_PUBLIC_API_URL}/users/${idCorrentUser}/events`

        EventService.getAll(url).then((response) => {
            console.log(response._embedded.events)
            setEvents(response._embedded.events)
        })


    }

    async function getCorrentUser() {
        const user = await UserService.getCorrentUser();
        setUrlCorrentUser(user.id)
        console.log(user)
    }


    useEffect(() => {
        getCorrentUser()
    }, [])

    useEffect(() => {
        if (idCorrentUser !== 0) {
            getEvents()
        }
    }, [idCorrentUser])


    return (
        <NavBar>
            <>
                <header>
                    <h1>Pagina de Eventos</h1>
                </header>
                <main>
                    <section className={style.events_section}>
                        <article className={style.events_article_cadastro_and_listar}>
                            <button className={style.btn_grad}
                                    onClick={() => Router.push('/auth/cadastroEvents')}>Cadastrar
                            </button>
                            <button className={style.events_button_listar}
                                    onClick={getEvents}>listar
                            </button>
                        </article>
                        <article className={style.events_article}>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nome</TableCell>
                                            <TableCell align="right">Descrição</TableCell>
                                            <TableCell align="right">Status do Evento</TableCell>
                                            <TableCell align="right">Modo de Atendimento</TableCell>
                                            <TableCell align="right">Data de Inicio</TableCell>
                                            <TableCell align="right">Date de Fim</TableCell>
                                            <TableCell align="right">Ações</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {events.length > 0 && events.map((event) => {

                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-ignore
                                            const id = event._links.self.href.split('/').pop()
                                            const statusEventLocal = {
                                                EventCancelled: 'Cancelado',
                                                EventPostponed: 'Adiado',
                                                EventScheduled: 'Agendado',
                                                EventRescheduled: 'Reagendado',
                                            }
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-ignore
                                            const statusEvent = statusEventLocal[event.status]
                                            return (
                                                <TableRow
                                                    key={id}
                                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {event.name}
                                                    </TableCell>
                                                    <TableCell align="right">{event.description}</TableCell>
                                                    <TableCell align="right">{statusEvent}</TableCell>
                                                    <TableCell align="right">{event.attendanceMode}</TableCell>
                                                    <TableCell align="right">{event.interval.startDate}</TableCell>
                                                    <TableCell align="right">{event.interval.endDate}</TableCell>
                                                    <TableCell align="right">
                                                        <article className={style.events_article_btn}>
                                                            <button className={style.events_button_editar}
                                                                    onClick={() => Router.push(`/editarEvents/${id}`)}>Editar
                                                            </button>
                                                            <button className={style.events_button_excluir}
                                                                    onClick={() => Router.push(`/excluirEvents/${id}`)}>Excluir
                                                            </button>
                                                        </article>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>

                            </TableContainer>
                        </article>
                    </section>
                </main>
            </>
        </NavBar>
    )
}

export default Event