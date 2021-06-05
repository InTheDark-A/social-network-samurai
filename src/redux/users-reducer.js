import {usersApi} from "../api/api";
import {updateObjectInArray} from "../utils/object-helper";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_COUNT_USERS = "SET-TOTAL-COUNT-USERS";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE-IS-FOLLOWING-PROGRESS";

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [2, 3]
};

const usersReducer = (state = initialState, action) => {
    let stateCopy;

    switch (action.type) {
        case FOLLOW:
            stateCopy = {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true}),
                // users: state.users.map(el => {
                //     if (el.id === action.userId)
                //         return {...el, followed: true};
                //     return el;
                // })
            };
            return stateCopy;
        case UNFOLLOW:
            stateCopy = {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false}),
            };
            return stateCopy;
        case SET_USERS:
            return {...state, users: [...action.users]};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_COUNT_USERS:
            return {...state, totalUsersCount: action.count};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case TOGGLE_IS_FOLLOWING_PROGRESS:

            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
}

export const followAC = (userId) => ({type: FOLLOW, userId});
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalCountUsers = (totalCount) => ({type: SET_TOTAL_COUNT_USERS, count: totalCount});
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching});
export const toogleIsFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: isFetching,
    userId
});


export const getUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));

        let response = await usersApi.getUsers(page, pageSize);

        dispatch(setCurrentPage(page));
        dispatch(setIsFetching(false));
        dispatch(setTotalCountUsers(response.data.totalCount));
        dispatch(setUsers(response.data.items))

    }
};

const followUnFollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toogleIsFollowingProgress(true, userId));

    let response = await apiMethod(userId);
    dispatch(toogleIsFollowingProgress(false, userId));
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
}

export const follow = (userId) => {

    return async (dispatch) => {
        followUnFollowFlow(dispatch, userId, usersApi.follow.bind(usersApi), followAC);
    }
};

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnFollowFlow(dispatch, userId, usersApi.unfollow.bind(usersApi), unfollowAC);
    }
};

export default usersReducer;
