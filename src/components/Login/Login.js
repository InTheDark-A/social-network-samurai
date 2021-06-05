import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormControls.module.css";

const maxLength20 = maxLengthCreator(30);

const LoginForm = ({handleSubmit, error, onSubmit}) => {
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
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={"input"}/> remember me
            </div>
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

const LoginReduxForm = reduxForm({form: "login"})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.login, formData.password, formData.rememberMe);
        console.log(formData);
    };

    if (props.isAuth)
        return <Redirect to={"/profile"}/>

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({isAuth: state.auth.isAuth});

export default connect(mapStateToProps, {login, logout})(Login);