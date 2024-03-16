import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MiniNavbar from "../../components/NavbarMini/MiniNavbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Transaction } from "../../types/Transaction";
import {
	StyledNavigationButton,
	StyledNavigationContainer,
	StyledOverviewFilterContainer,
	StyledOverviewFilterElement,
	StyledOverviewTitleContainer,
	StyledTable,
	StyledTableContainer,
	StyledTransactionsContentContainer,
	StyledTransactionsContentSubcontainer,
	StyledTransactionsMainContainer,
	StyledTransactionsNavbarContainer,
} from "./transactions.styles";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const Transactions = (): React.ReactElement => {
	const userAuthToken = localStorage.getItem("token");
	const userData = useSelector((state: any) => state?.user?.value);
	const navigate = useNavigate();
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [minimized, setMinimized] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false);

	const handleMinimize = () => {
		setMinimized(!minimized);
	};

	return (
		<StyledTransactionsMainContainer>
			<Sidebar minimized={minimized} onClick={handleMinimize} />

			<StyledTransactionsContentContainer>
				<StyledTransactionsNavbarContainer>
					<MiniNavbar heading="Transactions" />
				</StyledTransactionsNavbarContainer>

				<StyledTransactionsContentSubcontainer>
					<StyledOverviewTitleContainer $show={show}>
						<div>
							{show ? (
								<>
									<h1>IDR {userData?.wallet?.balance?.toLocaleString("id-ID")}</h1>
									<ImEyeBlocked size={38} onClick={() => setShow(!show)} />
								</>
							) : (
								<>
									<h1>IDR **********</h1>
									<ImEye size={38} onClick={() => setShow(!show)} />
								</>
							)}
						</div>
						<h2>Total balance from account {userData?.wallet?.walletNumber}</h2>
					</StyledOverviewTitleContainer>
					<StyledOverviewFilterContainer>
						Type
						<StyledOverviewFilterElement $variant="type"></StyledOverviewFilterElement>
						Sort
						<StyledOverviewFilterElement $variant="sort"></StyledOverviewFilterElement>
					</StyledOverviewFilterContainer>

					<StyledTableContainer>
						<StyledTable>
							<thead>
								<tr>
									<th>DATE</th>
									<th>DESCRIPTION</th>
									<th>TO/FROM</th>
									<th>AMOUNT</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
								</tr>
								<tr>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
								</tr>
								<tr>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
								</tr>
								<tr>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
								</tr>
								<tr>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
								</tr>
								<tr>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
								</tr>
								<tr>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
								</tr>
								<tr>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
									<td>placeholder</td>
								</tr>
							</tbody>
						</StyledTable>
					</StyledTableContainer>

					<StyledNavigationContainer>
						<StyledNavigationButton>
							<IoIosArrowRoundBack size={35} />
						</StyledNavigationButton>
						<StyledNavigationButton disabled={true}>1</StyledNavigationButton>
						<StyledNavigationButton>
							<IoIosArrowRoundForward size={35} />
						</StyledNavigationButton>
					</StyledNavigationContainer>
				</StyledTransactionsContentSubcontainer>
			</StyledTransactionsContentContainer>
		</StyledTransactionsMainContainer>
	);
};

export default Transactions;
