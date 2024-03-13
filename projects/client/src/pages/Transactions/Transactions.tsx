import React, { useState } from "react";
import { useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { Transaction } from "../../types/Transaction";
import {
	StyledOverviewTitleContainer,
	StyledTable,
	StyledTransactionsContentContainer,
	StyledTransactionsContentSubcontainer,
	StyledTransactionsMainContainer,
	StyledTransactionsNavbarContainer,
} from "./transactions.styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import MiniNavbar from "../../components/NavbarMini/MiniNavbar";
import { ImEye, ImEyeBlocked } from "react-icons/im";

const Transactions = (): React.ReactElement => {
	const userAuthToken = localStorage.getItem("token");
	const userData = useSelector((state: any) => state?.user?.value);
	const navigate = useNavigate();
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [minimized, setMinimized] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false);

	const handleMinimize = () => {
		setMinimized(!minimized);
	};

	return (
		<StyledTransactionsMainContainer>
			<Sidebar minimized={minimized} onClick={handleMinimize} />

			<StyledTransactionsContentContainer>
				<StyledTransactionsNavbarContainer>
					<MiniNavbar heading="Transactions" />
				</StyledTransactionsNavbarContainer>

				<StyledTransactionsContentSubcontainer>
					<StyledOverviewTitleContainer show={show.toString()}>
						<div>
							{show ? (
								<>
									<h1>IDR {userData?.wallet?.balance?.toLocaleString("id-ID")}</h1>
									<ImEyeBlocked size={38} onClick={() => setShow(!show)} />
								</>
							) : (
								<>
									<h1>IDR **********</h1>
									<ImEye size={38} onClick={() => setShow(!show)} />
								</>
							)}
						</div>
						<h2>Total balance from account {userData?.wallet?.walletNumber}</h2>
					</StyledOverviewTitleContainer>
                    
                    <StyledTable>
                        <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>To/From</th>
                                    <th>Amount</th>
                                </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td>asd</td>
                                    <td>asd</td>
                                    <td>asd</td>
                                    <td>asd</td>
                                </tr>
                                <tr>
                                    <td>asd</td>
                                    <td>asd</td>
                                    <td>asd</td>
                                    <td>asd</td>
                                </tr>
                        </tbody>
                    </StyledTable>
				</StyledTransactionsContentSubcontainer>
			</StyledTransactionsContentContainer>
		</StyledTransactionsMainContainer>
	);
};

export default Transactions;
