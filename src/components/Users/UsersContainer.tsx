import React from 'react';
import {connect} from "react-redux";
import {follow, getUsers, unfollow,} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {withAuthRedirectComponent} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersFromState}
    from "../../redux/users-selector";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsTypes = {
    pageSize: number,
    currentPage: number,
    users: Array<UserType>,
    isFetching: boolean,
    totalUsersCount: number,
    followingInProgress: Array<number>,
};

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
};

type OwnProps = {
    pageTitle: string,
};

type PropsTypes = MapStatePropsTypes & MapDispatchPropsType & OwnProps;

class UsersAPIComponent extends React.Component<PropsTypes> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber:number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/>
                :
                <>
                    <h2>{this.props.pageTitle}</h2>
                    <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.users}
                       onPageChanged={this.onPageChanged}
                       followingInProgress={this.props.followingInProgress}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                />
                </>}

        </>;
    }
}

let mapStateToProps = (state:AppStateType):MapStatePropsTypes => {
    return {
        users: getUsersFromState(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    };
};

export default compose(
    connect<MapStatePropsTypes, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, {
        follow,
        unfollow,
        getUsers
    }),
    withAuthRedirectComponent
)(UsersAPIComponent) as any; //React.ComponentType<WCP>