import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserStatus, getUserProfile, savePhoto, saveProfile, updateUserStatus} from "../../redux/profile-reducer";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {compose} from "redux";
import {AppStateType} from '../../redux/redux-store';
import {ProfileType} from '../../types/types';

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
    constructor(props: PropsType) {
        super(props);
    }

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                // todo: may be replace push with Redirect??
                this.props.history.push("/login");
            }
        }

        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            this.props.getUserProfile(userId)
            this.props.getUserStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    componentWillUnmount(): void {
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile as ProfileType}
                     updateStatus={this.props.updateUserStatus}
                     savePhoto={this.props.savePhoto}/>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    })
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer);



// import React from 'react';
// import Profile from "./Profile";
// import {connect} from "react-redux";
// import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../redux/profile-reducer";
// import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
// import {compose} from "redux";
// import {ProfileType} from "../../types/types";

// import {AppStateType} from "../../redux/redux-store";
//
// type MapPropsType = ReturnType<typeof mapStateToProps>;
// type DispatchPropsType = {
//     getUserProfile: (userId: number) => void
//     getUserStatus: (userId: number) => void
//     updateStatus: (status: string) => void
//     savePhoto: (file: File) => void
//     saveProfile: (file: any) => any
// }
//
// type PathParamsType = {
//     userId: string
// }
//
// type PropsType = RouteComponentProps<PathParamsType> & MapPropsType & DispatchPropsType;
//
// class ProfileContainer extends React.Component<PropsType> {
//     constructor(props: PropsType) {
//         super(props);
//     }
//
//     refreshProfile() {
//         let userId: number | null = +this.props.match.params.userId;
//         if (!userId) {
//             userId = this.props.authorizedUserId;
//             if (!userId) {
//                 // todo: may be replace push with Redirect??
//                 this.props.history.push("/login");
//             }
//         }
//
//         if (!userId) {
//             console.error("ID should exists in URI params or in state ('authorizedUserId')");
//         } else {
//             this.props.getUserProfile(userId)
//             this.props.getUserStatus(userId)
//         }
//     }
//
//     componentDidMount() {
//         this.refreshProfile()
//     }
//
//     componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
//         if (this.props.match.params.userId !== prevProps.match.params.userId)
//             this.refreshProfile();
//     }
//
//     render() {
//         if (!this.props.isAuth) {
//             return <Redirect to={"/login"}/>
//         }
//
//         return <Profile  {...this.props}
//             profile={this.props.profile as ProfileType}
//                         status={this.props.status}
//                         updateStatus={this.props.updateStatus}
//                         isOwner={!this.props.match.params.userId}
//                         savePhoto={this.props.savePhoto}
//                         saveProfile={this.props.saveProfile}
//         />
//     }
// }
//
// let mapStateToProps = (state: AppStateType) => ({
//     profile: state.profilePage.profile,
//     status: state.profilePage.status,
//     authorizedUserId: state.auth.userId,
//     isAuth: state.auth.isAuth
// });
//
// export default compose<React.ComponentType>(
//     connect(mapStateToProps, {getUserProfile, getUserStatus, updateStatus: updateUserStatus, savePhoto, saveProfile})
//     , withRouter,
// (ProfileContainer));