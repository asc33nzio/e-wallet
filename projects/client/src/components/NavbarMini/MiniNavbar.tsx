import React, { useState } from "react";
import DefaultAvatar from "../../assets/default_ava.png";
import {
	StyledAvatar,
	StyledMiniNavbarHeading,
	StyledMiniNavbarContainer,
	StyledProfileMenu,
	StyledProfileMenuElement,
} from "./MiniNavbar.styles";
import { ProfileICO, LogoutICO } from "./MiniNavbarIcons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../redux/userSlice";
import { setToken } from "../../redux/tokenSlice";

const MiniNavbar = (props: { heading: string; resolution?: string }): React.ReactElement => {
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
		<StyledMiniNavbarContainer>
			<StyledMiniNavbarHeading resolution={props?.resolution}>{props.heading}</StyledMiniNavbarHeading>
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
		</StyledMiniNavbarContainer>
	);
};

export default MiniNavbar;
