import styled from "styled-components";

export const StyledTransactionCardContainer = styled.div<{ type: string; resolution?: string }>`
	--color-credit: #33a720;
	--color-debit: #f60707;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	height: ${({ resolution }) => (resolution === "mobile" ? "30%" : "25%")};
	border-radius: 15px;
	border: 2px solid #ede6e7;

	padding-left: ${({ resolution }) => (resolution === "mobile" ? "10px" : "50px")};
	padding-right: ${({ resolution }) => (resolution === "mobile" ? "10px" : "100px")};
	margin-bottom: 10px;

	font-size: 20px;
	font-weight: 550;
	color: ${({ type }) => (type === "credit" ? "var(--color-credit)" : "var(--color-debit)")};

	div.txcard_img {
		width: ${({ resolution }) => (resolution === "mobile" ? "12%" : "5%")};
	}

	img {
		width: ${({ resolution }) => (resolution === "mobile" ? "40px" : "45px")};
		height: ${({ resolution }) => (resolution === "mobile" ? "40px" : "45px")};
	}

	p.txcard_description {
		display: ${({ resolution }) => (resolution === "mobile" ? "flex" : "")};
		align-items: ${({ resolution }) => (resolution === "mobile" ? "center" : "")};

		width: ${({ resolution }) => (resolution === "mobile" ? "25%" : "45%")};
		height: ${({ resolution }) => (resolution === "mobile" ? "100%" : "")};

		text-align: left;
		padding-left: ${({ resolution }) => (resolution === "mobile" ? "0" : "35px")};

		font-size: ${({ resolution }) => (resolution === "mobile" ? "16px" : "")};
	}

	p.txcard_date {
		display: ${({ resolution }) => (resolution === "mobile" ? "flex" : "")};
		align-items: ${({ resolution }) => (resolution === "mobile" ? "center" : "")};

		width: ${({ resolution }) => (resolution === "mobile" ? "25%" : "20%")};
		height: ${({ resolution }) => (resolution === "mobile" ? "100%" : "")};

		text-align: ${({ resolution }) => (resolution === "mobile" ? "center" : "left")};

		font-size: ${({ resolution }) => (resolution === "mobile" ? "16px" : "")};
	}

	p.txcard_nominal {
		display: ${({ resolution }) => (resolution === "mobile" ? "flex" : "")};
		align-items: ${({ resolution }) => (resolution === "mobile" ? "center" : "")};

		width: ${({ resolution }) => (resolution === "mobile" ? "25%" : "20%")};
		height: ${({ resolution }) => (resolution === "mobile" ? "100%" : "")};

		text-align: left;
		padding-left: ${({ resolution }) => (resolution === "mobile" ? "0" : "100px")};

		font-size: ${({ resolution }) => (resolution === "mobile" ? "16px" : "")};
		color: ${({ type }) => (type === "credit" ? "var(--color-credit)" : "var(--color-debit)")};
	}
`;
