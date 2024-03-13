import React from "react";
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
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import { setToken } from "../../redux/tokenSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = (props: { minimized: boolean; onClick: any; resolution?: string }): React.ReactElement => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(setUserData({}));
		dispatch(setToken(""));
		localStorage.clear();
		navigate("/");
	};

	return (
		<>
			<StyledSidebarContainer minimized={props.minimized.toString()} resolution={props.resolution}>
				<StyledTitleSubcontainer minimized={props.minimized.toString()} resolution={props.resolution}>Sea Wallet</StyledTitleSubcontainer>

				<StyledElementsSubcontainer>
					<StyledElements>
						<StyledLink to="/dashboard" minimized={props.minimized.toString()}>
							<DashboardICO />
							<StyledParagraph minimized={props.minimized.toString()}>
								{!props.minimized && "Dashboard"}
							</StyledParagraph>
						</StyledLink>
					</StyledElements>

					<StyledElements>
						<StyledLink to="/transactions" minimized={props.minimized.toString()}>
							<TransactionICO />
							<StyledParagraph minimized={props.minimized.toString()}>
								{!props.minimized && "Transactions"}
							</StyledParagraph>
						</StyledLink>
					</StyledElements>

					<StyledElements>
						<StyledLink to="/transfer" minimized={props.minimized.toString()}>
							<TransferICO />
							<StyledParagraph minimized={props.minimized.toString()}>
								{!props.minimized && "Transfer"}
							</StyledParagraph>
						</StyledLink>
					</StyledElements>

					<StyledElements>
						<StyledLink to="/topup" minimized={props.minimized.toString()}>
							<TopUpICO />
							<StyledParagraph minimized={props.minimized.toString()}>
								{!props.minimized && "Top Up"}
							</StyledParagraph>
						</StyledLink>
					</StyledElements>

					<StyledElements>
						<StyledLink to="/rewards" minimized={props.minimized.toString()}>
							<GiPerspectiveDiceSixFacesRandom />
							<StyledParagraph minimized={props.minimized.toString()}>
								{!props.minimized && "Rewards"}
							</StyledParagraph>
						</StyledLink>
					</StyledElements>

					<StyledElements>
						<StyledButton onClick={handleLogout} minimized={props.minimized.toString()}>
							<LogoutICO />
							<StyledParagraph minimized={props.minimized.toString()}>
								{!props.minimized && "Logout"}
							</StyledParagraph>
						</StyledButton>
					</StyledElements>
				</StyledElementsSubcontainer>

				<StyledFooterSubcontainer>
					<StyledIcon onClick={props.onClick}>{props.minimized ? <ExpandICO /> : <MinimizeICO />}</StyledIcon>
				</StyledFooterSubcontainer>
			</StyledSidebarContainer>
		</>
	);
};

export default Sidebar;
