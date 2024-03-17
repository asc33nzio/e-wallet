import React, { useState, useEffect } from "react";
import Axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import MiniNavbar from "../../components/NavbarMini/MiniNavbar";
import TxEntry from "./TxEntry/TxEntry";
import { useSelector } from "react-redux";
import { PaginationInfo, Transaction, TxSortType, TxType } from "../../types/Transaction";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import {
	Option,
	OptionList,
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
} from "./Transactions.styles";

const Transactions = (): React.ReactElement => {
	const userAuthToken = localStorage.getItem("token");
	const userData = useSelector((state: any) => state?.user?.value);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
		currentPage: 1,
		entryPerPage: 8,
		totalEntries: 0,
		totalPages: 0,
	});
	const [show, setShow] = useState<boolean>(false);
	const [minimized, setMinimized] = useState<boolean>(false);
	const [isTypeSelectOpen, setIsTypeSelectOpen] = useState(false);
	const [isSortSelectOpen, setIsSortSelectOpen] = useState(false);
	const [selectedTypeOption, setSelectedTypeOption] = useState<TxType>({ type: "all" });
	const [selectedSortOption, setSelectedSortOption] = useState<TxSortType>({ sort: "amountAsc" });
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [sortBy, setSortBy] = useState<string>("amount");
	const [sortOrder, setSortOrder] = useState<string>("asc");
	const [currentPage, setCurrentPage] = useState<number>(1);

	const handleTypeSelectOption = (option: TxType) => {
		setSelectedTypeOption(option);
		setIsTypeSelectOpen(false);
		setCurrentPage(1);

		if (option.type === "all") {
			setSearchQuery("");
		}
		if (option.type === "transfer") {
			setSearchQuery("transfer");
		}
		if (option.type === "topup") {
			setSearchQuery("top up");
		}
	};

	const handleSortSelectOption = (option: TxSortType) => {
		setSelectedSortOption(option);
		setIsSortSelectOpen(false);
		setCurrentPage(1);

		if (option.sort === "amountAsc") {
			setSortBy("amount");
			setSortOrder("asc");
		}
		if (option.sort === "amountDesc") {
			setSortBy("amount");
			setSortOrder("desc");
		}
		if (option.sort === "dateAsc") {
			setSortBy("createdAt");
			setSortOrder("asc");
		}
		if (option.sort === "dateDesc") {
			setSortBy("createdAt");
			setSortOrder("desc");
		}
	};

	const handlePrevPage = () => {
		if (currentPage <= 1) {
			return;
		}
		setCurrentPage(currentPage - 1);
	};

	const handleNextPage = () => {
		if (currentPage >= paginationInfo.totalPages) {
			return;
		}
		setCurrentPage(currentPage + 1);
	};

	const handleMinimize = () => {
		setMinimized(!minimized);
	};

	const fetchEntries = async () => {
		try {
			const response = await Axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/wallet/${userData?.id}/transactions?limit=8&currentPage=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchQ=${searchQuery}`,
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
	}, [userData, searchQuery, sortBy, sortOrder, currentPage]);

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
						<p>Type</p>
						<StyledOverviewFilterElement
							$variant="type"
							onClick={() => setIsTypeSelectOpen(!isTypeSelectOpen)}
						>
							{selectedTypeOption.type === "all"
								? "All"
								: selectedTypeOption.type === "transfer"
								? "Transfer"
								: "Top Up"}
							<OptionList $isOpen={isTypeSelectOpen}>
								<Option onClick={() => handleTypeSelectOption({ type: "all" })}>All</Option>
								<Option onClick={() => handleTypeSelectOption({ type: "transfer" })}>Transfer</Option>
								<Option onClick={() => handleTypeSelectOption({ type: "topup" })}>Top Up</Option>
							</OptionList>
						</StyledOverviewFilterElement>

						<p>Sort</p>
						<StyledOverviewFilterElement
							$variant="sort"
							onClick={() => setIsSortSelectOpen(!isSortSelectOpen)}
						>
							{selectedSortOption.sort === "amountAsc"
								? "Amount - Asc"
								: selectedSortOption.sort === "amountDesc"
								? "Amount - Desc"
								: selectedSortOption.sort === "dateAsc"
								? "Date - Asc"
								: "Date - Desc"}
							<OptionList $isOpen={isSortSelectOpen}>
								<Option onClick={() => handleSortSelectOption({ sort: "amountAsc" })}>
									Amount - Asc
								</Option>
								<Option onClick={() => handleSortSelectOption({ sort: "amountDesc" })}>
									Amount - Desc
								</Option>
								<Option onClick={() => handleSortSelectOption({ sort: "dateAsc" })}>Date - Asc</Option>
								<Option onClick={() => handleSortSelectOption({ sort: "dateDesc" })}>
									Date - Desc
								</Option>
							</OptionList>
						</StyledOverviewFilterElement>
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
						<StyledNavigationButton $limit={currentPage === 1}>
							<IoIosArrowRoundBack
								size={35}
								onClick={handlePrevPage}
								fill={currentPage === 1 ? "white" : "black"}
							/>
						</StyledNavigationButton>
						<StyledNavigationButton disabled={true}>{currentPage}</StyledNavigationButton>
						<StyledNavigationButton $limit={currentPage === paginationInfo.totalPages}>
							<IoIosArrowRoundForward
								size={35}
								onClick={handleNextPage}
								fill={currentPage === paginationInfo.totalPages ? "white" : "black"}
							/>
						</StyledNavigationButton>
					</StyledNavigationContainer>
				</StyledTransactionsContentSubcontainer>
			</StyledTransactionsContentContainer>
		</StyledTransactionsMainContainer>
	);
};

export default Transactions;
