import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import SuperDialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preoloader from "./components/Common/Preloader/Preoloader";
import store from "./redux/redux-store";

class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized)
            return <Preoloader/>

        return (
            <div className={"app-wrapper"}>
                <HeaderContainer/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Route exact path={"/dialogs"} render={() => <SuperDialogsContainer/>}/>
                    <Route path={"/profile/:userId?"} render={() => <ProfileContainer/>}/>
                    <Route path={"/users"} render={() => <UsersContainer/>}/>
                    <Route path={"/Login"} render={() => <Login/>}/>
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