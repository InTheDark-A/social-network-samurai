import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const maxLength50 = maxLengthCreator(50);

const Dialogs = (props) => {
    // Артур заебал пошли по пиву.
    // Я биба а ты боба.
    let dialogsElements = props.dialogs.map(s => <DialogItem name={s.name} key={s.id} id={s.id}/>);
    let messagesElements = props.messages.map(m => <Message message={m.message} key={m.id} id={m.id}/>);

    let addNewMessage = (e) => {
        props.onSendMessageClick(e.message);
        e.message = "";
    };

    return <div className={s.dialogs}>
        <div className={s.dialogs_items}>
            {dialogsElements}
        </div>
        <div className={s.messages}>
            <div>{messagesElements}</div>
            <AddMessageReduxForm onSumbit={addNewMessage}/>
        </div>
    </div>
};

const AddMessageForm = (props) => { // в другой файлик бы вынести
    return (
        <form onSubmit={props.handleSubmit(props.onSumbit)}>
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

const AddMessageReduxForm = reduxForm({
    form: "dialogsAddMessage"
})(AddMessageForm);

export default Dialogs;