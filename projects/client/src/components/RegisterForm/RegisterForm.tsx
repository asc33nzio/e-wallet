import * as Yup from "yup";
import React from "react";
import classes from "./registerForm.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Oauth from "../Oauth/Oauth";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";

interface FormValues {
	fullName: string;
	email: string;
	password: string;
	confirmPassword: string;
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

const Register = (): React.ReactElement => {
	const initialValues: FormValues = {
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
		console.log(values);
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
				onSubmit={handleSubmit}
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
