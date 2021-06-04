import React from 'react';
import {addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.postsData
    };
};


const PostsContainer = connect(mapStateToProps, {
    addPost: addPostActionCreator
})(MyPosts);

export default PostsContainer;