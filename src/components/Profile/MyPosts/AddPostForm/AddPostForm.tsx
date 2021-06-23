import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";


const maxLength15 = maxLengthCreator(15);

type AddPostFormValuesType = {
    post: string
}

const AddPostForm: FC<InjectedFormProps<AddPostFormValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
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

export const  AddPostReduxForm = reduxForm<AddPostFormValuesType, {}>({form: "profileAddPost"})(AddPostForm);
