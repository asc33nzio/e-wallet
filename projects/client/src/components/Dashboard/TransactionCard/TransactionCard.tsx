import React from "react";
import CreditICO from "../../../assets/dashboard/credit.svg";
import DebitICO from "../../../assets/dashboard/debit.svg";
import { AcceptableTransactionType } from "../../../types/Transaction";
import { StyledTransactionCardContainer } from "./transactionCard.styles";

const TransactionCard = (props: { type: AcceptableTransactionType }): React.ReactElement => {
	return <StyledTransactionCardContainer type={props.type}>
        {props.type === "credit" ? <img alt="creditICO" src={CreditICO} /> : <img alt="debitICO" src={DebitICO} />}
    </StyledTransactionCardContainer>;
};

export default TransactionCard;
