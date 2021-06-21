import React, {FC} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";
import {PostDataType} from "../../../types/types";


const maxLength15 = maxLengthCreator(15);

type PropsType = {
    postsData: Array<PostDataType>
    addPost: (value:string) => void
};

const MyPosts:FC<PropsType> = React.memo((props) => {
    let postsElements = props.postsData.map(el => <Post message={el.message} likesCount={el.likesCount}
                                                                    key={el.id}/>);
    let onAddPost = (values:any) => {
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

type FormPropsType = {
    handleSubmit: any,
    onSubmit: any
}

const AddPostForm:FC<FormPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit(props.onSubmit)}>
            <div>
                <Field component={Textarea} name={"post"} placeholder={"Напишите текст поста"}
                       validate={[required, maxLength15]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

// @ts-ignore
let AddPostReduxForm = reduxForm({form: "profileAddPost"})(AddPostForm);

export default MyPosts;