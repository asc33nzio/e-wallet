import React, { useState, useEffect } from "react";
import Axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import MiniNavbar from "../../components/NavbarMini/MiniNavbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PaginationInfo, Transaction } from "../../types/Transaction";
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
import TxEntry from "./TxEntry/TxEntry";

const Transactions = (): React.ReactElement => {
	const userAuthToken = localStorage.getItem("token");
	const userData = useSelector((state: any) => state?.user?.value);
	const navigate = useNavigate();
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
		currentPage: 1,
		entryPerPage: 8,
		totalEntries: 0,
		totalPages: 0,
	});
	const [minimized, setMinimized] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false);

	const handleMinimize = () => {
		setMinimized(!minimized);
	};

	const fetchEntries = async () => {
		try {
			const response = await Axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/wallet/${userData?.id}/transactions?limit=8&currentPage=1&sortOrder=DESC`,
				{
					headers: {
						Authorization: `Bearer ${userAuthToken}`,
					},
				},
			);
			setPaginationInfo(response?.data?.data?.paginationInfo);
			setTransactions(response?.data?.data?.transactionHistory);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchEntries();
	}, [userData]);

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
									<h1>IDR {userData?.wallet?.balance?.toLocaleString("en-US")}</h1>
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
								{transactions?.map((entry, index) => (
									<TxEntry key={`txEntry${index}`} data={entry} />
								))}
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
