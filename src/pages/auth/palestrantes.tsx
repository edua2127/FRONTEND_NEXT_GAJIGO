import NavBar from '@/layout/NavBar'

import type {NextPage} from 'next'

import Router, {useRouter} from "next/router";

import {useEffect, useState} from "react";

import {ApiLink, ApiLinkClass} from "@/types/api-link.types";
import {User} from "@/types/user.types";
import UserService from "@/services/user.service";

const Palestrantes: NextPage = () => {

    const [palestrantes, setPalestrantes] = useState<User[]>([])
    const [users, setUsers] = useState<User[]>([])

    function getUsers() {
        const url: ApiLink = new ApiLinkClass()
        url.href = `${process.env.NEXT_PUBLIC_API_URL}/users`
        UserService.get(url).then((response) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setUsers(response._embedded.users)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        if (users.length > 0) {
            setPalestrantes(users.filter(user => !user.admin))
        }
    }, [users])

    return (
        <NavBar>
            <>
                <header>
                    <h1>Palestrantes</h1>
                </header>
                <main>
                    <section>
                        <article>
                            <button onClick={() => Router.push(`/auth/cadastrarPalestrante`)}>Cadastrar Palestrante
                            </button>
                        </article>
                        <article>
                            <table>
                                <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Email</th>
                                    <th>Tefefone</th>
                                    <th>Ações</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>

                                </tr>
                                </tbody>
                            </table>
                        </article>
                    </section>
                </main>
            </>
        </NavBar>
    )
}

export default Palestrantes