import React from 'react';
import {connect} from "react-redux";
import {
    follow,
    getUsers,
    setCurrentPage, toogleIsFollowingProgress, unfollow,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {withAuthRedirectComponent} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersFromState
} from "../../redux/users-selector";


class UsersAPIComponent extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/>
                :
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.users}
                       onPageChanged={this.onPageChanged}
                       isFetching={this.props.isFetching}
                       toogleIsFollowingProgress={this.props.toogleIsFollowingProgress}
                       followingInProgress={this.props.followingInProgress}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                />}

        </>;
    }
}

let mapStateToProps = (state) => {
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
    connect(mapStateToProps, {
        setCurrentPage,
        toogleIsFollowingProgress,
        getUsers,
        follow,
        unfollow
    }),
    withAuthRedirectComponent
)(UsersAPIComponent)