import NavBar from '@/layout/NavBar'
import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { Room } from '@/types/room.types'
import { useEffect, useState } from 'react'
import style from '@/styles/CadastroSala.module.css'
import RoomService from '@/services/room.service'
import AppLayout from '@/layout/AppLayout'
const CadastrarSala: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const [room, setRoom] = useState<Room>(new Room())

    function cadastrar() {
        RoomService.create(room)
            .then((response) => {
                console.log('cadastrado com sucesso')
                Router.back()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function getEvent() {
        const event = `http://localhost:8080/api/events/${id}`
        setRoom({ ...room, event: event })
    }

    useEffect(() => {
        getEvent()
    }, [id])

    return (
        <AppLayout text="Cadastrar da Sala">
            <>
                <header className={style.cadastro_events_header}>
                    <h1>Cadastrar Sala</h1>
                </header>
                <main>
                    <section className={style.cadastro_events_section}>
                        <article className={style.cadastro_events_article}>
                            <label className={style.cadastro_events_label}>
                                <span>Nome da Sala</span>
                                <input
                                    type='text'
                                    value={room.name}
                                    className={style.cadastro_events_input}
                                    onChange={(e) => setRoom({ ...room, name: e.target.value })}
                                />
                            </label>
                            <label className={style.cadastro_events_label}>
                                <span>Descrição da Sala</span>
                                <input
                                    type='text'
                                    value={room.description}
                                    className={style.cadastro_events_input}
                                    onChange={(e) =>
                                        setRoom({ ...room, description: e.target.value })
                                    }
                                />
                            </label>
                        </article>
                        <article className={style.cadastro_events_article_button}>
                            <button
                                className={style.cadastrar_sala_button_cancelar}
                                onClick={() => Router.back()}
                            >
                                Cancelar
                            </button>
                            <button className={style.cadastrar_sala_button} onClick={cadastrar}>
                                Cadastrar
                            </button>
                        </article>
                    </section>
                </main>
            </>
        </AppLayout>
    )
}

export default CadastrarSala
