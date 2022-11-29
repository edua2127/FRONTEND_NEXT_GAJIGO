
import {Grid} from "@mui/material";
import Box from '@mui/material/Box';
import IconEvent from '../assets/IconEvent.png'
import IconUser from "../assets/IconUsers.png"
import IconLanguage from '../assets/IconLanguage.png'
import IconTag from '../assets/IconTag.png'
import Router from 'next/router'
import style from '@/styles/NavBar.module.css'
type Props = {
    children: JSX.Element,
};

const NavBar = ({children}: Props) => {
    return (
        <Grid xs={12} height={'100vh'} container sx={{margin: 0}}>
            <nav className={style.navbar}>
            <Grid item>
                    <img src={IconEvent.src} alt="icone de evento" className={"icon_page_home"}
                         onClick={()=> Router.push("/auth/events")}/>
                </Grid>
                <Grid item>
                    <img src={IconUser.src} alt="icone de evento" className={"icon_page_home"}
                         onClick={()=> Router.push("/auth/palestrantes")}/>
                </Grid>
                <Grid item>
                    <img src={IconLanguage.src} alt="icone das linguagens" className={"icon_page_home"}
                         onClick={()=> Router.push("/auth/linguagens")}/>
                </Grid>
                <Grid item>
                    <img src={IconTag.src} alt="icone das tags" className={"icon_page_home"}
                         onClick={()=> Router.push("/auth/tags")}/>
                </Grid>
            </nav>
            <main className={style.nav_page_main}>
                {children}
            </main>
        </Grid>)
}

export default NavBar