import type { NextPage } from 'next'
import NavBar from '@/layout/NavBar'
import Button from '@mui/material/Button';
import {Grid} from "@mui/material";
import Router from 'next/router'

const Event: NextPage = () => {

    return (
        <NavBar>
            <Grid xs={12} sx={{backgroundColor: "#F8F8FF"}}>
                <Grid xs={2} sx={{backgroundColor: "#F8F8FF"}}>
                    <Button variant="outlined" onClick={()=> Router.push("/auth/cadastroEvents")}>Cadastrar Evento</Button>
                </Grid>
            </Grid>
        </NavBar>
    )
}

export default Event