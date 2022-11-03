import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import Box from '@mui/material/Box';

const Home: NextPage = () => {
    return (
        <Grid xs={12} height={'100vh'} container sx={{margin: 0}}>
            <Box mx={3}
            sx={
                {
                    display: "flex",
                    alignSelf: "flex-start",
                    backgroundColor: "red",
                    height: "100%",
                    margin: 0,

                }}>
                <h1>teste</h1>
            </Box>
        </Grid>
    )
}

export default Home
