import styled from "styled-components";

export const StyledTransactionCardContainer = styled.div<{ type: string }>`
	--color-credit: #33a720;
	--color-debit: #f60707;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	height: 100%;
	border-radius: 15px;
	border: 2px solid #ede6e7;

	padding-left: 50px;
	padding-right: 100px;
	margin-bottom: 10px;

	font-size: 20px;
	font-weight: 550;
	color: ${({ type }) => (type === "credit" ? "var(--color-credit)" : "var(--color-debit)")};

    div.txcard_img {
        width: 5%;
    }

	img {
		width: 45px;
		height: 45px;
	}

    p.txcard_description {
        width: 45%;
        text-align: left;
        padding-left: 35px;
    }

    p.txcard_date {
        width: 20%;
        text-align: left;
    }

	p.txcard_nominal {
        width: 20%;
        text-align: left;
        padding-left: 100px;
		color: ${({ type }) => (type === "credit" ? "var(--color-credit)" : "var(--color-debit)")};
	}
`;
