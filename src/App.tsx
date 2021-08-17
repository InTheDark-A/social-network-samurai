import './App.css';
import {BrowserRouter, Link, Route, Switch, withRouter} from "react-router-dom";
import React, {Component, ComponentType} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspenseComponent} from "./hoc/WithSuspense";
import {UsersPage} from "./components/Users/UsersContainer";
import 'antd/dist/antd.css';
import {Breadcrumb, Layout, Menu} from 'antd';
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';
import AppHeader from "./components/Permanent components/Header/Header";
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const Login = React.lazy(() => import("./components/Login/Login"));
const ChatPage = React.lazy(() => import("./pages/Chat/ChatPage"));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    initializeApp: () => void
};
type PropsType = MapPropsType & DispatchPropsType;

const SuspendedProfile = withSuspenseComponent(ProfileContainer);

class App extends Component<PropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occured");
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized)
            return <Preloader/>
        return (<Layout>
            <AppHeader />
            <Content style={{padding: '0 50px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            style={{height: '100%'}}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                                <Menu.Item key="1"><Link to={"/profile"}>Profile</Link></Menu.Item>
                                <Menu.Item key="2"><Link to={"/dialogs"}>Messages</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                <Menu.Item key="5"><Link to={"/users"}>Samurais</Link></Menu.Item>
                            </SubMenu>
                            <Menu.Item key="6"><Link to={"/chat"}>Chat</Link></Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: 280}}>
                        <Switch>
                            <Route exact path={"/dialogs"} render={withSuspenseComponent(DialogsContainer)}/>
                            <Route path={"/profile/:userId?"} render={() => <SuspendedProfile/>}/>
                            <Route path={"/users"} render={() => <UsersPage pageTitle={"Самураи"}/>}/>
                            <Route path={"/Login"} render={withSuspenseComponent(Login)}/>
                            <Route path={"/chat"} render={withSuspenseComponent(ChatPage)}/>
                        </Switch>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>@Реактивный Самурай Турник</Footer>
        </Layout>);
        // return (
        //     <div className={"app-wrapper"}>
        //         <HeaderContainer/>
        //         <Navbar/>
        //         <div className={"app-wrapper-content"}>
        //             <Route exact path={"/dialogs"} render={withSuspenseComponent(DialogsContainer)}/>
        //             <Route path={"/profile/:userId?"} render={() => <SuspendedProfile/>}/>
        //             <Route path={"/users"} render={() => <UsersPage pageTitle={"Самураи"}/>}/>
        //             <Route path={"/Login"} render={withSuspenseComponent(Login)}/>
        //         </div>
        //     </div>);
    }
}

let mapStateToProps = (state: AppStateType) => ({
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