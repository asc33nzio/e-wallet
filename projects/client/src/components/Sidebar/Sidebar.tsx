import React, { useState, useEffect } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../Modal/ModalContext";

const Sidebar = (props: { minimized: boolean; onClick: any; resolution?: string }): React.ReactElement => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentPage = useLocation();
	const { openModal } = useModal();
	const path = currentPage.pathname.split("/");
	const currentDirectory = path[path.length - 1];

	const [currentDirectoryMap, setCurrentDirectoryMap] = useState({
		dashboard: false,
		transactions: false,
	});

	const handleLogout = () => {
		dispatch(setUserData({}));
		dispatch(setToken(""));
		localStorage.clear();
		navigate("/");
	};

	useEffect(() => {
		setCurrentDirectoryMap((prevMap) => ({
			...prevMap,
			[currentDirectory]: true,
		}));
	}, [currentDirectory]);

	return (
		<>
			<StyledSidebarContainer $minimized={props.minimized.toString()} $resolution={props.resolution}>
				<StyledTitleSubcontainer $minimized={props.minimized.toString()} $resolution={props.resolution}>
					Sea Wallet
				</StyledTitleSubcontainer>

				<StyledElementsSubcontainer>
					<StyledElements $location={currentDirectoryMap.dashboard}>
						<StyledLink
							to="/home/dashboard"
							$minimized={props.minimized.toString()}
							$active={currentDirectoryMap.dashboard}
						>
							<DashboardICO />
							<StyledParagraph $minimized={props.minimized.toString()}>
								{!props.minimized && "Dashboard"}
							</StyledParagraph>
						</StyledLink>
					</StyledElements>

					<StyledElements $location={currentDirectoryMap.transactions}>
						<StyledLink
							to="/home/transactions"
							$minimized={props.minimized.toString()}
							$active={currentDirectoryMap.transactions}
						>
							<TransactionICO />
							<StyledParagraph $minimized={props.minimized.toString()}>
								{!props.minimized && "Transactions"}
							</StyledParagraph>
						</StyledLink>
					</StyledElements>

					<StyledElements>
						<StyledButton onClick={() => openModal("transfer")} $minimized={props.minimized.toString()}>
							<TransferICO />
							<StyledParagraph $minimized={props.minimized.toString()}>
								{!props.minimized && "Transfer"}
							</StyledParagraph>
						</StyledButton>
					</StyledElements>

					<StyledElements>
						<StyledButton $minimized={props.minimized.toString()}>
							<TopUpICO />
							<StyledParagraph $minimized={props.minimized.toString()}>
								{!props.minimized && "Top Up"}
							</StyledParagraph>
						</StyledButton>
					</StyledElements>

					<StyledElements>
						<StyledButton $minimized={props.minimized.toString()}>
							<GiPerspectiveDiceSixFacesRandom size={28} fill="#95999E" className="rewardSidebarIcon" />
							<StyledParagraph $minimized={props.minimized.toString()} className="rewardSidebarText">
								{!props.minimized && "Rewards"}
							</StyledParagraph>
						</StyledButton>
					</StyledElements>

					<StyledElements>
						<StyledButton onClick={handleLogout} $minimized={props.minimized.toString()}>
							<LogoutICO />
							<StyledParagraph $minimized={props.minimized.toString()}>
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
