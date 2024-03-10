import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledSidebarContainer = styled.div<{ minimized?: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 20%;
	width: ${(props) => (props.minimized ? "100px" : "20%")};
	height: 100vh;
	background-color: #f6f4f5;

	transition: all 3s ease;
`;

export const StyledTitleSubcontainer = styled.div<{ minimized?: boolean }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: left;

	width: 100%;
	height: 10%;

	cursor: pointer;
	color: #4d47c3;
	font-size: ${(props) => (props.minimized ? "24px" : "42px")};
	font-weight: 550;
	border: none;
	overflow: visible;
	padding-left: ${(props) => (props.minimized ? "15px" : "35px")};

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
	font-size: 28px;
	font-weight: 400;
`;

export const StyledLink = styled(Link)<{ minimized?: boolean }>`
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
			border-right: ${(props) => (props.minimized ? "none" : "2px solid #4d47c3")};
		}
		100% {
			width: 100%;
		}
	}
`;

export const StyledButton = styled.button<{ minimized?: boolean }>`
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

	&:hover path {
		fill: #4d47c3;
	}

	animation: typing_button 2s steps(100, end);
	@keyframes typing_button {
		0% {
			width: 0;
			overflow: hidden;
			white-space: nowrap;
			border-right: ${(props) => (props.minimized ? "none" : "2px solid #4d47c3")};
		}
		100% {
			width: 100%;
		}
	}
`;

export const StyledParagraph = styled.p<{ minimized?: boolean }>`
	color: #95999e;
	white-space: nowrap;
	font-weight: 550;
	transform: translateX(${(props) => (props.minimized ? "-60%" : "0")});
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
