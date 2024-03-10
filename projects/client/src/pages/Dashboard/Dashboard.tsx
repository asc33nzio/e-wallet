import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardNavbar from "../../components/Dashboard/Navbar/DashboardNavbar";
import Toast from "../../components/Toast/Toast";
import { useToast } from "../../components/Toast/ToastContext";
import { StyledDashboardContainer, StyledDashboardMainContainer } from "./dashboard.styles";

const Dashboard = (): React.ReactElement => {
	const { showToast, toastMessage, toastType } = useToast();

	return (
		<StyledDashboardMainContainer>
			{showToast ? (
				<Toast message={toastMessage} type={toastType} orientation="right" resolution="desktop" />
			) : null}
			<Sidebar />

			<StyledDashboardContainer>
				<DashboardNavbar />
			</StyledDashboardContainer>
		</StyledDashboardMainContainer>
	);
};

export default Dashboard;
