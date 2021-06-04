import React from "react";
import styles from "./FormControls.module.css";
import {Field} from "redux-form";

export const FormControl = ({input, meta, element, ...props}) => {
    const hasError = meta.touched && meta.error;
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
            {props.children}
        </div>
        {hasError && <span><b>{meta.error}</b></span>}
    </div>
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};

export const CreateField = (placeHolder, name, validators, component) =>
    <Field placeholder={placeHolder} name={name} component={component} validate={validators}/>