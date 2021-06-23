import {Redirect} from "react-router-dom";
import React from "react";
import {connect, MapStateToProps} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsToRedirect = (state:AppStateType):MapPropsType => ({isAuth: state.auth.isAuth});
type MapPropsType = { isAuth: boolean }

export function withAuthRedirectComponent<WCP>(Component:React.ComponentType<WCP>){
    function RedirectComponent(props: MapPropsType & WCP) {
        if (!props.isAuth) return <Redirect to={"/login"}/>;
        let {isAuth, ...restProps} = props;
        return <Component {...restProps as unknown as WCP}/>
    }

    return connect<any, never, WCP, AppStateType>(
        mapStateToPropsToRedirect)
    (RedirectComponent);
}