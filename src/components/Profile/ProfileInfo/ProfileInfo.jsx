import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileImg from "./../../../assets/images/profile.jpg"
import ProfileDataForm from "./ProfileDataForm";
import ProfileDataFormReduxForm from "./ProfileDataForm";

const ProfileInfo = ({savePhoto,saveProfile, ...props}) => {
    const [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );;
    }

    return <div>
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large || ProfileImg} height={300} width={300} alt={"avatar"}/>
            {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

            <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            {editMode ? <ProfileDataFormReduxForm onSubmit={onSubmit} profile={props.profile} {...props}/>
                : <ProfileData profile={props.profile} {...props} isOwner={props.isOwner}
                               goToEditMode={() => setEditMode(true)}/>}
        </div>
    </div>
};

const ProfileData = ({profile, isOwner, lookingForAJob, goToEditMode,...props}) => (<div className={s.status}>
    {isOwner && <button onClick={goToEditMode}>Изменить</button>}
    <p><span className={"bold"}>Имя:</span> {profile.fullName}</p>
    <p><span className={"bold"}>Обо мне:</span> {profile.aboutMe ? profile.aboutMe : "-------"}</p>

    <p className={"bold"}>{lookingForAJob ? "Ищу работу" : "Работу не ищу"}</p>
    <div><b>Контакты:</b>{Object.keys(profile.contacts).map((key, index) => {
        return <Contact key={index} contactTitle={key} contactValue={profile.contacts[key]}/>
    })}</div>
</div>);


const Contact = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}:</b> {contactValue}</div>
}

export default ProfileInfo;