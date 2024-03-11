import React, { useEffect, useState } from "react";
import Axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardNavbar from "../../components/Dashboard/Navbar/DashboardNavbar";
import Toast from "../../components/Toast/Toast";
import OverviewCard from "../../components/Dashboard/OverviewCard/OverviewCard";
import TransactionCard from "../../components/Dashboard/TransactionCard/TransactionCard";
import EmptyTransactionCard from "../../components/Dashboard/EmptyTransactionCard/EmptyTransactionCard";
import {
	StyledDashboardNavbarContainer,
	StyledDashboardMainContainer,
	StyledDashboardContentContainer,
	StyledDashboardContentSubcontainer,
	StyledDashboardUsernameContainer,
	StyledDashboardOverviewContainer,
	StyledDashboardTransactionsContainer,
} from "./dashboard.styles";
import { useToast } from "../../components/Toast/ToastContext";
import { useSelector } from "react-redux";
import { Transaction } from "../../types/Transaction";

const Dashboard = (): React.ReactElement => {
	//! Token storing logic to be changed later (rehydrate store)
	// const userAuthToken = useSelector((state: any) => state?.token?.value);
	const userAuthToken = localStorage.getItem("token");
	const userData = useSelector((state: any) => state?.user?.value);
	const { showToast, toastMessage, toastType } = useToast();
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [threeRecentTransactions, setThreeRecentTransactions] = useState<Transaction[]>([]);
	const [totalIncome, setTotalIncome] = useState<number>(0);
	const [totalExpense, setTotalExpense] = useState<number>(0);
	const [isDesktopDisplay, setIsDesktopDisplay] = useState(false);
	const [minimized, setMinimized] = useState<boolean>(false);

	const fetchTransactions = async () => {
		const lastWeekDate = new Date();
		const currentDate = new Date();
		lastWeekDate.setDate(currentDate.getDate() - 7);
		currentDate.setDate(currentDate.getDate() + 2);

		const formattedCurrentDate = currentDate.toISOString().split("T")[0];
		const formattedLastWeekDate = lastWeekDate.toISOString().split("T")[0];
		const query = `${userData.id}/transactions?from=${formattedLastWeekDate}&until=${formattedCurrentDate}&sortOrder=DESC`;

		try {
			const response = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/wallet/${query}`, {
				headers: {
					Authorization: `Bearer ${userAuthToken}`,
				},
			});

			const txData = response?.data?.data?.transactionHistory;
			setTransactions(txData);
		} catch (error: any) {
			console.log(error);
		}
	};

	const calculateWeeklyIncome = () => {
		let newTotalIncome = 0;
		transactions.forEach((transaction) => {
			if (transaction.recipientId === userData?.id) {
				newTotalIncome += transaction.amount;
			}
		});

		setTotalIncome(newTotalIncome);
	};

	const calculateWeeklyExpense = () => {
		let newTotalExpense = 0;
		transactions.forEach((transaction) => {
			if (transaction.senderId === userData?.id && transaction.recipientId !== userData?.id) {
				newTotalExpense += transaction.amount;
			}
		});

		setTotalExpense(newTotalExpense);
	};

	const findLastThreeRecentTransactions = () => {
		const lastThreeRecentTransactions: Transaction[] = [];
		for (let i = 0; i < 3; i++) {
			lastThreeRecentTransactions.push(transactions[i]);
		}

		setThreeRecentTransactions(lastThreeRecentTransactions);
	};

	const handleMinimize = () => {
		setMinimized(!minimized);
	};

	useEffect(() => {
		fetchTransactions();
	}, [userData, userAuthToken]);

	useEffect(() => {
		if (transactions !== undefined && transactions !== null && transactions?.length > 0) {
			calculateWeeklyIncome();
			calculateWeeklyExpense();
			findLastThreeRecentTransactions();
		}
	}, [transactions]);

	useEffect(() => {
		const handleResize = () => {
			setIsDesktopDisplay(window.outerWidth > 768);
		};

		handleResize();

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (!isDesktopDisplay) {
			setMinimized(true);
		} else {
			setMinimized(false);
		}
	}, [isDesktopDisplay]);

	return isDesktopDisplay ? (
		<StyledDashboardMainContainer>
			{showToast ? (
				<Toast message={toastMessage} type={toastType} orientation="right" resolution="desktop" />
			) : null}
			<Sidebar minimized={minimized} onClick={handleMinimize} />

			<StyledDashboardContentContainer>
				<StyledDashboardNavbarContainer>
					<DashboardNavbar />
				</StyledDashboardNavbarContainer>

				<StyledDashboardContentSubcontainer>
					<StyledDashboardUsernameContainer>Hello, {userData.displayName}!</StyledDashboardUsernameContainer>

					<StyledDashboardOverviewContainer>
						<OverviewCard type="overview" userData={userData} />
						<OverviewCard type="credit" userData={userData} income={totalIncome} />
						<OverviewCard type="debit" userData={userData} expense={totalExpense} />
					</StyledDashboardOverviewContainer>

					<StyledDashboardTransactionsContainer>
						<h1>Recent Transactions</h1>
						<h2>This Week</h2>
						{threeRecentTransactions[0] && (
							<TransactionCard
								type={threeRecentTransactions[0]?.recipientId === userData?.id ? "credit" : "debit"}
								transaction={threeRecentTransactions[0]}
							/>
						)}
						{threeRecentTransactions[1] && (
							<TransactionCard
								type={threeRecentTransactions[1]?.recipientId === userData?.id ? "credit" : "debit"}
								transaction={threeRecentTransactions[1]}
							/>
						)}
						{threeRecentTransactions[2] && (
							<TransactionCard
								type={threeRecentTransactions[2]?.recipientId === userData?.id ? "credit" : "debit"}
								transaction={threeRecentTransactions[2]}
							/>
						)}
						{transactions === null && <EmptyTransactionCard />}
					</StyledDashboardTransactionsContainer>
				</StyledDashboardContentSubcontainer>
			</StyledDashboardContentContainer>
		</StyledDashboardMainContainer>
	) : (
		<StyledDashboardMainContainer>
			{showToast ? <Toast message={toastMessage} type={toastType} resolution="mobile" /> : null}
			<Sidebar minimized={minimized} onClick={handleMinimize} resolution="mobile"/>

			<StyledDashboardContentContainer resolution="mobile">
				<StyledDashboardNavbarContainer resolution="mobile">
					<DashboardNavbar resolution="mobile" />
				</StyledDashboardNavbarContainer>

				<StyledDashboardContentSubcontainer>
					<StyledDashboardUsernameContainer resolution="mobile">
						Hello, {userData.displayName}!
					</StyledDashboardUsernameContainer>

					<StyledDashboardOverviewContainer resolution="mobile">
						<OverviewCard resolution="mobile" type="overview" userData={userData} />
						<OverviewCard resolution="mobile" type="credit" userData={userData} income={totalIncome} />
						<OverviewCard resolution="mobile" type="debit" userData={userData} expense={totalExpense} />
					</StyledDashboardOverviewContainer>

					<StyledDashboardTransactionsContainer resolution="mobile">
						<h1>Recent Transactions</h1>
						<h2>This Week</h2>
						{threeRecentTransactions[0] && (
							<TransactionCard
								type={threeRecentTransactions[0]?.recipientId === userData?.id ? "credit" : "debit"}
								transaction={threeRecentTransactions[0]}
								resolution="mobile"
							/>
						)}
						{threeRecentTransactions[1] && (
							<TransactionCard
								type={threeRecentTransactions[1]?.recipientId === userData?.id ? "credit" : "debit"}
								transaction={threeRecentTransactions[1]}
								resolution="mobile"
							/>
						)}
						{threeRecentTransactions[2] && (
							<TransactionCard
								type={threeRecentTransactions[2]?.recipientId === userData?.id ? "credit" : "debit"}
								transaction={threeRecentTransactions[2]}
								resolution="mobile"
							/>
						)}
						{transactions === null && <EmptyTransactionCard />}
					</StyledDashboardTransactionsContainer>
				</StyledDashboardContentSubcontainer>
			</StyledDashboardContentContainer>
		</StyledDashboardMainContainer>
	);
};

export default Dashboard;
