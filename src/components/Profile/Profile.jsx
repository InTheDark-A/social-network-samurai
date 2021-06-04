import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./MyPosts/MyPostsContainer";
import Background from "./../../assets/images/back_profile.jpg"

const Profile = (props) => {
    return <div className={s.wrapper}>
        <div className={s.body}>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <div className={s.background}>
                <img src={Background} alt={"back"}/>
            </div>
        </div>
        <PostsContainer/>
    </div>
};

export default Profile;
