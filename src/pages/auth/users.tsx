import type { NextPage } from 'next'
import {Grid} from "@mui/material";

const UsersPage: NextPage = () => {

    return (
        <Grid xs={12} height={'100vh'} direction={'column'} justifyContent={'center'} container>
            <h1>Pagina de Usuarios</h1>
        </Grid>
    )
}

export default UsersPage