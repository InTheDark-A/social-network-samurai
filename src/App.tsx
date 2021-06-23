import './App.css';
import Navbar from "./components/Permanent components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Permanent components/Header/HeaderContainer";
import React, {Component, ComponentType, Suspense} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspenseComponent} from "./hoc/WithSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const Login = React.lazy(() => import("./components/Login/Login"));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    initializeApp: () => void
};
type PropsType = MapPropsType & DispatchPropsType;

const SuspendedProfile = withSuspenseComponent(ProfileContainer);

class App extends Component<PropsType> {
    catchAllUnhandledErrors = (e:PromiseRejectionEvent) => {
        alert("Some error occured");
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized)
            return <Preloader/>
        return (
            <div className={"app-wrapper"}>
                <HeaderContainer/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Route exact path={"/dialogs"} render={withSuspenseComponent(DialogsContainer)}/>
                    <Route path={"/profile/:userId?"} render={() => <SuspendedProfile />}/>
                    <Route path={"/users"} render={() => <UsersContainer pageTitle={"Самураи"}/>}/>
                    <Route path={"/Login"} render={withSuspenseComponent(Login)}/>
                </div>
            </div>);
    }
}

let mapStateToProps = (state:AppStateType) => ({
    initialized: state.app.initialized,
});

const AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = () => (
    <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
);

export default SamuraiJSApp;