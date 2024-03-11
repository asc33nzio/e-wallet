import React, { useEffect, useState } from "react";
import Axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardNavbar from "../../components/Dashboard/Navbar/DashboardNavbar";
import Toast from "../../components/Toast/Toast";
import OverviewCard from "../../components/Dashboard/OverviewCard/OverviewCard";
import TransactionCard from "../../components/Dashboard/TransactionCard/TransactionCard";
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

	const fetchTransactions = async () => {
		const lastWeekDate = new Date();
		const currentDate = new Date();
		lastWeekDate.setDate(currentDate.getDate() - 7);
		currentDate.setDate(currentDate.getDate() + 1);

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

	useEffect(() => {
		fetchTransactions();
	}, [userData, userAuthToken]);

	useEffect(() => {
		calculateWeeklyIncome();
		calculateWeeklyExpense();
		findLastThreeRecentTransactions();
	}, [transactions]);

	return (
		<StyledDashboardMainContainer>
			{showToast ? (
				<Toast message={toastMessage} type={toastType} orientation="right" resolution="desktop" />
			) : null}
			<Sidebar />

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
						<TransactionCard type="credit" transaction={threeRecentTransactions[0]} />
						<TransactionCard type="debit" transaction={threeRecentTransactions[1]} />
						<TransactionCard type="credit" transaction={threeRecentTransactions[2]} />
					</StyledDashboardTransactionsContainer>
				</StyledDashboardContentSubcontainer>
			</StyledDashboardContentContainer>
		</StyledDashboardMainContainer>
	);
};

export default Dashboard;
