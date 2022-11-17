import type { NextPage } from 'next'
import NavBar from '@/layout/NavBar'
import Router from 'next/router'
import style from '@/styles/Events.module.css'
const Event: NextPage = () => {

    return (
        <NavBar>
            <>
                <header>
                    <h1>Pagina de Eventos</h1>
                </header>
                <main>
                    <section>
                        <article>
                            <button className={style.events_button_cadastrar} onClick={() => Router.push('/auth/cadastroEvents')}>Cadastrar</button>
                        </article>
                    </section>
                </main>
            </>
        </NavBar>
    )
}

export default Event