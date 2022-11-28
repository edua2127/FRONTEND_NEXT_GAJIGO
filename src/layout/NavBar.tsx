
import {Grid} from "@mui/material";
import Box from '@mui/material/Box';
import IconEvent from '../assets/IconEvent.png'
import IconPalestra from "../assets/IconPalestra.png"
import IconUser from "../assets/IconUsers.png"
import Router from 'next/router'
type Props = {
    children: JSX.Element,
};

const NavBar = ({children}: Props) => {
    return (
        <Grid xs={12} height={'100vh'} container sx={{margin: 0}}>
            <Box mx={3}
                 sx={
                     {
                         display: "flex",
                         alignSelf: "flex-start",
                         backgroundColor: "#bebebe",
                         height: "100%",
                         width: "4%",
                         margin: 0,
                         flexDirection: 'column',
                         boxShadow: 10,
                         boxShadowColor: 'black',

                     }}>
                <Grid item>
                    <img src={IconEvent.src} alt="icone de evento" className={"icon_page_home"}
                         onClick={()=> Router.push("/auth/events")}/>
                </Grid>
                <Grid item>
                    <img src={IconUser.src} alt="icone de evento" className={"icon_page_home"}
                         onClick={()=> Router.push("/auth/palestrantes")}/>
                </Grid>
            </Box>
            <Box mx={9}
                 sx={
                     {
                         display: "flex",
                         alignSelf: "flex-start",
                         margin: "0px",
                         padding: "1.0319917440660475vh",
                         flexDirection: 'column',
                         width: "96%",
                         height: "100%",
                         backgroundColor: "#F8F8FF",
                     }}
            >
                {children}
            </Box>
        </Grid>)
}

export default NavBar