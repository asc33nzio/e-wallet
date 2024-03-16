import styled from "styled-components";

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	position: fixed;
	z-index: 666;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.65);
`;

export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 500px;
	height: 650px;
	background-color: white;

	padding: 20px;
	border-radius: 10px;

	img {
		width: 200px;
		height: 200px;
		border-radius: 50%;
	}

	svg {
		position: fixed;
		width: 50px;
		height: 50px;
	}
`;

export const EditInputContainer = styled.div<{ $hasError?: boolean }>`
	background-color: ${({ $hasError }) => ($hasError ? "#FEEFE7" : "#F0EFFF")};
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 75px;
	padding: 10px;
	border-radius: 12px;
	border: ${({ $hasError }) => ($hasError ? "2px solid #F60707" : "none")};

	animation: ${({ $hasError }) => ($hasError ? "nudgeAnimation 0.4s ease" : "none")};
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

export const EditInput = styled.input<{ $hasError: boolean }>`
	width: 100%;
	background-color: transparent;
	color: ${({ $hasError }) => ($hasError ? "#F60707" : "black")};
	font-size: 24px;
	border: none;
	border-radius: 12px;
	padding-left: 30px;

	&:focus {
		outline: none;
	}

	&::placeholder {
		color: ${({ $hasError }) => ($hasError ? "#F60707" : "#A7A3FF")};
		font-size: 24px;
	}
`;
