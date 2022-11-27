import NavBar from '@/layout/NavBar'
import type {NextPage} from 'next'
import Router, {useRouter} from "next/router";
import {Lecture} from "@/types/lecture.types";
import LectureService from "@/services/lecture.service";
import {useEffect, useState} from "react";
import style from '@/styles/CadastroPalestra.module.css'
import {ApiLink, ApiLinkClass} from '@/types/api-link.types';
import RoomService from "@/services/room.service";
import {Room} from '@/types/room.types';
const CadastroPalestra: NextPage = () => {

    const router = useRouter();
    const idRoom = router.query.id;
    const [lecture, setLecture] = useState<Lecture>(new Lecture())

    function getEvent() {
        const url: ApiLink = new ApiLinkClass()
        url.href = `${process.env.NEXT_PUBLIC_API_URL}/rooms/${idRoom}/event`
        RoomService.get(url).then((response) => {
            setLecture({...lecture, event: response._links.self.href})
        }).catch((error) => {
            console.log(error)
        })
    }

    function cadastrar() {

        const data:Lecture = {
            name: lecture.name,
            description: lecture.description,
            room: `${process.env.NEXT_PUBLIC_API_URL}/rooms/${idRoom}`,
            event: lecture.event,
            interval: lecture.interval,
            id: lecture.id,
            _links: lecture._links,
            active: true,
            tags: lecture.tags,
            language: '',
        }

        LectureService.create(data).then((response) => {
            console.log("cadastrado com sucesso")
            Router.back()
        }).catch((error) => {
            console.log(error)
            console.log(data)
        })
    }

    useEffect(() => {
        getEvent()
    }, [idRoom])

    const handleChangeDatadeInicio = (event: any) => {
        setLecture({...lecture, interval: {...lecture.interval, startDate: event.target.value}})
    }

    const handleChangeDatadeFim = (event: any) => {
        setLecture({...lecture, interval: {...lecture.interval, endDate: event.target.value}})
    }
    return (
        <NavBar>
            <>
                <header>
                    <h1>Cadastrar Palestra</h1>
                </header>
                <main>
                    <section className={style.cadastro_palestra_section}>
                        <article className={style.cadastro_palestra_article}>
                            <label className={style.cadastro_palestra_label}>
                                <span>
                                    Nome da Palestra
                                </span>
                                <input className={style.cadastro_palestra_input}
                                    type="text" value={lecture.name} onChange={(e) => setLecture({...lecture, name: e.target.value})}/>
                            </label>
                            <label className={style.cadastro_palestra_label}>
                                <span>
                                    Descrição da Palestra
                                </span>
                                <input className={style.cadastro_palestra_input} type="text" value={lecture.description} onChange={(e) => setLecture({...lecture, description: e.target.value})}/>
                            </label>
                        </article>
                        <article className={style.cadastro_palestra_article}>
                            <label className={style.cadastro_palestra_label}>
                                <span>
                                    Data de Inicio
                                </span>
                                <input className={style.cadastro_palestra_input}
                                       type="datetime-local"
                                       value={lecture.interval.startDate}
                                       onChange={(e) => handleChangeDatadeInicio(e)}/>
                            </label>
                            <label className={style.cadastro_palestra_label}>
                                <span>
                                    Data de Fim
                                </span>
                                <input className={style.cadastro_palestra_input}
                                       type="datetime-local"
                                       value={lecture.interval.endDate}
                                       onChange={(e)=> handleChangeDatadeFim(e) }/>
                            </label>
                        </article>
                        <article className={style.cadastro_palestra_article_button}>
                            <button onClick={()=> Router.back()} className={style.cadastro_palestra_button_cancelar}>Cancelar</button>
                            <button onClick={cadastrar} className={style.cadastro_palestra_button}>Cadastrar</button>
                        </article>
                    </section>
                </main>
            </>
        </NavBar>
    )
}

export default CadastroPalestra