import React from 'react';
import {useSelector} from "react-redux";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {withAuthRedirectComponent} from "../../hoc/WithAuthRedirect";
import {getIsFetching} from "../../redux/users-selector";


type UsersPagePropsTypes = {
    pageTitle: string,
};

export const UsersPage: React.FC<UsersPagePropsTypes> = (props) => {
    const isFetching = useSelector(getIsFetching);

    return <>
        {isFetching ? <Preloader/>
            : null}
        <h2>{props.pageTitle}</h2>
        <Users/>
    </>;
};


