import React, {FC} from 'react';
import s from './Post.module.css';
import avatar from "./../../../../assets/images/profile.jpg"
type PropsType = {
    message: string,
    likesCount: number
}

const Post:FC<PropsType> = (props) => {
    return <div className={s.item}>
        <div className={s.inner}>
            <img src={avatar}
                 alt={"avatar"}/>
            <p>{props.message}</p>
        </div>
        <div>
            <span>Likes: {props.likesCount}</span>
        </div>
    </div>;
};

export default Post;