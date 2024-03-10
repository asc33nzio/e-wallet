import React, { useEffect, useState } from "react";
import classes from "./register.module.css";
import Navbar from "../../components/Navbar/Navbar";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import guy from "../../assets/person2.png";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast/Toast";

const Register = (): React.ReactElement => {
	const navigate = useNavigate();
	const [isDesktopDisplay, setIsDesktopDisplay] = useState(false);
	const [toast, setToast] = useState({ showToast: false, toastMessage: "", toastType: "" });

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

	const loginClickHandler = () => {
		navigate("/login");
	};

	return isDesktopDisplay ? (
		<>
			<Navbar />
			{toast.showToast ? (
				<Toast message={toast.toastMessage} type={toast.toastType} orientation="right" resolution={"desktop"} />
			) : null}
			<div className={classes.container}>
				<div className={classes.descriptionContainer}>
					<p className={classes.mainHeading}>Join Us!</p>
					<p className={classes.subHeading}>Sea Wallet</p>
					<p className={classes.description}>Already have an account?</p>
					<div className={classes.descriptionSubcontainer}>
						<p>You can</p>
						<button className={classes.loginLink} onClick={loginClickHandler}>
							Login here!
						</button>
					</div>
				</div>
				<img className={classes.personImg} alt="guy" src={guy} />
				<RegisterForm
					onToastChange={(showToast, toastMessage, toastType) =>
						setToast({ showToast, toastMessage, toastType })
					}
				/>
			</div>
		</>
	) : (
		<>
			<Navbar />
			{toast.showToast ? (
				<Toast message={toast.toastMessage} type={toast.toastType} orientation="right" resolution={"mobile"} />
			) : null}
			<div className={classes.container}>
				<RegisterForm
					onToastChange={(showToast, toastMessage, toastType) =>
						setToast({ showToast, toastMessage, toastType })
					}
				/>
			</div>
		</>
	);
};

export default Register;
