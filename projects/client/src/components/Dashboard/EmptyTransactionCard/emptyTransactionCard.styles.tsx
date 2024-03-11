import styled from "styled-components";

export const StyledEmptyTransactionCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	height: 100%;

	img {
        object-fit: contain;
		width: 300px;
		height: 300px;
	}

	p.txcard_heading {
		width: 100%;
		text-align: center;

        font-size: 33px;
        font-weight: 550;
        color: #282828;
	}

	p.txcard_description {
		width: 100%;
		text-align: center;

        font-size: 18px;
        font-weight: 500;
        color: #95999E;
	}
`;
