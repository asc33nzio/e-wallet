import React from "react";
import { formatDate } from "../../../utils/FormatDate";
import { StyledTr } from "./TxEntry.styles";
import { Transaction } from "../../../types/Transaction";
import { useSelector } from "react-redux";

const TxEntry = (props: { data: Transaction }): React.ReactElement => {
	const userId = useSelector((state: any) => state?.user?.value?.id);
	const isTopUp = props?.data?.senderId === props?.data?.recipientId;
	const isOutboundTransfer = props?.data?.senderId === userId;
	const isDebit = props?.data?.recipientId === userId;

	return (
		<>
			<StyledTr $isDebit={isDebit}>
				<td>{formatDate(props?.data?.txTime)}</td>
				<td>{props?.data?.description}</td>
				<td>
					{isTopUp
						? "-"
						: isOutboundTransfer
						? props?.data?.recipient?.displayName
						: props?.data?.sender?.displayName}
				</td>
				<td>
					{isDebit ? "+ IDR " : "- IDR "}
					{props?.data?.amount?.toLocaleString("en-US")}
				</td>
			</StyledTr>
		</>
	);
};

export default TxEntry;
