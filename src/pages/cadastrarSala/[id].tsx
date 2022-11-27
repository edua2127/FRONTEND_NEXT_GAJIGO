import NavBar from '@/layout/NavBar'
import type {NextPage} from 'next'
import {useRouter} from "next/router";
const CadastrarSala: NextPage = () => {
    const router = useRouter();
    const {id} = router.query;

    return (
        <NavBar>
            <>
                <header>
                    <h1>Cadastrar Sala - {id}</h1>
                </header>
                <main>
                    <section>
                        <article>
                            <label>
                                <span>Nome da Sala</span>
                                <input type="text"/>
                            </label>
                        </article>
                    </section>
                </main>
            </>
        </NavBar>
    )
}