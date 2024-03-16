import { styled } from "styled-components";

export const StyledTr = styled.tr<{ $isDebit: boolean }>`
	tr {
		height: 50px;

		&:nth-last-child(1) {
			td {
				background-color: red;
				border-bottom: none;
			}
		}
	}

	td {
		border-bottom: 1px solid #e2e8f0;
		width: 100px;

		&:nth-child(1) {
			padding-left: 35px;
		}

		&:nth-child(4) {
			color: ${({ $isDebit }) => ($isDebit === true ? "green" : "red")};
			text-align: right;
			padding-right: 35px;
		}
	}
`;
