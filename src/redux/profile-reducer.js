import {profileApi} from "../api/api";

const ADD_POST = 'samurai-network/profile/ADD-POST';
const SET_USER_PROFILE = "samurai-network/profile/SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";
const DELETE_POST = "DELETE-POST";
const SAVE_PHOTO_SUCCESS = "SAVE-PHOTO-SUCCESS";

let initialState = {
    postsData: [
        {id: 0, message: "Hi, how are you?", likesCount: 1},
        {id: 1, message: "It's my first post", likesCount: 5},
        {id: 2, message: "kek", likesCount: 4},
        {id: 3, message: "meme", likesCount: 999}
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {
    let stateCopy;

    switch (action.type) {
        case ADD_POST:
            debugger;
            let newPost = {id: 5, message: action.text, likesCount: 0};
            stateCopy = {
                ...state,
                postsData: [...state.postsData, newPost],
            };
            return stateCopy;

        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status};
        case DELETE_POST:
            return {...state, postsData: state.postsData.filter(p => p.id !== action.id)};
        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos}};
        default:
            return state;
    }
}

export const addPostActionCreator = (text) => {
    return {
        type: ADD_POST,
        text: text
    }
};


const setUserProfile = (profile) => {
    return {type: SET_USER_PROFILE, profile};
};
const setUserStatus = (status) => {
    return {type: SET_STATUS, status};
};
export const deletePost = (postId) => {
    return {type: DELETE_POST, id: postId};
};
export const savePhotoSuccess = (photos) => {
    return {type: SAVE_PHOTO_SUCCESS, photos};
};


//thunc

export const getUserProfile = (userId) => {
    return (dispatch) => {
        profileApi.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            });
    }
};

export const getUserStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileApi.getStatus(userId);

        dispatch(setUserStatus(response.data));
    }
};

export const updateUserStatus = (status) => {
    return async (dispatch) => {
        let response = profileApi.updateStatus(status);
        console.log(response);
        // if (response.data.resultCode === 0)
        //     dispatch(setUserStatus(response));
    }
};

export const savePhoto = (file) => {
    return async (dispatch) => {
        let response = await profileApi.savePhoto(file);
        if (response.data.resultCode === 0)
            dispatch(savePhotoSuccess(response.data.data.photos));
    }
};

export const saveProfile = (profile) => {
    return async (dispatch) => {
        let response = await profileApi.saveProfile(profile);
        if (response.data.resultCode === 0)
            dispatch(setUserProfile(response.data));
    }
};
export default profileReducer;