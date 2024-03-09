import React from "react";
import { StyledMobileModal, StyledModal, StyledModalContainer } from "./Toast.styles";
import { AcceptableResolutionType, AcceptableToastType } from "../../types/Toast";

const Toast = (props: {
	message: string;
	type: AcceptableToastType | string;
	resolution: AcceptableResolutionType;
}): React.ReactElement => {
	return (
		<StyledModalContainer>
			{props.resolution === "desktop" ? (
				<StyledModal type={props.type}>{props.message}</StyledModal>
			) : (
				<StyledMobileModal type={props.type}>{props.message}</StyledMobileModal>
			)}
		</StyledModalContainer>
	);
};

export default Toast;
