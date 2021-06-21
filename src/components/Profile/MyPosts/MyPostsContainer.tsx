import React from 'react';
import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {PostDataType} from "../../../types/types";
import {AppStateType} from "../../../redux/redux-store";

type MapStatePropsTypes = {
    postsData: Array<PostDataType>
};

type OwnProps = {}

type MapDispatchPropsType = {
    addPost: (text:string) => void
};

let mapStateToProps = (state:AppStateType):MapStatePropsTypes => {
    return {
        postsData: state.profilePage.postsData
    };
};


const PostsContainer = connect<MapStatePropsTypes, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts);

export default PostsContainer;