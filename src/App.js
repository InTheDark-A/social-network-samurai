import './App.css';
import Navbar from "./components/Permanent components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Permanent components/Header/HeaderContainer";
import React, {Component, Suspense} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store from "./redux/redux-store";
//import SuperDialogsContainer from "./components/Dialogs/DialogsContainer";
//import ProfileContainer from "./components/Profile/ProfileContainer";
//import Login from "./components/Login/Login";
import {withSuspenseComponent} from "./hoc/WithSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const Login = React.lazy(() => import("./components/Login/Login"));

class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
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
                    <Route path={"/profile/:userId?"} render={withSuspenseComponent(ProfileContainer)}/>
                    <Route path={"/users"} render={() => <UsersContainer/>}/>
                    <Route path={"/Login"} render={withSuspenseComponent(Login)}/>
                </div>
            </div>);
    }
}

let mapStateToProps = (state) => ({
    initialized: state.app.initialized,
});

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => (
    <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
);

export default SamuraiJSApp;