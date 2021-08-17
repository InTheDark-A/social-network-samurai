import React, {MouseEventHandler, useEffect, useState} from "react";
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";
import {ChatMessageType} from "../../api/chat-api";


const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>)
};

const Chat: React.FC = () => {
    const status = useSelector((state: AppStateType) => state.chat.status);
    const dispatch = useDispatch();
    dispatch(startMessagesListening());
    useEffect(() => {
        startMessagesListening();
        return () => {
            dispatch(stopMessagesListening());
        }
    }, [])
    return (
        <div>
            {status === "error" ? "Перезагрузите страницу" :
                <>

                </>
            }
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = () =>
{
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    console.log("render");
    return <div style={{height: '600px', overflowY: 'auto'}}>
        {messages.map((m, key) => <Message key={key} message={m}/>)}
    </div>;
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {

    return <div>
    <img width={32} height={32} src={message.photo}/>
    <p>{message.message}</p>
    <hr/>
    </div>;
}

    const AddMessageForm: React.FC= () => {
    const [message, setMessage] = useState('');
    const status = useSelector((state:AppStateType) => state.chat.status);
    const dispatch = useDispatch();

    const sendMessageInForm = () => {
    if (message.length === 0) {
    return;
}
    dispatch(sendMessage(message));
    setMessage("");
}
    return <div>
    <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
    <Button disabled={status === "pending"} onClick={sendMessageInForm}>Send</Button>
    </div>;
}

    export default ChatPage;