import React from "react";
import { StyledMobileToast, StyledToast, StyledToastContainer } from "./Toast.styles";
import { AcceptableResolutionType, AcceptableToastOrientation, AcceptableToastType } from "../../types/Toast";

const Toast = (props: {
	message: string;
	type: AcceptableToastType | string;
	resolution: AcceptableResolutionType;
	orientation?: AcceptableToastOrientation;
}): React.ReactElement => {
	return (
		<StyledToastContainer orientation={props.orientation}>
			{props.resolution === "desktop" ? (
				<StyledToast type={props.type}>{props.message}</StyledToast>
			) : (
				<StyledMobileToast type={props.type}>{props.message}</StyledMobileToast>
			)}
		</StyledToastContainer>
	);
};

export default Toast;
