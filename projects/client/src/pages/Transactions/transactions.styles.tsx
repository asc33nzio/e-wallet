import styled from "styled-components";

export const StyledTransactionsMainContainer = styled.div`
	display: flex;
	flex-direction: row;

	width: 100%;
	height: 100vh;
`;

export const StyledTransactionsContentContainer = styled.div<{ resolution?: string }>`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	height: ${({ resolution }) => (resolution === "mobile" ? "150%" : "100%")};

	padding-left: ${({ resolution }) => (resolution === "mobile" ? "90px" : "0")};
`;

export const StyledTransactionsNavbarContainer = styled.div<{ resolution?: string }>`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	height: ${({ resolution }) => (resolution === "mobile" ? "35%" : "10%")};
`;

export const StyledTransactionsContentSubcontainer = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	height: 90%;

	padding-left: 50px;
	padding-right: 50px;
`;

export const StyledOverviewTitleContainer = styled.div<{ $show: boolean }>`
	display: flex;
	flex-direction: column;
	justify-content: center;

	width: 100%;
	height: 18%;

	h1 {
		font-size: 46px;
		font-weight: 600;
	}

	h2 {
		width: 500px;

		color: #95999e;
		font-size: 22px;
		font-weight: 450;
	}

	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		width: 500px;
		gap: ${({ $show }) => ($show === true ? "118px" : "125px")};

		cursor: pointer;
	}
`;

export const StyledOverviewFilterContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;

	width: 100%;
	height: 5%;

	font-size: 18px;
	font-weight: 500;
	gap: 25px;
	margin-bottom: 10px;
`

export const StyledOverviewFilterElement = styled.select<{$variant: string}>`
	width: ${({ $variant }) => ($variant === "type" ? "125px" : "200px")};
	height: 35px;
	
	border: none;
	outline: none;
	border-radius: 15px;
	background-color: #EDE6E7;
`

export const StyledTableContainer = styled.div`
	width: 100%;
	height: 60%;

	border: 1px solid #e2e8f0;
	border-radius: 25px;
`;

export const StyledTable = styled.table`
	table-layout: fixed;
	border-collapse: separate;

	width: 95%;

	margin-left: 40px;
	overflow-y: auto;

	thead {
		position: sticky;

		th {
			width: 10vw;
			border-bottom: 1px solid #e2e8f0;
		}
	}

	tbody {
		text-align: center;

		tr {
			height: 50px;
		}

		td {
			background-color: grey;
			width: 100px;
		}
	}

	tfoot {
		padding-top: 115px;
	}
`;

export const StyledNavigationContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	width: 190px;
	height: 50px;

	margin-top: 10px;
`;

export const StyledNavigationButton = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;

	width: 60px;
	height: 40px;

	font-size: 22px;
	border-radius: 5px;
	outline: none;
	border: none;
	background-color: #ede6e7;

	cursor: pointer;
`;
