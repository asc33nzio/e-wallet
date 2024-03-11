import styled from "styled-components";

export const StyledDashboardMainContainer = styled.div`
	display: flex;
	flex-direction: row;

	width: 100%;
	height: 100vh;
`;

export const StyledDashboardContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	height: 100%;
`;

export const StyledDashboardNavbarContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	height: 10%;
`;

export const StyledDashboardContentSubcontainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	height: 90%;
`;

export const StyledDashboardUsernameContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;
	height: 10%;

	font-size: 32px;
	font-weight: 550;
	color: #282828;
	padding-left: 50px;
`;

export const StyledDashboardOverviewContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

    padding-left: 50px;
    gap: 20px;

    width: 100%;
	height: 30%;
`;
