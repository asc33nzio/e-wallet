import React from "react";
import Guy from "../../../assets/person3.png";
import { StyledEmptyTransactionCardContainer } from "./emptyTransactionCard.styles";

const EmptyTransactionCard = (): React.ReactElement => {
	return (
		<StyledEmptyTransactionCardContainer>
			<img alt="guy" src={Guy} />
			<p className="txcard_heading">No recent transactions</p>
			<p className="txcard_description">Go to transactions page to add some!</p>
		</StyledEmptyTransactionCardContainer>
	);
};

export default EmptyTransactionCard;
