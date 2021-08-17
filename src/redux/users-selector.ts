import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";


export const getUsersFromState = (state:AppStateType) => {
    return state.usersPage.users;
}

export const getUsersSelector = (state:AppStateType) => {
    // @ts-ignore
    return getUsersFromState().filter(u => true);
}

export const getUsersSuperSelector = createSelector(getUsersFromState, (users) => {
    return users.filter(u => true);
})

export const getPageSize = (state:AppStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state:AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state:AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state:AppStateType) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state:AppStateType) => {
    return state.usersPage.followingInProgress;
}

export const getFilter = (state:AppStateType) => {
    return state.usersPage.filter;
}

