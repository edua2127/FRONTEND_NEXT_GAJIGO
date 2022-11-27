import NavBar from '@/layout/NavBar'
import type {NextPage} from 'next'
import Router, {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Room} from "@/types/room.types";
import style from '@/styles/Room.module.css'

const Salas: NextPage = () => {

    const router = useRouter();
    const idEvento = router.query.id;
    const [salas, setSalas] = useState<Room[]>([])

    function getSalas() {
        console.log("em desenolvimento")
    }

    useEffect(() => {
        getSalas()
    }, [idEvento])

    return (
        <NavBar>
            <>
                <header>
                    <h1>Salas do Evento</h1>
                </header>
                <main>
                    <section className={style.room_section}>
                        <article className={style.room_article_cadastro_and_listar}>
                            <button className={style.room_button_cadastrar}>Cadastrar Sala</button>
                            <button className={style.room_button_voltar} onClick={()=> Router.back()}>Voltar</button>
                        </article>
                        <article  className={style.room_article_table}>
                            <table  className={style.room_table}>
                                <thead  className={style.room_table_thead}>
                                    <tr  className={style.room_table_tr}>
                                        <th  className={style.room_table_th}>Nome</th>
                                        <th  className={style.room_table_th}>Descrição</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </article>
                    </section>
                </main>
            </>
        </NavBar>
    )
}

export default Salas