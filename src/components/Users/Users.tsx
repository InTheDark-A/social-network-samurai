import React, {FC} from 'react';
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type Props = {
    currentPage: number,
    totalUsersCount: number,
    pageSize: number,
    onPageChanged: (pageNumber: number) => void,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void
};

let Users:FC<Props> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users,  ...props}) => {
    return (
        <div>
            <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
                       pageSize={pageSize} onPageChanged={onPageChanged}/>
            <div>
                {
                    users ?
                    users.map(u => <User key={u.id} user={u} followingInProgress={props.followingInProgress}
                                                unfollow={props.unfollow} follow={props.follow} />)
                        :null
                }
            </div>
            <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
                       pageSize={pageSize} onPageChanged={onPageChanged}/>
        </div>
    );
}

export default Users;
