import type { NextPage } from 'next'
import {Grid} from "@mui/material";

const Event: NextPage = () => {

    return (
        <Grid xs={12} height={'100vh'} direction={'column'} justifyContent={'center'} container>
            <h1>Pagina de Eventos</h1>
        </Grid>
    )
}

export default Event