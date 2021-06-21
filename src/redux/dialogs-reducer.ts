import {InferActionsTypes} from "./redux-store";

type DialogType = {
    id: number,
    name: string,
};

type MessageType = {
    id: number,
    message: string,
}

let initialState = {
    dialogs: [
        {id: 1, name: "Vanya"},
        {id: 2, name: "Sukarab"},
        {id: 3, name: "SerGey"},
        {id: 4, name: "Засекреченно"}
    ] as Array<DialogType>,
    messages: [
        {id: 0, message: "Hi"},
        {id: 1, message: "How is your it-kamasutra?",},
        {id: 2, message: "Yo",},
        {id: 3, message: "Все мысли только о тебе",},
        {id: 4, message: "Терзаешь мою душу",},
        {id: 5, message: "Yo",},
        {id: 6, message: "Беды с башкой :(",}
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const dialogsReducer = (state = initialState, action:ActionsTypes):InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: action.body}]
            };
        default:
            return state;
    }
}

export const actions = {
    sendMessageCreator: (body:string) => ({type: 'SN/DIALOGS/SEND_MESSAGE', body: body} as const)
}

export default dialogsReducer;