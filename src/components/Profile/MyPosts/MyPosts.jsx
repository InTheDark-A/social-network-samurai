import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";

const maxLength15 = maxLengthCreator(15);
const MyPosts = React.memo((props) => {
    let postsElements = props.postsData.map(el => <Post message={el.message} likesCount={el.likesCount}
                                                                    key={el.id}/>);
    let onAddPost = (values) => {
        props.addPost(values.post);
        values.post = "";
    };

    return <div className={s.postsBlock}>
        My posts
        <AddPostReduxForm onSumbit={onAddPost}/>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
});

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit(props.onSumbit)}>
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

let AddPostReduxForm = reduxForm({
    form: "profileAddPost"
})(AddPostForm);

export default MyPosts;