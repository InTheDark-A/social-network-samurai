import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogType, MessageType} from "../../redux/dialogs-reducer";
import AddMessageReduxForm from "./AddMessageForm/AddMessageForm";


type OwnPropsType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
    onSendMessageClick: (value:string) => void
}

export type NewMessageFormType = {
    message: string
}

const Dialogs: React.FC<OwnPropsType> = (props) => {
    // Артур заебал пошли по пиву.
    // Я биба а ты боба.
    let dialogsElements = props.dialogs.map(s => <DialogItem name={s.name} key={s.id} id={s.id}/>);
    let messagesElements = props.messages.map(m => <Message message={m.message} key={m.id}/>);

    let addNewMessage = (e:NewMessageFormType) => {
        props.onSendMessageClick(e.message);
        e.message = "";
    };

    return <div className={s.dialogs}>
        <div className={s.dialogs_items}>
            {dialogsElements}
        </div>
        <div className={s.messages}>
            <div>{messagesElements}</div>
            <AddMessageReduxForm onSubmit={addNewMessage}/>
        </div>
    </div>
};



export default Dialogs;