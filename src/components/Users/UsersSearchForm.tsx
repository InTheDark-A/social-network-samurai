import React, {FC} from "react";
import {Formik} from 'formik';
import {FilterType, getUsers} from "../../redux/users-reducer";
import {Field} from "formik";
import {useSelector} from "react-redux";
import {getFilter} from "../../redux/users-selector";


const UsersSearchFormValidate = (values: FormType) => {
    const errors: any = {};
    return errors;
};

type FriendFormType = "true" | "false" | "null"
type FormType = {
    term: string,
    friend: FriendFormType
}

type PropsType = { onFilterChanged: (filter: FilterType) => void }

export const UsersSearchForm: FC<PropsType> = React.memo(({onFilterChanged}) => {
    const filter = useSelector(getFilter);
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        };
        onFilterChanged(filter);
        setSubmitting(false);
    };

    return <div>
        <Formik enableReinitialize={true} initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}} validate={UsersSearchFormValidate} onSubmit={submit}>
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="term"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.term}
                    />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Поиск
                    </button>
                </form>
            )}
        </Formik>
    </div>;
});