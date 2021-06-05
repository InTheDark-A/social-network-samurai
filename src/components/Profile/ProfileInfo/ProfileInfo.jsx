import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    console.log(props);
    return <div>
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.small}/>
            <div className={s.status}>
                <p>Статус: {props.profile.aboutMe}</p>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    </div>
};

export default ProfileInfo;