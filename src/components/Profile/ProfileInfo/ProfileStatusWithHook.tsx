import React, {ChangeEvent, FC, useEffect, useState} from "react";

//import s from './ProfileInfo.module.css';

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
};



let ProfileStatusWithHook:FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div>
            {!editMode &&
            <div>
                <span onClick={activateEditMode.bind(this)}>{props.status || "------"}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange} type={"text"} autoFocus={true}
                       onBlur={deactivateEditMode.bind(this)}
                       value={status}/>
            </div>
            }
        </div>
    );
}

export default ProfileStatusWithHook;