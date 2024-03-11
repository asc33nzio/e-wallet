import React, { useState } from "react";
import {
	StyledButton,
	StyledElements,
	StyledElementsSubcontainer,
	StyledFooterSubcontainer,
	StyledIcon,
	StyledLink,
	StyledParagraph,
	StyledSidebarContainer,
	StyledTitleSubcontainer,
} from "./Sidebar.styles";
import { DashboardICO, LogoutICO, TopUpICO, TransactionICO, TransferICO, MinimizeICO, ExpandICO } from "./SidebarIcons";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import { setToken } from "../../redux/tokenSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = (): React.ReactElement => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [minimized, setMinimized] = useState<boolean>(false);

	const handleLogout = () => {
		dispatch(setUserData({}));
		dispatch(setToken(""));
		localStorage.clear();
		navigate("/");
	};

	const handleMinimize = () => {
		setMinimized(!minimized);
	};

	return (
		<>
			<StyledSidebarContainer minimized={minimized.toString()}>
				<StyledTitleSubcontainer minimized={minimized.toString()}>Sea Wallet</StyledTitleSubcontainer>

				<StyledElementsSubcontainer>
					<StyledElements>
						<StyledLink to="/" minimized={minimized.toString()}>
							<DashboardICO />
							<StyledParagraph minimized={minimized.toString()}>
								{!minimized && "Dashboard"}
							</StyledParagraph>
						</StyledLink>
					</StyledElements>

					<StyledElements>
						<StyledLink to="/" minimized={minimized.toString()}>
							<TransactionICO />
							<StyledParagraph minimized={minimized.toString()}>
								{!minimized && "Transactions"}
							</StyledParagraph>
						</StyledLink>
					</StyledElements>

					<StyledElements>
						<StyledLink to="/" minimized={minimized.toString()}>
							<TransferICO />
							<StyledParagraph minimized={minimized.toString()}>
								{!minimized && "Transfer"}
							</StyledParagraph>
						</StyledLink>
					</StyledElements>

					<StyledElements>
						<StyledLink to="/" minimized={minimized.toString()}>
							<TopUpICO />
							<StyledParagraph minimized={minimized.toString()}>{!minimized && "Top Up"}</StyledParagraph>
						</StyledLink>
					</StyledElements>

					<StyledElements>
						<StyledButton onClick={handleLogout} minimized={minimized.toString()}>
							<LogoutICO />
							<StyledParagraph minimized={minimized.toString()}>{!minimized && "Logout"}</StyledParagraph>
						</StyledButton>
					</StyledElements>
				</StyledElementsSubcontainer>

				<StyledFooterSubcontainer>
					<StyledIcon onClick={handleMinimize}>{minimized ? <ExpandICO /> : <MinimizeICO />}</StyledIcon>
				</StyledFooterSubcontainer>
			</StyledSidebarContainer>
		</>
	);
};

export default Sidebar;
