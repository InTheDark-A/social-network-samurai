import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./MyPosts/MyPostsContainer";
import Background from "./../../assets/images/back_profile.jpg"
import Relax from "./../../assets/gifs/relax.gif"

const Profile = (props) => {
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
