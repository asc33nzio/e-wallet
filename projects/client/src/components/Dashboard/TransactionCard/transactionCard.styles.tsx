import styled from "styled-components";

export const StyledTransactionCardContainer = styled.div<{ type: string }>`
	--color-credit: #33a720;
	--color-debit: #f60707;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

    /* background-color: red; */
    margin-bottom: 10px;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    border: 2px solid #EDE6E7;
    padding-right: 50px;

	color: ${({ type }) => (type === "credit" ? "var(--color-credit)" : "var(--color-debit)")};
`;
