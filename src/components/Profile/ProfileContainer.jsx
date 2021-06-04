import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            if (this.props.isAuth)
                userId = this.props.authorizedUserId;
            else
                this.props.history.push("/login");
        }

        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        if (this.props.isAuth === false) {
            return <Redirect to={"/login"}/>
        }

        console.log(this.props);
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                        updateStatus={this.props.updateStatus}/>
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile, status: state.profilePage.status,
    authorizedUserId: state.profilePage.userId, isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateStatus: updateUserStatus}),
    withRouter,
    //withAuthRedirectComponent
)
(ProfileContainer);
