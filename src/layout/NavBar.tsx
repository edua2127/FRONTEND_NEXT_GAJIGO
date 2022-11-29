
import {Grid} from "@mui/material";
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
        <div className={style.nav_page_body}>
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
        </div>
        )
}

export default NavBar