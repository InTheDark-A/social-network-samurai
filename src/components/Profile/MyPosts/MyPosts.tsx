import React, {FC} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostDataType} from "../../../types/types";
import {AddPostReduxForm} from "./AddPostForm/AddPostForm";

type PropsType = {
    postsData: Array<PostDataType>
    addPost: (value:string) => void
};

type AddPostFormValuesType = {
    post: string
}

const MyPosts:FC<PropsType> = React.memo((props) => {
    let postsElements = props.postsData.map(el => <Post message={el.message} likesCount={el.likesCount}
                                                                    key={el.id}/>);
    let onAddPost = (values:AddPostFormValuesType) => {
        props.addPost(values.post);
        values.post = "";
    };

    return <div className={s.postsBlock}>
        Мои посты:
        <AddPostReduxForm onSubmit={onAddPost}/>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
});



export default MyPosts;