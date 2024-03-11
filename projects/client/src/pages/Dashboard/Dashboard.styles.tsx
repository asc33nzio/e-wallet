import styled from "styled-components";

export const StyledDashboardMainContainer = styled.div`
	display: flex;
	flex-direction: row;

	width: 100%;
	height: 100vh;
`;

export const StyledDashboardContentContainer = styled.div<{ resolution?: string }>`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	height: ${({ resolution }) => (resolution === "mobile" ? "150%" : "100%")};
`;

export const StyledDashboardNavbarContainer = styled.div<{ resolution?: string }>`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	height: ${({ resolution }) => (resolution === "mobile" ? "5%" : "10%")};
`;

export const StyledDashboardContentSubcontainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	height: 90%;
`;

export const StyledDashboardUsernameContainer = styled.div<{ resolution?: string }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	white-space: nowrap;

	width: 100%;
	height: ${({ resolution }) => (resolution === "mobile" ? "5%" : "10%")};

	font-size: ${({ resolution }) => (resolution === "mobile" ? "24px" : "32px")};
	font-weight: 550;
	color: #282828;
	padding-left: ${({ resolution }) => (resolution === "mobile" ? "10px" : "50px")};
`;

export const StyledDashboardOverviewContainer = styled.div<{ resolution?: string }>`
	display: flex;
	flex-direction: ${({ resolution }) => (resolution === "mobile" ? "column" : "row")};
	align-items: center;

	padding-top: ${({ resolution }) => (resolution === "mobile" ? "25px" : "0")};
	padding-left: ${({ resolution }) => (resolution === "mobile" ? "10px" : "50px")};
	padding-right: ${({ resolution }) => (resolution === "mobile" ? "10px" : "0")};
	gap: 20px;
	margin-bottom: ${({ resolution }) => (resolution === "mobile" ? "425px" : "32px")};

	width: 100%;
	height: 25%;
`;

export const StyledDashboardTransactionsContainer = styled.div<{ resolution?: string }>`
	display: flex;
	flex-direction: column;

	padding-left: ${({ resolution }) => (resolution === "mobile" ? "10px" : "50px")};
	padding-right: ${({ resolution }) => (resolution === "mobile" ? "10px" : "50px")};

	width: 100%;
	height: ${({ resolution }) => (resolution === "mobile" ? "350px" : "61%")};

	h1 {
		display: flex;
		align-items: center;

		height: ${({ resolution }) => (resolution === "mobile" ? "10%" : "15%")};

		font-size: 28px;
		font-weight: 600;
		color: #000000;

		padding-top: ${({ resolution }) => (resolution === "mobile" ? "0" : "30px")};
	}

	h2 {
		display: flex;
		align-items: center;

		height: 5%;

		font-size: 22px;
		font-weight: 550;
		color: #95999e;

		margin-top: ${({ resolution }) => (resolution === "mobile" ? "5px" : "0")};
		margin-bottom: ${({ resolution }) => (resolution === "mobile" ? "30px" : "10px")};
	}
`;
