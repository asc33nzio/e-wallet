import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledSidebarContainer = styled.div<{ minimized?: string; resolution?: string }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: ${({ resolution }) => (resolution !== "mobile" ? "" : "absolute")};

	width: ${({ minimized, resolution }) =>
		minimized === "true" && resolution !== "mobile"
			? "125px"
			: minimized === "false" && resolution !== "mobile"
			? "20%"
			: minimized === "true" && resolution === "mobile"
			? "90px"
			: "325px"};
	height: ${({ resolution }) => (resolution !== "mobile" ? "100vh" : "150vh")};

	background: ${({ minimized, resolution }) =>
		resolution !== "mobile" || (resolution === "mobile" && minimized === "true")
			? "#f6f4f5"
			: "linear-gradient(to right, rgba(246, 244, 245, 1) 50%, rgba(255, 255, 255, 0.8))"};
	transition: all 3s ease;
`;

export const StyledTitleSubcontainer = styled.div<{ minimized?: string; resolution?: string }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: left;

	width: 100%;
	height: 10%;
	border-bottom: 2px solid #ede6e7;

	cursor: pointer;
	color: #4d47c3;
	font-size: ${({ minimized, resolution }) =>
		minimized === "true" && resolution !== "mobile"
			? "24px"
			: minimized === "false" && resolution !== "mobile"
			? "36px"
			: minimized === "true" && resolution === "mobile"
			? "20px"
			: "34px"};
	font-weight: 550;
	overflow: visible;
	padding-left: ${({ minimized }) => (minimized === "true" ? "15px" : "35px")};

	transition: all 3s ease;
`;

export const StyledElementsSubcontainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 80%;
	gap: 35px;
`;

export const StyledElements = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: left;

	width: 100%;
	padding-left: 30px;
	gap: 25px;

	color: #95999e;
	font-size: 24px;
	font-weight: 400;
`;

export const StyledLink = styled(Link)<{ minimized?: string }>`
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;

	width: 100%;
	text-decoration: none;

	&:hover path {
		fill: #4d47c3;
	}

	transition: all 3s ease;
	animation: typing 2s steps(100, end);
	@keyframes typing {
		0% {
			width: 0;
			overflow: hidden;
			white-space: nowrap;
			border-right: ${({ minimized }) => (minimized === "true" ? "none" : "2px solid #4d47c3")};
		}
		100% {
			width: 100%;
		}
	}
`;

export const StyledButton = styled.button<{ minimized?: string }>`
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;

	width: 100%;
	text-decoration: none;
	color: #95999e;
	background-color: transparent;

	border: none;
	font-size: 24px;
	font-weight: 550;
	text-align: left;

	&:hover path {
		fill: #4d47c3;
	}

	animation: typing_button 2s steps(100, end);
	@keyframes typing_button {
		0% {
			width: 0;
			overflow: hidden;
			white-space: nowrap;
			border-right: ${({ minimized }) => (minimized === "true" ? "none" : "2px solid #4d47c3")};
		}
		100% {
			width: 100%;
		}
	}
`;

export const StyledParagraph = styled.p<{ minimized?: string }>`
	color: #95999e;
	white-space: nowrap;
	font-weight: 550;
	transform: translateX(${({ minimized }) => (minimized === "true" ? "-60%" : "0")});
	transition: transform 3s ease;

	&:hover {
		color: #4d47c3;
	}
`;

export const StyledIcon = styled.button`
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;

	width: 100%;
	text-decoration: none;
	color: #95999e;
	background-color: transparent;

	border: none;
	font-size: 28px;
	font-weight: 550;
	text-align: left;

	&:hover {
		color: #4d47c3;
	}

	&:hover path {
		fill: #4d47c3;
	}
`;

export const StyledFooterSubcontainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: left;

	width: 100%;
	height: 10%;

	cursor: pointer;
	color: #4d47c3;
	font-size: 42px;
	font-weight: 550;
	border: none;
	overflow: visible;
	padding-left: 25px;

	&:hover path {
		fill: #4d47c3;
	}
`;
