import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

let mapStateToPropsToRedirect = (state) => ({isAuth: state.auth.isAuth});
export const withAuthRedirectComponent = (Component) => {
    class RedirectComponent extends React.Component{
        render() {
            if (this.props.isAuth === false) return <Redirect to={"/login"} />
            return <Component {...this.props}/>
        }
    }


    return connect(mapStateToPropsToRedirect)(RedirectComponent);
}