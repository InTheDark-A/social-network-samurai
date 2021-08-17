import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect, useDispatch, useSelector} from "react-redux";
import {login, logout} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormControls.module.css";
import {AppStateType} from "../../redux/redux-store";

const maxLength20 = maxLengthCreator(30);

type LoginFormOwnProps = {
    onSubmit: (formData: LoginFormValuesType) => void
}

type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

type LoginFormPropertiesType = Extract<keyof LoginFormValuesType, string>;

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({
                                                                                                          handleSubmit,
                                                                                                          error,
                                                                                                          onSubmit
                                                                                                      }) => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Field placeholder={"Login"} name={"login"} component={Input} type={"login"}
                       validate={[required, maxLength20]}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input} type={"password"}
                       validate={[required, maxLength20]}/>
            </div>
            {createField<LoginFormPropertiesType>(undefined, "rememberMe", [], Input, {type: "password"})}
            {/*<div>*/}
            {/*    <Field type={"checkbox"} name={"rememberMe"} component={"input"}/> remember me*/}
            {/*</div>*/}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField("Symbols from image", "captcha", [required], Input, {})}

            {
                error &&
                <div className={style.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <button>login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: "login"})(LoginForm);

const Login: FC = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
    };
    if (isAuth)
        return <Redirect to={"/profile"}/>

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}


export default (Login);