import type {NextPage} from 'next'
import Router, {useRouter} from "next/router";
import NavBar from '@/layout/NavBar'
import {ApiLink, ApiLinkClass} from "@/types/api-link.types";
import {User} from "@/types/user.types";
import UserService from "@/services/user.service";
import React, {useEffect, useState} from "react";
import style from "@/styles/cadastroPalestrante.module.css";

const EditarPalestrantes: NextPage = () => {

    const router = useRouter()
    const idPalestrante = router.query.id

    const [user, setUser] = useState<User>(new User())


    function getPalestrante() {
        const url: ApiLink = new ApiLinkClass()
        url.href = `${process.env.NEXT_PUBLIC_API_URL}/users/${idPalestrante}`
        UserService.get(url).then((response) => {
            setUser(response)
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    function editar() {
        const url: ApiLink = new ApiLinkClass()
        url.href = `${process.env.NEXT_PUBLIC_API_URL}/users/${idPalestrante}`

        const id: number = parseInt(idPalestrante as string)

        const data = {
            id: id,
            created: user.created,
            updated: user.updated,
            removed: user.removed,
            active: user.active,
            name: user.name,
            description: user.description,
            admin: user.admin,
            location: user.location,
            documents: user.documents,
            events: user.events,
            organizes: user.organizes,
            username: user.username,
            email: user.email,
            password: user.password,
            telephone: user.telephone,
            participatesIn: user.participatesIn,
            speaksIn: user.speaksIn,
            authorities: [],
        }


        UserService.update(url, data).then((response) => {
            console.log(response)
            Router.push(`/auth/palestrantes`)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getPalestrante()
    }, [idPalestrante])

    return (
        <NavBar>
            <>
                <header>
                    <h1>Editar de Palestrante</h1>
                </header>
                <main>
                    <section className={style.cadastro_palestra_section}>
                        <article className={style.editar_events_article_checkbox}>
                            <label className={style.editar_events_label_checkbox}>
                                <span>Ativar Palestrante</span>
                                <input type="checkbox" checked={user.active} className={style.editar_events_checkbox_input}
                                       onChange={(e) => setUser({...user, active: e.target.checked})}/>
                            </label>
                        </article>
                        <article className={style.cadastro_palestra_article}>
                            <label className={style.cadastro_palestra_label}>
                                <span>Nome do Palestrante</span>
                                <input type="text" placeholder="Nome do Palestrante"
                                       className={style.cadastro_palestra_input}
                                       value={user.name} onChange={(e) => setUser({...user, name: e.target.value})}/>
                            </label>
                            <label className={style.cadastro_palestra_label}>
                                <span>Descrição do Palestrante</span>
                                <input type="text" placeholder="Descrição do Palestrante"
                                       className={style.cadastro_palestra_input}
                                       value={user.description}
                                       onChange={(e) => setUser({...user, description: e.target.value})}/>
                            </label>
                        </article>
                        <article className={style.cadastro_palestra_article}>
                            <label className={style.cadastro_palestra_label}>
                                <span>Nome de Usuário do Palestrante</span>
                                <input type="text" placeholder="Nome de Usuário"
                                       className={style.cadastro_palestra_input}
                                       value={user.username}
                                       onChange={(e) => setUser({...user, username: e.target.value})}/>
                            </label>
                            <label className={style.cadastro_palestra_label}>
                                <span>Senha do Palestrante</span>
                                <input type="text" placeholder="Senha" className={style.cadastro_palestra_input}
                                       value={user.password}
                                       onChange={(e) => setUser({...user, password: e.target.value})}/>
                            </label>
                        </article>
                        <article className={style.cadastro_palestra_article}>
                            <label className={style.cadastro_palestra_label}>
                                <span>Telefone do Palestrante</span>
                                <input type="text" placeholder="Telefone do Palestrante"
                                       className={style.cadastro_palestra_input}
                                       value={user.telephone}
                                       onChange={(e) => setUser({...user, telephone: e.target.value})}/>
                            </label>
                            <label className={style.cadastro_palestra_label}>
                                <span>E-mail do Palestrante</span>
                                <input type="text" placeholder="E-mail do Palestrante"
                                       className={style.cadastro_palestra_input}
                                       value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
                            </label>
                        </article>
                        <article className={style.cadastro_palestra_article_button}>
                            <button className={style.cadastro_palestra_button_cancelar}
                                    onClick={() => Router.back()}>Voltar
                            </button>
                            <button className={style.cadastro_palestra_button} onClick={editar}>Editar</button>
                        </article>
                    </section>
                </main>
            </>
        </NavBar>
    )
}

export default EditarPalestrantes