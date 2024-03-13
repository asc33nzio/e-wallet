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
`;

export const StyledOverviewTitleContainer = styled.div<{ show: string }>`
	display: flex;
	flex-direction: column;
	justify-content: center;

	width: 100%;
	height: 20%;
	padding-left: 50px;
	padding-right: 25px;
	margin-bottom: 15px;

	h1 {
		font-size: 46px;
		font-weight: 600;
	}

	h2 {
		color: #95999e;
		font-size: 22px;
		font-weight: 450;
	}

	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: ${({ show }) => (show === "true" ? "118px" : "125px")};
		cursor: pointer;
	}
`;

export const StyledTable = styled.table`
	/* display: flex; */
	/* flex-direction: column; */
	/* align-items: center; */
	/* gap: 100px; */

	border: 1px solid #e2e8f0;
	border-radius: 15px;

	width: 95%;
	height: 500px;
	margin-left: 50px;
	padding: 10px;
    padding-top: 5px;

	thead {
		th {
			border-bottom: 1px solid #e2e8f0;
		}
	}

    tbody {
        background-color: red;
        /* display: flex; */
        /* flex-direction: column; */
        /* align-items: start;
        justify-content: start; */

        text-align: center;

        td {
            background-color: grey;
            align-self: auto;

            height: 100px;
        }

        width: 1000px;
    }
`;
