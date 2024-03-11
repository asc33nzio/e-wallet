import React, { useEffect, useState } from "react";
import classes from "./login.module.css";
import Navbar from "../../components/Navbar/Navbar";
import SignInForm from "../../components/SignInForm/SignInForm";
import guy from "../../assets/person1.png";
import Toast from "../../components/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/Toast/ToastContext";
import { useSelector } from "react-redux";

const Login = (): React.ReactElement => {
	const navigate = useNavigate();
	const { showToast, toastMessage, toastType, setToast } = useToast();
	const [isDesktopDisplay, setIsDesktopDisplay] = useState(false);
	const userData = useSelector((state: any) => state?.user?.value);

	const registerClickHandler = () => {
		navigate("/register");
	};

	useEffect(() => {
		const handleResize = () => {
			setIsDesktopDisplay(window.outerWidth > 768);
		};

		handleResize();

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (Object.keys(userData).length > 0) {
			navigate("/dashboard");
		}
	}, [userData]);

	return isDesktopDisplay ? (
		<>
			<Navbar />
			{showToast ? <Toast message={toastMessage} type={toastType} resolution={"desktop"} /> : null}
			<div className={classes.container}>
				<div className={classes.descriptionContainer}>
					<p className={classes.mainHeading}>Sign in to</p>
					<p className={classes.subHeading}>Sea Wallet</p>
					<p className={classes.description}>If you don&apos;t have an account</p>
					<div className={classes.descriptionSubcontainer}>
						<p>You can</p>
						<button className={classes.registerLink} onClick={registerClickHandler}>
							Register here!
						</button>
					</div>
				</div>
				<img className={classes.personImg} alt="guy" src={guy} />
				<SignInForm
					onToastChange={(showToast, toastMessage, toastType) => setToast(showToast, toastMessage, toastType)}
				/>
			</div>
		</>
	) : (
		<>
			<Navbar />
			{showToast ? <Toast message={toastMessage} type={toastType} resolution={"mobile"} /> : null}
			<div className={classes.container}>
				<SignInForm
					onToastChange={(showToast, toastMessage, toastType) => setToast(showToast, toastMessage, toastType)}
				/>
			</div>
		</>
	);
};

export default Login;
