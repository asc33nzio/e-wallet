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

const Dashboard = (): React.ReactElement => {
	const userAuthToken = useSelector((state: any) => state?.token?.value);
	const userData = useSelector((state: any) => state?.user?.value);
	const { showToast, toastMessage, toastType } = useToast();
	const [transactions, setTransactions] = useState([])

	const fetchTransactions = async () => {
		try {
			const response = await Axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/wallet/${userData.id}/transactions`,
				{
					headers: {
						Authorization: `Bearer ${userAuthToken}`,
					},
				},
			);

			console.log(response?.data?.data?.transactionHistory);
		} catch (error: any) {
			console.log(error?.response?.data);
		}
	};

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
					</StyledDashboardTransactionsContainer>
				</StyledDashboardContentSubcontainer>
			</StyledDashboardContentContainer>
		</StyledDashboardMainContainer>
	);
};

export default Dashboard;
