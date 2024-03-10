import React, { useState } from "react";
import {
	StyledAvatar,
	StyledDashboardHeading,
	StyledDashboardNavbarContainer,
	StyledProfileMenu,
	StyledProfileMenuElement,
} from "./dashboardNavbar.styles";
import DefaultAvatar from "../../../assets/default_ava.png";
import ProfileICO from "../../../assets/profile/profile.svg";
import LogoutICO from "../../../assets/profile/logout.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../../redux/userSlice";
import { setToken } from "../../../redux/tokenSlice";

const DashboardNavbar = (): React.ReactElement => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [expandMenu, setExpandMenu] = useState<boolean>(false);

	const handleLogout = () => {
		dispatch(setUserData({}));
		dispatch(setToken(""));
		navigate("/");
	};

	const handleProfileMenu = () => {
		setExpandMenu(!expandMenu);
	};

	return (
		<StyledDashboardNavbarContainer>
			<StyledDashboardHeading>Dashboard</StyledDashboardHeading>
			<StyledAvatar src={DefaultAvatar} onClick={handleProfileMenu}></StyledAvatar>

			{expandMenu && (
				<StyledProfileMenu>
					<StyledProfileMenuElement>
						<img src={ProfileICO} alt="profile" />
						<button>Profile</button>
					</StyledProfileMenuElement>
					<StyledProfileMenuElement>
						<img src={LogoutICO} alt="logout" />
						<button onClick={handleLogout}>Logout</button>
					</StyledProfileMenuElement>
				</StyledProfileMenu>
			)}
		</StyledDashboardNavbarContainer>
	);
};

export default DashboardNavbar;
