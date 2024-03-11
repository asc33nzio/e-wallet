import React, { useState } from "react";
import DefaultAvatar from "../../../assets/default_ava.png";
import {
	StyledAvatar,
	StyledDashboardHeading,
	StyledDashboardNavbarContainer,
	StyledProfileMenu,
	StyledProfileMenuElement,
} from "./dashboardNavbar.styles";
import { ProfileICO, LogoutICO } from "./DashboardNavbarIcons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../../redux/userSlice";
import { setToken } from "../../../redux/tokenSlice";

const DashboardNavbar = (props: { resolution?: string }): React.ReactElement => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [expandMenu, setExpandMenu] = useState<boolean>(false);

	const handleLogout = () => {
		dispatch(setUserData({}));
		dispatch(setToken(""));
		localStorage.clear();
		navigate("/");
	};

	const handleProfileMenu = () => {
		setExpandMenu(!expandMenu);
	};

	return (
		<StyledDashboardNavbarContainer>
			<StyledDashboardHeading resolution={props?.resolution}>Dashboard</StyledDashboardHeading>
			<StyledAvatar resolution={props?.resolution} src={DefaultAvatar} onClick={handleProfileMenu}></StyledAvatar>

			{expandMenu && (
				<StyledProfileMenu resolution={props?.resolution}>
					<StyledProfileMenuElement>
						<ProfileICO />
						<button>Profile</button>
					</StyledProfileMenuElement>
					<StyledProfileMenuElement>
						<LogoutICO />
						<button onClick={handleLogout}>Logout</button>
					</StyledProfileMenuElement>
				</StyledProfileMenu>
			)}
		</StyledDashboardNavbarContainer>
	);
};

export default DashboardNavbar;
