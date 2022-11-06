import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import Box from '@mui/material/Box';
import IconEvent from '../assets/IconEvent.png'
import IconPalestra from "../assets/IconPalestra.png"
import IconUser from "../assets/IconUsers.png"
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
                    flexDirection: 'column',

                }}>
                <Grid item>
                    <img src={IconEvent.src} alt="icone de evento" className={"icon_page_home"}/>
                </Grid>
                <Grid item>
                    <img src={IconPalestra.src} alt="icone de evento" className={"icon_page_home"}/>
                </Grid>
                <Grid item>
                    <img src={IconUser.src} alt="icone de evento" className={"icon_page_home"}/>
                </Grid>

            </Box>
        </Grid>
    )
}

export default Home
