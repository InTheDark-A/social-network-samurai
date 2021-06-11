import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../Common/FormsControls/FormsControls";

const ProfileDataForm = ({handleSubmit,onSubmit, lookingForAJob, profile, ...props}) => (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <button>Сохранить</button>
        </div>
        <div><span className={"bold"}>Имя:</span>
            <Field placeholder={profile.fullName} name={"fullname"} component={Input}
                   type={"textarea"}/>
        </div>
        <div><span className={"bold"}>Обо мне:</span>
            <Field placeholder={props.aboutMe} name={"aboutMe"} component={Input}
                   type={"textarea"}/>
        </div>
        <div><span className={"bold"}>Ищу работу ?</span>
            <Field name={"lookingForAJob"} component={Input}
                   type={"checkbox"}/>
        </div>
        <div><span className={"bold"}>Мои профессиональные навыки</span>
            <Field name={"professionalsSkills"} component={Input}
                   type={"textarea"}/>
        </div>
        {/*<div><b>Контакты:</b>{Object.keys(profile.contacts).map((key, index) => {*/}
        {/*    return <Contact key={index} contactTitle={key} contactValue={profile.contacts[key]}/>*/}
        {/*})}</div>*/}
    </form>);

// const Contact = ({contactValue, contactTitle, ...props}) => (
//     <div><b>{contactTitle}:</b> {contactValue} <Field placeholder={props.aboutMe} name={"aboutMe"} component={Input}
//                                                               type={"textarea"}/></div>
// )

const ProfileDataFormReduxForm =  reduxForm({form: "edit-profile"})(ProfileDataForm);
export  default ProfileDataFormReduxForm;