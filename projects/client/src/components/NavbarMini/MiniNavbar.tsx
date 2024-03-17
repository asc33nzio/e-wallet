import React, { useEffect, useState } from "react";
import {
	StyledAvatar,
	StyledMiniNavbarHeading,
	StyledMiniNavbarContainer,
	StyledProfileMenu,
	StyledProfileMenuElement,
} from "./MiniNavbar.styles";
import { ProfileICO, LogoutICO } from "./MiniNavbarIcons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../redux/userSlice";
import { setToken } from "../../redux/tokenSlice";
import { useModal } from "../Modal/ModalContext";

const MiniNavbar = (props: { heading: string; resolution?: string }): React.ReactElement => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { openModal } = useModal();
	const userData = useSelector((state: any) => state?.user?.value);
	const [expandMenu, setExpandMenu] = useState<boolean>(false);
	const [avatar, setAvatar] = useState(
		`${process.env.REACT_APP_API_BASE_URL}/avatars/${userData?.avatar ? userData?.avatar : "default_ava.png"}`,
	);

	const handleLogout = () => {
		dispatch(setUserData({}));
		dispatch(setToken(""));
		localStorage.clear();
		navigate("/");
	};

	const handleProfileMenu = () => {
		setExpandMenu(!expandMenu);
	};

	const handleProfileClick = () => {
		openModal("profile");
		setExpandMenu(false);
	};

	useEffect(() => {
		setAvatar(
			`${process.env.REACT_APP_API_BASE_URL}/avatars/${userData?.avatar ? userData?.avatar : "default_ava.png"}`,
		);
	}, [userData]);

	return (
		<StyledMiniNavbarContainer>
			<StyledMiniNavbarHeading resolution={props?.resolution}>{props.heading}</StyledMiniNavbarHeading>
			<StyledAvatar resolution={props?.resolution} src={avatar} onClick={handleProfileMenu}></StyledAvatar>

			{expandMenu && (
				<StyledProfileMenu resolution={props?.resolution}>
					<StyledProfileMenuElement onClick={handleProfileClick}>
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
