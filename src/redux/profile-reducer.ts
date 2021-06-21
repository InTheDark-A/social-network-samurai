import {ResultCodesEnum} from "../api/api";
import {PhotosType, PostDataType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileApi} from "../api/profileApi";
import {stopSubmit} from "redux-form";

let initialState = {
    postsData: [
        {id: 0, message: "Hi, how are you?", likesCount: 1},
        {id: 1, message: "It's my first post", likesCount: 5},
        {id: 2, message: "kek", likesCount: 4},
        {id: 3, message: "meme", likesCount: 999}
    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: "",
}
export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>;

const profileReducer = (state = initialState, action:ActionsTypes):InitialStateType => {
    let stateCopy;
    switch (action.type) {
        case 'SN/profile/ADD-POST':
            debugger;
            let newPost = {id: 5, message: action.text, likesCount: 0};
            stateCopy = {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ""
            };
            return stateCopy;

        case "SN/profile/SET-USER-PROFILE":
            return {...state, profile: action.profile}
        case "SN/profile/SET-STATUS":
            return {...state, status: action.status};
        case "SN/profile/DELETE-POST":
            return {...state, postsData: state.postsData.filter(p => p.id !== action.id)};
        case "SN/profile/SAVE-PHOTO-SUCCESS":
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType};
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (text:string) => {
        return {
            type: 'SN/profile/ADD-POST',
            text: text
        } as const
    },
    setUserProfile: (profile: ProfileType) => {
        return {type: "SN/profile/SET-USER-PROFILE", profile} as const;
    },
    setUserStatus:(status: string) => {
        return {type: "SN/profile/SET-STATUS", status} as const;
    },
    deletePost: (postId: number) => {
        return {type: "SN/profile/DELETE-POST", id: postId} as const;
    },
    savePhotoSuccess: (photos:PhotosType) => {
        return {type: "SN/profile/SAVE-PHOTO-SUCCESS", photos} as const;
    },
}

//thunc

export const getUserProfile = (userId:number):ThunkType => {
    return async (dispatch) => {
        let data = await profileApi.getProfile(userId);
        debugger
        dispatch(actions.setUserProfile(data));
    }
};

export const getUserStatus = (userId:number):ThunkType => {
    return async (dispatch) => {
        let response = await profileApi.getStatus(userId);

        dispatch(actions.setUserStatus(response));
    }
};

export const updateUserStatus = (status:string):ThunkType => {
    return async (dispatch) => {
        let response = await profileApi.updateStatus(status);
        if (response.resultCode === ResultCodesEnum.Success)
             dispatch(actions.setUserStatus(status));
    }
};

export const savePhoto = (file:File):ThunkType => {
    return async (dispatch) => {
        let response = await profileApi.savePhoto(file);
        if (response.resultCode === 0)
            dispatch(actions.savePhotoSuccess(response.data.photos));
    }
};

export const saveProfile = (profile:ProfileType):ThunkType => {
    return async (dispatch) => {
        let response = await profileApi.saveProfile(profile);
        if (response.data.resultCode === 0)
            dispatch(actions.setUserProfile(response.data));
    }
};
export default profileReducer;