import * as Yup from "yup";
import React from "react";
import classes from "./signInForm.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Oauth from "../Oauth/Oauth";
import Axios from "axios";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import { AcceptableToastType } from "../../types/Toast";
import { decodeJWT } from "../../utils/jwt";

interface FormValues {
	email: string;
	password: string;
}

interface SignInFormProps {
	onToastChange: (showToast: boolean, modalMessage: string, modalType: AcceptableToastType) => void;
}

const SignUpSchema = Yup.object().shape({
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
	const initialValues: FormValues = {
		email: "",
		password: "",
	};

	const getUserInfo = async (uid: string | undefined, jwt: string) => {
		try {
			const response = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${uid}`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});

			const userData = response?.data?.data;
			return userData;
		} catch (error: any) {
			console.error(error?.response);
		}
	};

	const handleSubmit = async (credentials: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
		try {
			const response = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, credentials);

			const jwt = response?.data?.data;
			if (!jwt) {
				console.error("JWT not found in the response data");
				return;
			}

			const payload = decodeJWT(jwt);
			const uid = payload?.uid;
			const userData = await getUserInfo(uid, jwt);
			const displayName = userData?.displayName;

			onToastChange(true, `Welcome ${displayName}`, "ok");
		} catch (error: any) {
			console.log(error?.response?.data?.message);
			onToastChange(true, "Login Failed", "error");
		}

		setTimeout(() => {
			onToastChange(false, "", "");
		}, 3000);

		setSubmitting(false);
	};

	return (
		<div className={classes.container}>
			<p className={classes.title}>Sign In</p>
			<Formik
				initialValues={initialValues}
				validationSchema={SignUpSchema}
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
