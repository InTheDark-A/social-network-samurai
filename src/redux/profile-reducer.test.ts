import profileReducer, {actions} from "./profile-reducer";
import {ProfileType} from "../types/types";
let state = {
    postsData: [
        {id: 0, message: "Hi, how are you?", likesCount: 1},
        {id: 1, message: "It's my first post", likesCount: 5},
        {id: 2, message: "kek", likesCount: 4},
        {id: 3, message: "meme", likesCount: 999}
    ],
    profile: null as ProfileType | null,
    status: "",
    newPostText: "",
};


test('length of posts should be incremented', () => {
    let action = actions.addPostActionCreator("it-kamasutra.com")
    let newState = profileReducer(state,action);
    expect(newState.postsData.length).toBe(5);
    expect(newState.postsData[4].message).toBe("it-kamasutra.com");
});

test('message of new post should be correct', () => {
    let action = actions.addPostActionCreator("it-kamasutra.com")
    let newState = profileReducer(state,action);
    expect(newState.postsData[4].message).toBe("it-kamasutra.com");
});

test('after deleting length of messages should be decrement', () => {
    //1.test data
    let action = actions.deletePost(1);
    //2. action
    let newState = profileReducer(state,action);

    //3. expectation
    expect(newState.postsData.length).toBe(3);
});

test('after deleting length shouldnt decrement if id is incorrect', () => {
    //1.test data
    let action = actions.deletePost(4);
    //2. action
    let newState = profileReducer(state,action);

    //3. expectation
    expect(newState.postsData.length).toBe(4);
});