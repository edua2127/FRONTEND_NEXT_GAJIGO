import NavBar from '@/layout/NavBar'
import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ApiLink, ApiLinkClass } from '@/types/api-link.types'
import style from '@/styles/Linguagens.module.css'
import { Tag } from '@/types/tag.types'
import TagService from '@/services/tag.service'


import AppLayout from '@/layout/AppLayout'
const Tags: NextPage = () => {
    const [tags, setTags] = useState<Tag[]>([])

    function getTags() {
        const url: ApiLink = new ApiLinkClass()
        url.href = `${process.env.NEXT_PUBLIC_API_URL}/tags`
        TagService.get(url)
            .then((response) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setTags(response._embedded.tags)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getTags()
    }, [])

    function excluirTag(id: string) {
        const url: ApiLink = new ApiLinkClass()
        url.href = `${process.env.NEXT_PUBLIC_API_URL}/tags/${id}`
        TagService.delete(url)
            .then(() => {
                getTags()
            })
            .catch((error) => {
                console.log(error)
                alert('existe alguma dependecia com essa tag')
            })
    }

    return (
        <AppLayout text='Tags'>
            <>
                <header className={style.user_page_header}>
                    <h1>Tags</h1>
                </header>
                <main>
                    <section className={style.room_section}>
                        <article className={style.room_article_cadastro_and_listar}>
                            <button
                                onClick={() => Router.push('/auth/cadastrarTags')}
                                className={style.room_button_cadastrar}
                            >
                                Cadastrar
                            </button>
                        </article>
                        <article className={style.room_article_table}>
                            <table className={style.room_table}>
                                <thead className={style.room_table_thead}>
                                    <tr className={style.room_table_tr}>
                                        <th className={style.room_table_td}>Nome</th>
                                        <th className={style.room_table_td}>Descrição</th>
                                        <th className={style.room_table_td}>Data de Criação</th>
                                        <th className={style.room_table_td}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tags.length > 0 &&
                                        tags.map((tag) => {
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-ignore
                                            const idLocal: string = tag._links.self.href
                                                .split('/')
                                                .pop()

                                            return (
                                                <tr key={idLocal} className={style.room_table_tr}>
                                                    <td className={style.room_table_td}>
                                                        {tag.name}
                                                    </td>
                                                    <td className={style.room_table_td}>
                                                        {tag.description}
                                                    </td>
                                                    <td className={style.room_table_td}>
                                                        {tag.created.toString()}
                                                    </td>
                                                    <td className={style.room_table_td_actions}>
                                                        <button
                                                            className={style.room_button_editar}
                                                            onClick={() =>
                                                                Router.push(
                                                                    `/editarTags/${idLocal}`,
                                                                )
                                                            }
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            className={style.room_button_excluir}
                                                            onClick={() => excluirTag(idLocal)}
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

export default Tags
