import React, { useState } from "react";
import CreditIco from "../../../assets/dashboard/credit.svg";
import DebitIco from "../../../assets/dashboard/debit.svg";
import {
	StyledOverviewCardContainer,
	StyledOverviewDataContainer,
	StyledOverviewFooterContainer,
	StyledOverviewTitleContainer,
} from "./overviewCard.styles";
import { AcceptableOverviewCardType, UserData } from "../../../types/OverviewCard";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

export const OverviewCard = (props: {
	type: AcceptableOverviewCardType;
	userData: UserData;
	income?: number;
	expense?: number;
}): React.ReactElement => {
	const [show, setShow] = useState<boolean>(false);

	return (
		<StyledOverviewCardContainer type={props.type}>
			<StyledOverviewTitleContainer>
				{props.type === "overview" ? (
					<h2>Balance</h2>
				) : props.type === "credit" ? (
					<img src={CreditIco} alt="income" />
				) : (
					<img src={DebitIco} alt="income" />
				)}
			</StyledOverviewTitleContainer>

			<StyledOverviewDataContainer>
				{props.type === "overview" ? (
					<>
						{show ? (
							<h1>IDR {props.userData?.wallet?.balance?.toLocaleString("id-ID")}</h1>
						) : (
							<h1>IDR **********</h1>
						)}
						{show ? (
							<ImEyeBlocked
								size={30}
								onClick={() => {
									setShow(!show);
								}}
								cursor={"pointer"}
							/>
						) : (
							<ImEye
								size={30}
								onClick={() => {
									setShow(!show);
								}}
								cursor={"pointer"}
							/>
						)}
					</>
				) : props.type === "credit" ? (
					<>
						<h1>IDR {props.income?.toLocaleString("id-ID")}</h1>
						<FiTrendingUp size={70} />
					</>
				) : (
					<>
						<h1>IDR {props.expense?.toLocaleString("id-ID")}</h1>
						<FiTrendingDown size={70} />
					</>
				)}
			</StyledOverviewDataContainer>

			<StyledOverviewFooterContainer type={props.type}>
				{props.type === "overview" ? (
					<>{props.userData?.wallet?.walletNumber}</>
				) : props.type === "credit" ? (
					"Income"
				) : (
					"Expense"
				)}
			</StyledOverviewFooterContainer>
		</StyledOverviewCardContainer>
	);
};

export default OverviewCard;
