import styled from "styled-components";

export const StyledOverviewCardContainer = styled.div<{ type: string }>`
	--bg-color-overview: #f9f9f9;
	--color-overview: #4d47c3;
	--bg-color-credit: #c9ffd8;
	--color-credit: #33a720;
	--bg-color-debit: #ffddca;
	--color-debit: #f60707;

	display: flex;
	flex-direction: column;
	align-items: center;

	width: ${({ type }) => (type === "overview" ? "35%" : "30%")};
	height: 100%;
	border-radius: 15px;

	background-color: ${({ type }) =>
		type === "overview"
			? "var(--bg-color-overview)"
			: type === "credit"
			? "var(--bg-color-credit)"
			: "var(--bg-color-debit)"};

	p {
		color: ${({ type }) =>
			type === "overview"
				? "var(--color-overview)"
				: type === "credit"
				? "var(--color-credit)"
				: "var(--color-debit)"};
	}

	h1 {
		font-size: 28px;
		font-weight: 600;
		color: #000000;
	}

	h2 {
		font-size: 24px;
		font-weight: 550;
		color: ${({ type }) =>
			type === "overview"
				? "var(--color-overview)"
				: type === "credit"
				? "var(--color-credit)"
				: "var(--color-debit)"};
	}
`;

export const StyledOverviewTitleContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;
	height: 20%;
	padding-left: 25px;
	padding-top: 25px;
	margin-bottom: 15px;
`;

export const StyledOverviewDataContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	height: 45%;
	padding-left: 25px;
	padding-right: 25px;
	margin-bottom: 15px;
`;

export const StyledOverviewFooterContainer = styled.div<{ type: string }>`
	--color-overview: #4d47c3;
	--color-credit: #33a720;
	--color-debit: #f60707;

	color: ${({ type }) =>
		type === "overview"
			? "var(--color-overview)"
			: type === "credit"
			? "var(--color-credit)"
			: "var(--color-debit)"};

	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;
	height: 20%;
	padding-left: 25px;
	padding-bottom: 25px;

    font-size: 18px;
    font-weight: 550;
`;
