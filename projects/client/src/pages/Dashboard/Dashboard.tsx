import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardNavbar from "../../components/Dashboard/Navbar/DashboardNavbar";
import Toast from "../../components/Toast/Toast";
import { useToast } from "../../components/Toast/ToastContext";
import {
	StyledDashboardNavbarContainer,
	StyledDashboardMainContainer,
	StyledDashboardContentContainer,
	StyledDashboardContentSubcontainer,
	StyledDashboardUsernameContainer,
	StyledDashboardOverviewContainer,
} from "./dashboard.styles";
import { useSelector } from "react-redux";
import OverviewCard from "../../components/Dashboard/OverviewCard/OverviewCard";

const Dashboard = (): React.ReactElement => {
	const userData = useSelector((state: any) => state?.user?.value);
	const { showToast, toastMessage, toastType } = useToast();

	useEffect(() => {
		console.log(userData);
	}, [userData]);

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
						<OverviewCard type="overview" userData={userData}/>
						<OverviewCard type="credit" userData={userData}/>
						<OverviewCard type="debit" userData={userData}/>
					</StyledDashboardOverviewContainer>

				</StyledDashboardContentSubcontainer>
			</StyledDashboardContentContainer>
		</StyledDashboardMainContainer>
	);
};

export default Dashboard;
