import React from 'react';
import s from './ProfileInfo.module.css';
import Preoloader from "../../Common/Preloader/Preoloader";
import ProfileStatus from "./ProfileStatus";


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preoloader/>
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