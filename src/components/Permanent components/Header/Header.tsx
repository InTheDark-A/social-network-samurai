import React from 'react';
import s from './Header.module.css';
import logo from "../../../assets/images/logo_dark.jpg"
import {NavLink} from "react-router-dom";

const Header:React.FC<{isAuth: boolean | null, login: string | null, logout: () => void}> = (props) => {
    return <header className={s.header}>
        <div>
            <img src={logo} alt={"logo"}/>
            <div className={s.loginBlock}>
                {props.isAuth ? <div>{props.login}
                        <button onClick={props.logout}>Log out</button>
                    </div> :
                    <NavLink to={'/Login'}>Login</NavLink>
                }
                https://social-network.samuraijs.com/api/1.0
            </div>
        </div>
    </header>
};

export default Header;