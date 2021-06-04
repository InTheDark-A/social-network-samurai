import preloader from "../../../assets/gifs/loading_bonfire.gif";
import React from "react";
import s from "./Preoloader.module.css";

let Preoloader = (props) => {
    return <div className={s.wrapper}>
        <h1>Загрузка</h1>
        <img src={preloader} height={300}/>
    </div>
}

export default Preoloader;