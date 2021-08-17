import {ResultCodeForCaptcha, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authApi} from "../api/authApi";
import {securityAPI} from "../api/securityAPI";
import {chatApi, ChatMessageType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";

let initialState = {
    messages: [] as ChatMessageType[],
    status: "pending" as StatusType
};

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SN/chat/SET_MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages],
            };
        case "SN/chat/STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'SN/chat/SET_MESSAGES_RECEIVED',
        payload: {messages}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'SN/chat/STATUS_CHANGED',
        payload: {status}
    } as const),

}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
const newMessageCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = ((messages: ChatMessageType[]) => {
            dispatch(actions.messagesReceived(messages))
        })
    }
    return _newMessageHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = ((status: StatusType) => {
            debugger;
            dispatch(actions.statusChanged(status))
        })
    }
    return _statusChangedHandler;
};


export const startMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        await chatApi.start();
        chatApi.subscribe("message-received", newMessageCreator(dispatch));
        chatApi.subscribe("status-changed", statusChangedCreator(dispatch));
    }
}
export const stopMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatApi.unsubscribe("message-received", newMessageCreator(dispatch))
        chatApi.unsubscribe("status-changed", statusChangedCreator(dispatch))
        chatApi.stop()
    }
}

export const sendMessage = (message: string): ThunkType => {
    return async (dispatch) => {
        chatApi.sendMessage(message);
    }
}

export default chatReducer;

type  InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>;