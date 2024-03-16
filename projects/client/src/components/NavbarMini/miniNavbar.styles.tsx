import styled from "styled-components";

export const StyledMiniNavbarContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	height: 100%;
	border-bottom: 2px solid #ede6e7;
`;

export const StyledMiniNavbarHeading = styled.h1<{ resolution?: string }>`
	font-size: 36px;
	font-weight: 550;
	color: #95999e;
	padding-left: ${({ resolution }) => (resolution === "mobile" ? "10px" : "50px")};
`;

export const StyledAvatar = styled.img<{ resolution?: string }>`
	object-fit: cover;
	width: 55px;
	height: 55px;
	border-radius: 50%;

	cursor: pointer;
	margin-right: ${({ resolution }) => (resolution === "mobile" ? "15px" : "50px")};
`;

export const StyledProfileMenu = styled.div<{ resolution?: string }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 150px;
	height: 80px;

	z-index: 2;
	position: fixed;
	top: 75px;
	right: ${({ resolution }) => (resolution === "mobile" ? "15px" : "50px")};

	background-color: #ffffff;
	border: 1px solid #95999e;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
`;

export const StyledProfileMenuElement = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;

	cursor: pointer;
	width: 100%;
	height: 50%;
	padding-left: 20px;
	padding-right: 20px;

	img {
		cursor: pointer;
		width: 20px;
		height: 20px;
	}

	button {
		cursor: pointer;
		padding-left: 20px;
		font-size: 16px;
		font-weight: 550;
		background: none;
		border: none;
	}

	&:hover {
		button {
			color: #4d47c3;
		}
		path {
			fill: #4d47c3;
		}
	}
`;
