import {updateObjectInArray} from "../utils/object-helper";
import {UserType} from "../types/types";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {usersApi} from "../api/usersApi";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [2, 3] as Array<number> //Array of users ids
};

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    let stateCopy;

    switch (action.type) {
        case "FOLLOW":
            stateCopy = {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true}),
            };
            return stateCopy;
        case "UNFOLLOW":
            stateCopy = {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false}),
            };
            return stateCopy;
        case "SET_USERS":
            return {...state, users: [...action.users]};
        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET_TOTAL_COUNT_USERS":
            return {...state, totalUsersCount: action.count};
        case "TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching};
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    followAC: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowAC: (userId: number) => ({type: 'UNFOLLOW', userId}as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users}as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage}as const),
    setTotalCountUsers: (totalCount: number) => ({
        type: 'SET_TOTAL_COUNT_USERS',
        count: totalCount
    }as const),
    setIsFetching: (isFetching: boolean) => ({
        type: 'TOGGLE_IS_FETCHING',
        isFetching: isFetching
    }as const),
    toogleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching: isFetching,
        userId
    }as const),
}

type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = BaseThunkType<ActionsTypes>;

export const getUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await usersApi.getUsers(page, pageSize);
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setTotalCountUsers(response.totalCount));
        dispatch(actions.setUsers(response.items))
    }
};

const _followUnFollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toogleIsFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    dispatch(actions.toogleIsFollowingProgress(false, userId));
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnFollowFlow(dispatch, userId, usersApi.follow.bind(usersApi), actions.followAC);
    }
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnFollowFlow(dispatch, userId, usersApi.unfollow.bind(usersApi), actions.unfollowAC);
    }
};

export default usersReducer;
