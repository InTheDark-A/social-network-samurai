import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../Common/FormsControls/FormsControls";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div >
            {error}
        </div>
        }
        <div>
            <b>Full name</b>: {createField("Full name", "fullname", [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>: { createField("", "lookingForAJob", [], Input, {type: "checkbox"} )}
        </div>

        <div>
            <b>My professional skills</b>:
            { createField("My professional skills", "professionalsSkills", [], Textarea  )}
        </div>
        <div>
            <b>About me</b>:
            { createField("About me", "aboutMe", [], Textarea)}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div key={key} >
                {/* todo: create some solution for embedded objects */}
                <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm =  reduxForm<ProfileType, PropsType>({form: "edit-profile"})(ProfileDataForm);
export default ProfileDataFormReduxForm;