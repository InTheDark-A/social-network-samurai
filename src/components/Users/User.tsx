import React, {FC} from 'react';
import styles from './Users.module.css'
import userPhoto from '../../assets/images/profile.jpg'
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (id:number) => void
    unfollow: (id:number) => void
};

let User:FC<PropsType> = ({user, followingInProgress, unfollow, follow, ...props}) => {
    return (
        <div>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img className={styles.photoAvatar} src={user.photos.small || userPhoto}/>
                </NavLink>
            </div>
            <div>
                {
                    user.followed ?
                        <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    unfollow(user.id)
                                }}>Unfollow</button>

                        : <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      follow(user.id);
                                  }}>Follow</button>
                }
            </div>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"u.location.city"}</div>
                    <div>{"u.location.country"}</div>
                </span>
            </span>
        </div>

    );
}


export default User;
