import styled from "styled-components";

export const StyledDashboardNavbarContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	height: 100%;
	border-bottom: 2px solid #ede6e7;
`;

export const StyledDashboardHeading = styled.h1`
	font-size: 36px;
	font-weight: 550;
	color: #95999e;
	padding-left: 50px;
`;

export const StyledAvatar = styled.img`
    object-fit: cover;
	width: 55px;
	height: 55px;
    border-radius: 50%;

    cursor: pointer;
    margin-right: 50px;
`;

export const StyledProfileMenu = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
    justify-content: center;
    
	width: 150px;
	height: 80px;

    z-index: 2;
    position: absolute;
    top: 75px;
    right: 50px;

    background-color: #FFFFFF;
	border: 1px solid #95999E;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;

export const StyledProfileMenuElement = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

    cursor: pointer;
	width: 100%;
	height: 50%;
    padding-left: 25px;

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
        background: transparent;
        border: none;
    }
`;
