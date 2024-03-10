import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardNavbar from "../../components/Dashboard/Navbar/DashboardNavbar";
import { StyledDashboardContainer, StyledDashboardMainContainer } from "./dashboard.styles";

const Dashboard = (): React.ReactElement => {
	return (
		<StyledDashboardMainContainer>
			<Sidebar />

			<StyledDashboardContainer>
				<DashboardNavbar />
			</StyledDashboardContainer>
		</StyledDashboardMainContainer>
	);
};

export default Dashboard;
