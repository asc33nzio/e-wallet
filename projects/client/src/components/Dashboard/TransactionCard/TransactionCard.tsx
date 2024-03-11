import React from "react";
import CreditICO from "../../../assets/dashboard/credit.svg";
import DebitICO from "../../../assets/dashboard/debit.svg";
import { AcceptableTransactionType, Transaction } from "../../../types/Transaction";
import { StyledTransactionCardContainer } from "./transactionCard.styles";
import { formatDate } from "../../../utils/FormatDate";

const TransactionCard = (props: { type: AcceptableTransactionType; transaction: Transaction }): React.ReactElement => {
	return (
		<StyledTransactionCardContainer type={props.type}>
			<div className="txcard_img">
				{props.type === "credit" ? (
					<img alt="creditICO" src={CreditICO} />
				) : (
					<img alt="debitICO" src={DebitICO} />
				)}
			</div>
			<p className="txcard_description">{props.transaction?.description}</p>
			<p className="txcard_date">{formatDate(props.transaction?.txTime?.split("T")[0])}</p>
			<p className="txcard_nominal">IDR {props.transaction?.amount?.toLocaleString("id-ID")}</p>
		</StyledTransactionCardContainer>
	);
};

export default TransactionCard;
