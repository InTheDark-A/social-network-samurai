import React, {FC} from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./MyPosts/MyPostsContainer";
import Background from "./../../assets/images/back_profile.jpg"
import Relax from "./../../assets/gifs/relax.gif"
import {ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    savePhoto: (file:any) => void
    saveProfile: () => void
    updateStatus: (status: string) => void
}

const Profile:FC<PropsType> = (props) => {
    return <div className={s.wrapper}>
        <div className={s.body}>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner}
            savePhoto={props.savePhoto} saveProfile={props.saveProfile}/>
            <div className={s.background}>
                <img src={Background} alt={"back"} height={415}/>
            </div>
        </div>
        <div className={s.bodySec}>
            <PostsContainer/>
            <img src={Relax} alt={"relax"}/>
        </div>
    </div>
};

export default Profile;
