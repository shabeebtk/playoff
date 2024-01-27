import React, { useEffect, useState } from "react";
import playoffLogo from '../../assets/images/playoff_logo.png'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/action/userAuthAction";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import Cookies from 'js-cookie'
import ButtonLoader from "../loader/ButtonLoader";
import GoogleLogin from "react-google-login";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

const ValidationSchemaExample = () => (
    <div>
        <h1>Signup</h1>
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
                // same shape as initial values
                console.log(values);
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <Field name="firstName" />
                    {errors.firstName && touched.firstName ? (
                        <div>{errors.firstName}</div>
                    ) : null}
                    <Field name="lastName" />
                    {errors.lastName && touched.lastName ? (
                        <div>{errors.lastName}</div>
                    ) : null}
                    <Field name="email" type="email" className='block w-full mt-1 py-2 pl-2 rounded-md shadow-sm' />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
);

export default ValidationSchemaExample;