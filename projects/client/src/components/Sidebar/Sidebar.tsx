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
		navigate("/");
	};

	const handleMinimize = () => {
		setMinimized(!minimized);
	};

	return (
		<>
			<StyledSidebarContainer minimized={minimized}>
				<StyledTitleSubcontainer minimized={minimized}>Sea Wallet</StyledTitleSubcontainer>

				<StyledElementsSubcontainer>
					<StyledElements>
						<StyledLink to="/" minimized={minimized}>
							<DashboardICO />
							<StyledParagraph minimized={minimized}>{!minimized && "Dashboard"}</StyledParagraph>
						</StyledLink>
					</StyledElements>

					<StyledElements>
						<StyledLink to="/" minimized={minimized}>
							<TransactionICO />
							<StyledParagraph minimized={minimized}>{!minimized && "Transactions"}</StyledParagraph>
						</StyledLink>
					</StyledElements>

					<StyledElements>
						<StyledLink to="/" minimized={minimized}>
							<TransferICO />
							<StyledParagraph minimized={minimized}>{!minimized && "Transfer"}</StyledParagraph>
						</StyledLink>
					</StyledElements>

					<StyledElements>
						<StyledLink to="/" minimized={minimized}>
							<TopUpICO />
							<StyledParagraph minimized={minimized}>{!minimized && "Top Up"}</StyledParagraph>
						</StyledLink>
					</StyledElements>

					<StyledElements>
						<StyledButton onClick={handleLogout} minimized={minimized}>
							<LogoutICO />
							<StyledParagraph minimized={minimized}>{!minimized && "Logout"}</StyledParagraph>
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
