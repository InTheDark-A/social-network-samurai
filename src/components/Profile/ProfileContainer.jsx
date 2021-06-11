import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component {
    refreshProfile() {
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

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId)
            this.refreshProfile();
    }

    render() {
        if (this.props.isAuth === false) {
            return <Redirect to={"/login"}/>
        }

        console.log(this.props.authorizedUserId);
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        isOwner={!this.props.match.params.userId}
                        savePhoto={this.props.savePhoto}
                        saveProfile={this.props.saveProfile}
        />
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile, status: state.profilePage.status,
    authorizedUserId: state.auth.userId, isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, {
        getUserProfile, getUserStatus, updateStatus: updateUserStatus, savePhoto,
        saveProfile
    }),
    withRouter,
    //withAuthRedirectComponent
)
(ProfileContainer);
