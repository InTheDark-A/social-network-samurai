const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: "Vanya"},
        {id: 2, name: "Sukarab"},
        {id: 3, name: "SerGey"},
        {id: 4, name: "Lena"}
    ],
    messages: [
        {id: 0, message: "Hi"},
        {id: 1, message: "How is your it-kamasutra?",},
        {id: 2, message: "Yo",},
        {id: 3, message: "Все мысли только о тебе",},
        {id: 4, message: "Терзаешь мою душу",},
        {id: 5, message: "Yo",},
        {id: 6, message: "Беды с башкой :(",}
    ]
}

const dialogsReducer = (state = initialState, action) => {
    let stateCopy;

    switch (action.type) {
        case SEND_MESSAGE:
            stateCopy = {
                ...state,
                newMessageBody: "",
                messages: [...state.messages, {id: 6, message: action.body}]
            };
            return stateCopy;
        default:
            return state;
    }


}

export const sendMessageCreator = (body) => ({type: SEND_MESSAGE, body: body});
export default dialogsReducer;