import React, { useEffect, useState } from "react";
import Axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardNavbar from "../../components/Dashboard/Navbar/DashboardNavbar";
import Toast from "../../components/Toast/Toast";
import OverviewCard from "../../components/Dashboard/OverviewCard/OverviewCard";
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
import TransactionCard from "../../components/Dashboard/TransactionCard/TransactionCard";

const Dashboard = (): React.ReactElement => {
	//! Token storing logic to be changed later (rehydrate store)
	// const userAuthToken = useSelector((state: any) => state?.token?.value);
	const userAuthToken = localStorage.getItem("token");
	const userData = useSelector((state: any) => state?.user?.value);
	const { showToast, toastMessage, toastType } = useToast();
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [totalIncome, setTotalIncome] = useState<number>(0)
	const [totalExpense, setTotalExpense] = useState<number>(0)

	const fetchTransactions = async () => {
		const lastWeekDate = new Date();
		const currentDate = new Date();
		lastWeekDate.setDate(currentDate.getDate() - 7);
		currentDate.setDate(currentDate.getDate() + 1);

		const formattedCurrentDate = currentDate.toISOString().split("T")[0];
		const formattedLastWeekDate = lastWeekDate.toISOString().split("T")[0];
		const query = `${userData.id}/transactions?from=${formattedLastWeekDate}&until=${formattedCurrentDate}`;

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

	useEffect(() => {
		console.log(transactions);
	}, [transactions]);

	useEffect(() => {
		fetchTransactions();
	}, [userData, userAuthToken]);

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
						<OverviewCard type="credit" userData={userData} />
						<OverviewCard type="debit" userData={userData} />
					</StyledDashboardOverviewContainer>

					<StyledDashboardTransactionsContainer>
						<h1>Recent Transactions</h1>
						<h2>This Week</h2>
						<TransactionCard type="credit" />
						<TransactionCard type="debit" />
						<TransactionCard type="credit" />
					</StyledDashboardTransactionsContainer>
				</StyledDashboardContentSubcontainer>
			</StyledDashboardContentContainer>
		</StyledDashboardMainContainer>
	);
};

export default Dashboard;
