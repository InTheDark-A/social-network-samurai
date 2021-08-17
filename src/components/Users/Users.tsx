import React, {useEffect} from 'react';
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, follow, getUsers, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFilter,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersFromState
} from "../../redux/users-selector";
import {useHistory} from 'react-router-dom';
import * as queryString from "querystring";


type QueryParamsType = { term?: string; page?: string, friend?: string };
let Users = () => {
    const users = useSelector(getUsersFromState);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getFilter);
    const followingInProgress = useSelector(getFollowingInProgress);
    const dispatch = useDispatch();
    const history = useHistory();

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter));
    };
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter));
    };
    const unfolloW = (userId: number) => {
        dispatch(unfollow(userId));
    };
    const folloW = (userId: number) => {
        dispatch(follow(userId));
    };
    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;
        let actualPage = currentPage;
        let actualFilter = filter;
        if (!!parsed.page) actualPage = +parsed.page
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string};
        if (!!parsed.friend) actualFilter = {
            ...actualFilter,
            friend: parsed.friend === "null" ? null : parsed.friend === "true"
        };
        dispatch(getUsers(actualPage, pageSize, actualFilter));
    }, [])
    useEffect(() => {
        const query: QueryParamsType = {};
        if (!!filter.term) query.term = filter.term;
        if (!!filter.friend !== null) query.friend = String(filter.friend);
        if (currentPage !== 1) query.page = String(currentPage);
        history.push({
            pathname: "/users",
            search: queryString.stringify(query)
        })
    }, [filter, currentPage]);
    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
                       pageSize={pageSize} onPageChanged={onPageChanged}/>
            <div>
                {
                    users ?
                        users.map(u => <User key={u.id} user={u} followingInProgress={followingInProgress}
                                             unfollow={unfolloW} follow={folloW}/>)
                        : null
                }
            </div>
            <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
                       pageSize={pageSize} onPageChanged={onPageChanged}/>
        </div>
    );
}

export default Users;
