import React from 'react';
import { actions} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
//import {withAuthRedirectComponent} from "../../hoc/WithAuthRedirect";

let mapStateToProps = (state:AppStateType) => {
    return {
        dialogs: state.dialogsData.dialogs,
        messages: state.dialogsData.messages
    };
};

type MapDispatchPropsType = {
    onSendMessageClick: () => void
}

const DialogsContainer = compose(
    connect(mapStateToProps,
        {onSendMessageClick: actions.sendMessageCreator})
    //, withAuthRedirectComponent
)(Dialogs);

export default DialogsContainer;