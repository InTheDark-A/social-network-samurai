import React from 'react';
import {Link} from "react-router-dom";
import {Button, Col, Menu, Row} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import {UserOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {selectIsAuth, selectLogin} from "../../../redux/auth-selectors";
import {logout} from "../../../redux/auth-reducer";

const AppHeader: React.FC = () => {
    const isAuth = useSelector<AppStateType>(selectIsAuth);
    const login = useSelector<AppStateType>(selectLogin);
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(logout());
    }
    return <Header className="header">
        <div className="logo"/>
        <Row>
            <Col span={18}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><Link to={"/users"}>Samurais</Link></Menu.Item>
                </Menu>
            </Col>

            {isAuth ? <>
                    <Col span={0.9}>
                        <Avatar alt={login === undefined ? login : ""} size={"large"} icon={<UserOutlined/>}/>
                    </Col>
                    <Col span={3}>
                        <Button onClick={onClick}>Log out</Button>
                    </Col>
                </>
                :
                <Col span={4}>
                    <Link to={'/Login'}>Login</Link>
                    https://social-network.samuraijs.com/api/1.0
                </Col>
            }
        </Row>

    </Header>

// return <header className={
//         s.header
//     }
// >
    //     <div>
    //         <img src={logo} alt={"logo"}/>
    //         <div className={s.loginBlock}>
    //             {props.isAuth ? <div>{props.login}
    //                     <button onClick={props.logout}>Log out</button>
    //                 </div> :
    //                 <NavLink to={'/Login'}>Login</NavLink>
    //             }
    //             https://social-network.samuraijs.com/api/1.0
    //         </div>
    //     </div>
    // </header>
};

export default AppHeader;