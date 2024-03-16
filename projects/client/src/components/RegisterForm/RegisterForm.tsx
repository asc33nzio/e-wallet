import * as Yup from "yup";
import React from "react";
import classes from "./registerForm.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Oauth from "../Oauth/Oauth";
import Axios from "axios";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import { AcceptableToastType } from "../../types/Toast";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/tokenSlice";
import { useNavigate } from "react-router-dom";

interface FormValues {
	fullName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface RegisterPayload {
	email: string;
	displayName: string;
	password: string;
}

interface RegisterFormProps {
	onToastChange: (showToast: boolean, toastMessage: string, toastType: AcceptableToastType) => void;
}

const SignUpSchema = Yup.object().shape({
	fullName: Yup.string()
		.min(3, "name should be at least 3 characters long")
		.max(30, "name cannot be longer than 30 characters")
		.required("name cannot be empty"),
	email: Yup.string()
		.matches(/^[\w-.]+(\+[\w-]+)?@([\w-]+\.)+[\w-]{2,4}$/, "incorrect e-mail format")
		.required("e-mail cannot be empty"),
	password: Yup.string()
		.required("password cannot be empty")
		.min(6, "password must be at least 6 characters long")
		.matches(/[a-z]/, "password must contain at least 1 lowercase letter")
		.matches(/[A-Z]/, "password must contain at least 1 uppercase letter")
		.matches(/[0-9]/, "password must contain at least 1 number")
		.matches(/[!@#$%^&*()_+]/, "password must contain at least 1 symbol"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), undefined], "passwords must match")
		.required("please confirm your password"),
});

const Register = ({ onToastChange }: RegisterFormProps): React.ReactElement => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const initialValues: FormValues = {
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const handleSubmit = async (userInput: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
		try {
			const registerPayload: RegisterPayload = {
				email: userInput.email?.trim(),
				displayName: userInput.fullName?.trim(),
				password: userInput.password,
			};

			const response = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, registerPayload);

			const jwt = response?.data?.data;
			if (!jwt || jwt === undefined) {
				console.error("JWT not found in the response data");
				return;
			}
			dispatch(setToken(jwt));
			localStorage.setItem("token", jwt)

			onToastChange(true, "Registered successfully", "ok");
			navigate("/home/dashboard");
		} catch (error: any) {
			const errorMessage = error?.response?.data?.message;
			onToastChange(true, errorMessage !== undefined ? errorMessage : "Login Failed", "error");
		}

		setTimeout(() => {
			onToastChange(false, "", "");
		}, 5000);

		setSubmitting(false);
	};

	return (
		<div className={classes.container}>
			<p className={classes.title}>Register</p>
			<Formik
				initialValues={initialValues}
				validationSchema={SignUpSchema}
				validateOnChange={true}
				validateOnBlur={true}
				onSubmit={(userInput, setSubmitting) => {
					handleSubmit(userInput, setSubmitting);
				}}
			>
				{({ errors, isSubmitting }) => (
					<Form>
						<div className={classes.formikFieldContainer}>
							<Input name="fullName" placeholder="Enter full name" isPassword={false} marBot={"40px"} />
							{errors.fullName && (
								<ErrorMessage name="fullName" component="div" className={classes.inputError} />
							)}
						</div>
						<div className={classes.formikFieldContainer}>
							<Input name="email" placeholder="Enter e-mail" isPassword={false} marBot={"40px"} />
							<ErrorMessage name="email" component="div" className={classes.inputError} />
						</div>
						<div className={classes.formikFieldContainer}>
							<Input name="password" placeholder="Enter password" isPassword={true} marBot={"40px"} />
							<ErrorMessage name="password" component="div" className={classes.inputError} />
						</div>
						<div className={classes.formikFieldContainer}>
							<Input
								name="confirmPassword"
								placeholder="Confirm password"
								isPassword={true}
								marBot={"40px"}
							/>
							<ErrorMessage name="confirmPassword" component="div" className={classes.inputError} />
						</div>
						<div className={classes.button}>
							<Button title="Register" type="submit" isSubmitting={isSubmitting} />
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

export default Register;
