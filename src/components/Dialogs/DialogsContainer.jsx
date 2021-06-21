import React from 'react';
import { actions} from "../../redux/dialogs-reducer";
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

const DialogsContainer = compose(
    connect(mapStateToProps,
        {onSendMessageClick: actions.sendMessageCreator})
    //, withAuthRedirectComponent
)(Dialogs);

export default DialogsContainer;