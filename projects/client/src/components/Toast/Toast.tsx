import React from "react";
import { StyledToast, StyledToastContainer } from "./Toast.styles";
import { AcceptableResolutionType, AcceptableToastOrientation, AcceptableToastType } from "../../types/Toast";

const Toast = (props: {
	message: string;
	type: AcceptableToastType | string;
	resolution: AcceptableResolutionType;
	orientation?: AcceptableToastOrientation;
}): React.ReactElement => {
	return (
		<StyledToastContainer orientation={props.orientation}>
			<StyledToast type={props.type} resolution={props.resolution}>
				{props.message}
			</StyledToast>
		</StyledToastContainer>
	);
};

export default Toast;
