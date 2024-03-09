import React from "react";
import classes from "./navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = (): React.ReactElement => {
	const navigate = useNavigate();

	const handleHomeClick = () => {
		navigate("/");
	};

	return (
		<>
			<div className={classes.navbar_container}>
				<div className={classes.logo_container}>
					<button onClick={handleHomeClick}>Sea Wallet</button>
				</div>
			</div>
		</>
	);
};

export default Navbar;
