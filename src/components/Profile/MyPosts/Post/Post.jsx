import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return <div className={s.item}>
        <img src={"https://yt3.ggpht.com/ytc/AAUvwnhAqEAF26--bgeyaisBjBaDBiTBW1BaUsuUOYFRQA=s900-c-k-c0x00ffffff-no-rj"}
             alt={"avatar"}/>
        {props.message}
        <div>
            <span>{props.likesCount} likes</span>
        </div>
    </div>;
};

export default Post;