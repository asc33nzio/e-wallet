import React from "react";
import { StyledMobileModal, StyledModal, StyledModalContainer } from "./Toast.styles";
import { AcceptableResolutionType, AcceptableToastOrientation, AcceptableToastType } from "../../types/Toast";

const Toast = (props: {
	message: string;
	type: AcceptableToastType | string;
	resolution: AcceptableResolutionType;
	orientation?: AcceptableToastOrientation;
}): React.ReactElement => {
	return (
		<StyledModalContainer orientation={props.orientation}>
			{props.resolution === "desktop" ? (
				<StyledModal type={props.type}>{props.message}</StyledModal>
			) : (
				<StyledMobileModal type={props.type}>{props.message}</StyledMobileModal>
			)}
		</StyledModalContainer>
	);
};

export default Toast;
