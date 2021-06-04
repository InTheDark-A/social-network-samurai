// eslint-disable-next-line no-unused-vars
import React from 'react';
import { sendMessageCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
//import {withAuthRedirectComponent} from "../../hoc/WithAuthRedirect";

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsData.dialogs,
        newMessageBody: state.dialogsData.newMessageBody,
        messages: state.dialogsData.messages
    };
};

const SuperDialogsContainer = compose(
    connect(mapStateToProps,
        {onSendMessageClick: sendMessageCreator})
    //, withAuthRedirectComponent
)(Dialogs);

export default SuperDialogsContainer;