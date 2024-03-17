import styled from "styled-components";

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	position: fixed;
	z-index: 5;
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

	width: 500px;
	height: 700px;
	background-color: white;

	padding: 50px;
	border-radius: 10px;

	img {
		object-fit: cover;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		margin-bottom: 50px;
	}

	.heading {
		width: 100%;
		font-size: 42px;
		font-weight: 550;
		color: #4d47c3;
		margin-bottom: 50px;
	}

	.transfer {
		text-align: center;
		margin-top: 25px;
	}

	.amount {
		font-size: 32px;
		font-weight: 550;
		margin-bottom: 15px;
	}

	.date {
		font-size: 20px;
		font-weight: 500;
		color: #95999e;
	}

	.closeIcon {
		margin-right: -55px;
		margin-top: -35px;
		align-self: flex-end;
		fill: #f60707;
		cursor: pointer;
	}
`;

export const EditInputGroupContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	width: 100%;
	height: 100px;

	font-weight: 550;
	margin-bottom: 25px;
`;

export const EditInputContainer = styled.div<{ $hasError?: boolean; $isPadded?: boolean }>`
	background-color: ${({ $hasError }) => ($hasError ? "#FEEFE7" : "#F0EFFF")};
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 60px;
	padding: ${({ $isPadded }) => ($isPadded ? "0" : "10px")};
	border-radius: 10px;
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

export const LeftElement = styled.div<{ $hasError?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100px;
	height: inherit;

	background-color: #4d47c3;
	color: white;
	font-weight: 300;
	border: ${({ $hasError }) => ($hasError ? "2px solid #F60707" : "none")};
	margin-left: -1px;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
`;

export const EditInput = styled.input<{ $hasError: boolean; $isMoney?: boolean }>`
	width: 100%;
	background-color: transparent;
	color: ${({ $hasError }) => ($hasError ? "#F60707" : "black")};
	font-size: 24px;
	border: none;
	border-radius: 12px;
	padding-left: 15px;

	&:focus {
		outline: none;
	}

	&::placeholder {
		color: ${({ $hasError }) => ($hasError ? "#F60707" : "#A7A3FF")};
		font-size: ${({ $isMoney }) => ($isMoney ? "18px" : "24px")};
	}

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

export const EditButtonGroupContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 75px;
	gap: 25px;
	margin-bottom: 25px;

	font-weight: 550;
`;

export const EditButton = styled.button<{ $type: string; $isPrelim?: boolean; $isMoney?: boolean }>`
	width: 100%;
	height: ${({ $isMoney }) => ($isMoney ? "100px" : "inherit")};

	margin-top: ${({ $isMoney }) => ($isMoney ? "75px" : "0")};
	margin-bottom: ${({ $isMoney }) => ($isMoney ? "50px" : "0")};
	border: ${({ $type }) => ($type === "save" ? "none" : "2px solid #4D47C3")};
	border-radius: 12px;

	background-color: ${({ $type }) => ($type === "save" ? "#CAC8FF" : "transparent")};
	color: ${({ $type }) => ($type === "save" ? "white" : "#4D47C3")};
	font-weight: 500;
	font-size: 20px;

	&:hover {
		background-color: ${({ $type }) => ($type === "save" ? "#4D47C3" : "#FEEFE7")};
		color: ${({ $type }) => ($type === "save" ? "white" : "#F60707")};
		border: ${({ $type }) => ($type === "save" ? "none" : "2px solid #F60707")};
	}
`;

export const ErrorDiv = styled.div<{ $hasError: boolean }>`
	display: ${({ $hasError }) => ($hasError ? "flex" : "none")};
	align-items: center;

	width: 100%;
	height: 25px;

	padding-left: 15px;
	font-size: 16px;
	color: #f60707;
`;

export const BalanceDiv = styled.div`
	display: flex;
	align-items: center;

	width: 100%;
	height: 50px;

	padding-left: 15px;
	font-size: 14px;
	font-weight: 400;
	color: #95999e;

	margin-top: -15px;
	margin-bottom: 10px;
`;

export const ModalContentProfilePrelim = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 500px;
	height: 500px;
	background-color: white;

	padding: 50px;
	border-radius: 10px;

	img {
		object-fit: cover;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		margin-bottom: 25px;
	}

	span {
		&.displayName {
			font-size: 32px;
			font-weight: 550;
		}

		&.email {
			font-size: 16px;
			margin-bottom: 25px;
			color: #95999e;
		}
	}
`;
