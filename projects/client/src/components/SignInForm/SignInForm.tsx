import * as Yup from "yup";
import React, { useEffect } from "react";
import classes from "./signInForm.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Oauth from "../Oauth/Oauth";
import Axios from "axios";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import { AcceptableToastType } from "../../types/Toast";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/tokenSlice";
import { useNavigate } from "react-router-dom";

interface FormValues {
	email: string;
	password: string;
}

interface SignInFormProps {
	onToastChange: (showToast: boolean, toastMessage: string, toastType: AcceptableToastType) => void;
}

const SignInSchema = Yup.object().shape({
	email: Yup.string()
		.matches(/^[\w-.]+(\+[\w-]+)?@([\w-]+\.)+[\w-]{2,4}$/, "incorrect e-mail format")
		.required("e-mail cannot be empty"),
	password: Yup.string()
		.required("password cannot be empty")
		.min(6, "incorrect password format")
		.matches(/[a-z]/, "incorrect password format")
		.matches(/[A-Z]/, "incorrect password format")
		.matches(/[0-9]/, "incorrect password format")
		.matches(/[!@#$%^&*()_+]/, "incorrect password format"),
});

const SignInForm = ({ onToastChange }: SignInFormProps): React.ReactElement => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userData = useSelector((state: any) => state?.user?.value);

	const initialValues: FormValues = {
		email: "",
		password: "",
	};

	const handleSubmit = async (credentials: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
		try {
			const response = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, credentials);

			const jwt = response?.data?.data;
			if (!jwt || jwt === undefined) {
				console.error("JWT not found in the response data");
				return;
			}

			dispatch(setToken(jwt));
			localStorage.setItem("token", jwt)

			setTimeout(() => {
				navigate("/dashboard")
			}, 1000);
		} catch (error: any) {
			const errorMessage = error?.response?.data?.message;
			onToastChange(true, errorMessage !== undefined ? errorMessage : "Login Failed", "error");
		}

		setTimeout(() => {
			onToastChange(false, "", "");
		}, 5000);

		setSubmitting(false);
	};

	useEffect(() => {
		const displayWelcomeToast = async () => {
			const displayName = await userData?.displayName;
			if (displayName) {
				onToastChange(true, `Welcome ${displayName}`, "ok");
			}
		};
		
		displayWelcomeToast();
	}, [userData]);

	return (
		<div className={classes.container}>
			<p className={classes.title}>Sign In</p>
			<Formik
				initialValues={initialValues}
				validationSchema={SignInSchema}
				validateOnChange={true}
				validateOnBlur={true}
				onSubmit={(credentials, setSubmitting) => {
					handleSubmit(credentials, setSubmitting);
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<div className={classes.formikFieldContainer}>
							<Input name="email" placeholder="Enter e-mail" isPassword={false} marBot="25px" />

							<ErrorMessage name="email" component="div" className={classes.inputError} />
						</div>
						<div className={classes.formikFieldContainer}>
							<Input name="password" placeholder="Password" isPassword={true} marBot="25px" />
							<ErrorMessage name="password" component="div" className={classes.inputError} />
						</div>
						<div className={classes.forgot}>
							<a href="/">Forgot Password?</a>
						</div>
						<div className={classes.button}>
							<Button title="Login" type="submit" isSubmitting={isSubmitting} />
						</div>
					</Form>
				)}
			</Formik>

			<div className={classes.continue}>
				<p>or continue with</p>
			</div>
			<Oauth />
		</div>
	);
};

export default SignInForm;
