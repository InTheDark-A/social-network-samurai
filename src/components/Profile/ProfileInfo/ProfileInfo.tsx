import React, {ChangeEvent, FC, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileImg from "./../../../assets/images/profile.jpg"
import ProfileDataFormReduxForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";

type PropsType = {
    profile:ProfileType
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file:File) => void
    saveProfile:(profile:ProfileType) => Promise<any>
    isOwner: boolean
}

const ProfileInfo:FC<PropsType> = ({savePhoto,saveProfile, ...props}) => {
    const [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: ProfileType) => {
        // TODO: REMOVE THEN
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }

    return <div>
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large || ProfileImg} height={300} width={300} alt={"avatar"}/>
            {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

            <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            {editMode
                ? <ProfileDataFormReduxForm onSubmit={onSubmit} profile={props.profile}/>
                : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => setEditMode(true)}/>}
        </div>
    </div>
};

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData:FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => (<div className={s.status}>
    {isOwner && <button onClick={goToEditMode}>Изменить</button>}
    <p><span className={"bold"}>Имя:</span> {profile.fullName}</p>
    <p><span className={"bold"}>Обо мне:</span> {profile.aboutMe ? profile.aboutMe : "-------"}</p>

    <p className={"bold"}>{profile.lookingForAJob ? "Ищу работу" : "Работу не ищу"}</p>
    <div><b>Контакты:</b>{
        Object
            .keys(profile.contacts)
            .map((key, index) => {
        // @ts-ignore
                return <Contact key={index} contactTitle={key} contactValue={profile.contacts[key] as keyof ContactsType}/>
    })}</div>
</div>);

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact:FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}:</b> {contactValue}</div>
}

export default ProfileInfo;