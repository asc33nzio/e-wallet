import React, { useEffect, useState } from "react";
import classes from "./register.module.css";
import Navbar from "../../components/Navbar/Navbar";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import guy from "../../assets/person2.png";
import { useNavigate } from "react-router-dom";

const Register = (): React.ReactElement => {
	const navigate = useNavigate();
	const [isDesktopDisplay, setIsDesktopDisplay] = useState(false);

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
				<RegisterForm />
			</div>
		</>
	) : (
		<>
			<Navbar />
			<div className={classes.container}>
				<RegisterForm />
			</div>
		</>
	);
};

export default Register;
