import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";
import {NewMessageFormType} from "../Dialogs";

const maxLength50 = maxLengthCreator(50);

//type AddMessageFormPropertiesType = Extract<keyof NewMessageFormType, string>;

const AddMessageForm:React.FC<InjectedFormProps<NewMessageFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"message"} component={Textarea} validate={[required, maxLength50]}
                       placeholder={"Enter your message"}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
}

const AddMessageReduxForm = reduxForm<NewMessageFormType, {}>({
    form: "dialogsAddMessage"
})(AddMessageForm);

export default AddMessageReduxForm;