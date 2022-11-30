import NavBar from '@/layout/NavBar'
import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Room } from '@/types/room.types'
import style from '@/styles/Room.module.css'
import EventService from '@/services/event.service'
import RoomService from '@/services/room.service'
import { ApiLink, ApiLinkClass } from '@/types/api-link.types'
import AppLayout from '@/layout/AppLayout'
const Salas: NextPage = () => {
    const router = useRouter()
    const idEvento = router.query.id
    const [salas, setSalas] = useState<Room[]>([])

    function getSalas() {
        console.clear()
        const url: ApiLink = new ApiLinkClass()
        url.href = `${process.env.NEXT_PUBLIC_API_URL}/events/${idEvento}/rooms`
        EventService.get(url)
            .then((response) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setSalas(response._embedded.rooms)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getSalas()
    }, [idEvento])

    function excluirSala(id) {
        const url: ApiLink = new ApiLinkClass()
        url.href = `${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`
        RoomService.delete(url)
            .then((response) => {
                getSalas()
            })
            .catch((error) => {
                console.log(error)
                alert('existe alguma dependecia com essa sala')
            })
    }

    return (
        <AppLayout text='Salas do Evento'>
            <>
                <main>
                    <section className={style.room_section}>
                        <article className={style.room_article_cadastro_and_listar}>
                            <button
                                className={style.room_button_cadastrar}
                                onClick={() => Router.push(`/cadastrarSala/${idEvento}`)}
                            >
                                Cadastrar Sala
                            </button>
                            <button
                                className={style.room_button_voltar}
                                onClick={() => Router.back()}
                            >
                                Voltar
                            </button>
                        </article>
                        <article className={style.room_article_table}>
                            <table className={style.room_table}>
                                <thead className={style.room_table_thead}>
                                    <tr className={style.room_table_tr}>
                                        <th className={style.room_table_th}>Nome</th>
                                        <th className={style.room_table_th}>Descrição</th>
                                        <th className={style.room_table_th}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salas.length > 0 &&
                                        salas.map((sala, index) => {
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-ignore
                                            const idRoom = sala._links.self.href.split('/').pop()
                                            return (
                                                <tr className={style.room_table_tr} key={idRoom}>
                                                    <td className={style.room_table_td}>
                                                        {sala.name}
                                                    </td>
                                                    <td className={style.room_table_td}>
                                                        {sala.description}
                                                    </td>
                                                    <td className={style.room_table_td_actions}>
                                                        <button
                                                            className={style.room_button_selecionar}
                                                            onClick={() =>
                                                                Router.push(`/palestra/${idRoom}`)
                                                            }
                                                        >
                                                            Selecionar
                                                        </button>
                                                        <button
                                                            className={style.room_button_editar}
                                                            onClick={() =>
                                                                Router.push(`/editarSala/${idRoom}`)
                                                            }
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            className={style.room_button_excluir}
                                                            onClick={() => excluirSala(idRoom)}
                                                        >
                                                            Excluir
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </article>
                    </section>
                </main>
            </>
        </AppLayout>
    )
}

export default Salas
