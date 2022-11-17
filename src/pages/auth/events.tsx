import type { NextPage } from 'next'
import NavBar from '@/layout/NavBar'
import Button from '@mui/material/Button';
import {Grid} from "@mui/material";
import Router from 'next/router'

const Event: NextPage = () => {

    return (
        <NavBar>
            <>
                <header>
                    <h1>Pagina de Eventos</h1>
                </header>
                <main>
                    <Grid container sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <Grid item xs={12}>
                            <Button onClick={()=> Router.push("/auth/cadastroEvents")} variant={"outlined"}>Criar Evento</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <p>Aqui vai ficar a table</p>
                        </Grid>
                    </Grid>
                </main>
            </>
        </NavBar>
    )
}

export default Event