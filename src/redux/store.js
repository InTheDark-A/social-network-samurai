import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            postsData: [
                {id: 0, message: "Hi, how are you?", likesCount: 1},
                {id: 1, message: "It's my first post", likesCount: 5},
                {id: 2, message: "kek", likesCount: 4},
                {id: 3, message: "meme", likesCount: 999}
            ],
            newPostText: "",
        },

        dialogsData: {
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
            ],
            newMessageBody: ""
        },

        sideBar: {},
        friendsPage: {
            friends: [
                {id: 1, name: "Vanya"},
                {id: 2, name: "Sukarab"},
                {id: 3, name: "SerGey"},
                {id: 4, name: "Lena"}
            ]
        },
    },
    _callSubscriber() { // observer callBack возвращает МЕТОД ПЕРЕРИСОВКИ
        console.log('State changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) { // PATTERN
        this._callSubscriber = observer;
    },


    dispatch(action) { // { type: 'ADD-POST'  }
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsData = dialogsReducer(this._state.dialogsData, action);
        this._state.friendsPage = sidebarReducer(this._state.friendsPage, action);

        this._callSubscriber(this._state); // не всегда делать ?
    }
}

window.state = store;
