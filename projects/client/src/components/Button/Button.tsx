import React from "react";
import classes from "./button.module.css";
import { AcceptableButtonType } from "../../types/Button";

const Button = (props: { title: string; type: AcceptableButtonType; isSubmitting?: boolean }): React.ReactElement => {
	return (
		<button
			className={classes.button}
			type={props.type !== undefined ? props.type : "button"}
			disabled={props.isSubmitting}
		>
			{props.title}
		</button>
	);
};

export default Button;
