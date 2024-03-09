import styled from "styled-components";
import { Field } from "formik";
import { ImEyeBlocked, ImEye } from "react-icons/im";

export const StyledInputContainer = styled.div<{ error?: string }>`
	background-color: ${(props) => (props.error ? "#FEEFE7" : "#F0EFFF")};
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 75px;
	padding: 10px;
	border-radius: 12px;
	border: ${(props) => (props.error ? "2px solid #F60707" : "none")};

	animation: ${(props) => (props.error ? "nudgeAnimation 0.4s ease" : "none")};
	@keyframes nudgeAnimation {
		0% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-20px);
		}
		50% {
			transform: translateX(15px);
		}
		75% {
			transform: translateX(-10px);
		}
		100% {
			transform: translateX(0);
		}
	}
`;

export const StyledField = styled(Field)`
	width: 100%;
	background-color: transparent;
	color: ${(props) => (props.error ? "#F60707" : "black")};
	font-size: 24px;
	border: none;
	border-radius: 12px;
	padding-left: 30px;

	&:focus {
		outline: none;
	}

	&::placeholder {
		color: ${(props) => (props.error ? "#F60707" : "#A7A3FF")};
		font-size: 24px;
	}
`;

export const StyledEyeIcon = styled(ImEye)<{ error?: string }>`
	width: 20%;
	fill: ${(props) => (props.error ? "#F60707" : "#A7A3FF")};
	cursor: pointer;
`;

export const StyledEyeBlockedIcon = styled(ImEyeBlocked)<{ error?: string }>`
	width: 20%;
	fill: ${(props) => (props.error ? "#F60707" : "#A7A3FF")};
	cursor: pointer;
`;
