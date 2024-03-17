import Axios from "axios";
import Toast from "../Toast/Toast";
import React, { useEffect, useState } from "react";
import FileInput, { SuccessICO } from "./ModalIcons";
import { useModal } from "./ModalContext";
import {
	BalanceDiv,
	CustomSelect,
	EditButton,
	EditButtonGroupContainer,
	EditInput,
	EditInputContainer,
	EditInputGroupContainer,
	ErrorDiv,
	LeftElement,
	MainContainer,
	ModalContent,
	ModalContentProfilePrelim,
	Option,
	OptionList,
} from "./Modal.styles";
import { useSelector } from "react-redux";
import { useToast } from "../Toast/ToastContext";
import { MdClose } from "react-icons/md";
import { formatDate } from "../../utils/FormatDate";
import { TopUpType } from "../../types/Modal";

const Modal = (): React.ReactElement => {
	const userAuthToken = localStorage.getItem("token");
	const userData = useSelector((state: any) => state?.user?.value);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { showModal, modalType, openModal, closeModal } = useModal();
	const { showToast, toastMessage, toastType, setToast, forModal } = useToast();
	const [emailValidationError, setEmailValidationError] = useState<string>("");
	const [nameValidationError, setNameValidationError] = useState<string>("");
	const [amountValidationError, setAmountValidationError] = useState<string>("");
	const [destinationValidationError, setDestinationValidationError] = useState<string>("");
	const [topUpAmountValidationError, settopUpAmountValidationError] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [displayName, setDisplayName] = useState<string>("");
	const [destination, setDestination] = useState<number>(0);
	const [amount, setAmount] = useState<number>(0);
	const [description, setDescription] = useState<string>("");
	const [currentAvatar, setCurrentAvatar] = useState(
		`${process.env.REACT_APP_API_BASE_URL}/avatars/${userData?.avatar ? userData?.avatar : "default_ava.png"}`,
	);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const [avatar, setAvatar] = useState<File | null>(null);
	const [topUpAmount, setTopUpAmount] = useState<number>(0);
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
	const [selectedTopUpSource, setSelectedTopUpSource] = useState<TopUpType>({ type: "" });

	const handleEmailValidation = (input: string) => {
		const sanitizedInput = input.trim();
		if (sanitizedInput === "") {
			setEmailValidationError("");
			setEmail(sanitizedInput);
		} else if (!/^[\w-.]+(\+[\w-]+)?@([\w-]+\.)+[\w-]{2,4}$/.test(sanitizedInput)) {
			setEmailValidationError("Invalid email format");
			return;
		} else {
			setEmailValidationError("");
		}

		setEmail(sanitizedInput);
	};

	const handleNameValidation = (input: string) => {
		const sanitizedInput = input.trim();
		if (sanitizedInput.length > 0 && sanitizedInput.length < 3) {
			setNameValidationError("Name needs to be at least 3 characters long");
			return;
		} else if (sanitizedInput === "") {
			setNameValidationError("");
			setDisplayName("");
		} else {
			setNameValidationError("");
		}

		setDisplayName(sanitizedInput);
	};

	const handleDestinationValidation = (input: number) => {
		if (isNaN(input)) {
			setDestinationValidationError("Destination can only be numbers");
			return;
		} else if (input?.toString().length !== 13) {
			setDestinationValidationError("Account numbers are strictly 13 digits long");
			return;
		} else {
			setDestinationValidationError("");
		}

		setDestination(input);
	};

	const handleAmountValidation = (input: number) => {
		if (isNaN(input)) {
			setAmountValidationError("Amount can only be numbers");
			return;
		} else if (input > userData?.wallet?.balance) {
			setAmountValidationError("Balance is not enough");
			return;
		} else {
			setAmountValidationError("");
		}

		setAmount(input);
	};

	const handleTopUpAmountValidation = (input: number) => {
		if (isNaN(input)) {
			settopUpAmountValidationError("Amount can only be numbers");
			return;
		} else if (input < 50000 || input > 10000000) {
			settopUpAmountValidationError("Top Up Value must be between IDR 50,000 - IDR 10,000,000");
			return;
		} else {
			settopUpAmountValidationError("");
		}

		setTopUpAmount(input);
	};

	const handleTopUpSourceOptionSelect = (option: TopUpType) => {
		setSelectedTopUpSource(option);
		setIsSelectOpen(false);
	};

	const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setAvatar(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatarPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleUpdateProfileSubmit = async () => {
		const payload = new FormData();

		if (emailValidationError !== "") {
			return;
		} else if (email !== "") {
			payload.append("email", email);
		} else {
			payload.append("email", userData?.email);
		}

		if (nameValidationError !== "") {
			return;
		} else if (displayName !== "") {
			payload.append("displayName", displayName);
		} else {
			payload.append("displayName", userData?.displayName);
		}

		if (avatar) {
			payload.append("avatar", avatar);
		}

		try {
			setIsLoading(true);
			const response = await Axios.patch(`${process.env.REACT_APP_API_BASE_URL}/users/${userData?.id}`, payload, {
				headers: {
					Authorization: `Bearer ${userAuthToken}`,
					"Content-Type": "multipart/form-data",
				},
			});

			const message = response?.data?.data;
			setToast(true, message, "ok", true);

			setTimeout(() => {
				closeModal();
			}, 3000);
			setIsLoading(false);
		} catch (error: any) {
			const errorMessage = error?.response?.data?.message;
			setToast(true, errorMessage, "error", true);
			setIsLoading(false);
		}
	};

	const handleTransferSubmit = async () => {
		interface TransferPayload {
			accountNumber: string;
			amount: number;
			description?: string | null;
		}

		const payload: TransferPayload = {
			accountNumber: destination.toString(),
			amount: amount,
		};

		if (destinationValidationError !== "") {
			return;
		}
		if (amountValidationError !== "") {
			return;
		}
		if (description.trim() === "") {
			payload.description = null;
		} else if (description.trim() !== "") {
			payload.description = description.trim();
		}

		try {
			setIsLoading(true);
			await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/wallet/${userData?.id}/transfer`, payload, {
				headers: {
					Authorization: `Bearer ${userAuthToken}`,
				},
			});

			openModal("transfer-success");
			setIsLoading(false);
		} catch (error: any) {
			const errorMessage = error?.response?.data?.message;
			setToast(true, errorMessage, "error", true);
			setIsLoading(false);
		}
	};

	const handleTopUpSubmit = async () => {
		const payload = {
			amount: topUpAmount,
			sourceOfFunds: selectedTopUpSource.type,
		};

		if (topUpAmountValidationError !== "") {
			return;
		}
		if (selectedTopUpSource.type === "") {
			setToast(true, "Please choose a source of funds", "error", true);
			return;
		}
		if (topUpAmount === 0) {
			setToast(true, "Please enter an amount to top up", "error", true);
			return;
		}

		try {
			setIsLoading(true);
			await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/wallet/${userData?.id}/topup`, payload, {
				headers: {
					Authorization: `Bearer ${userAuthToken}`,
				},
			});

			openModal("topup-success");
			setIsLoading(false);
		} catch (error: any) {
			const errorMessage = error?.response?.data?.message;
			setToast(true, errorMessage, "error", true);
			setIsLoading(false);
		}
	};

	const handleClose = () => {
		setAvatar(null);
		setAvatarPreview(null);
		setNameValidationError("");
		setEmailValidationError("");
		setAmountValidationError("");
		settopUpAmountValidationError("");
		setSelectedTopUpSource({ type: "" });
		setIsSelectOpen(false);
		closeModal();
	};

	useEffect(() => {
		if (!showModal) {
			setCurrentAvatar(
				`${process.env.REACT_APP_API_BASE_URL}/avatars/${
					userData?.avatar ? userData.avatar : "default_ava.png"
				}`,
			);
		}
	}, [userData, isLoading, showModal, closeModal]);

	return (
		<>
			{showToast && forModal && <Toast message={toastMessage} type={toastType} resolution={"desktop"} />}
			{showModal && modalType === "profilePrelim" && (
				<MainContainer id="main-modal-container">
					<ModalContentProfilePrelim>
						<img alt="avatar" src={currentAvatar} />
						<span className="displayName">{userData?.displayName}</span>
						<span className="email">{userData?.email}</span>
						<EditButton $type="save" $isPrelim={true} onClick={() => openModal("profile")}>
							Edit Profile
						</EditButton>
					</ModalContentProfilePrelim>
				</MainContainer>
			)}
			{showModal && modalType === "profile" && (
				<MainContainer id="main-modal-container">
					<ModalContent>
						<img alt="avatar" src={avatarPreview || currentAvatar} />
						<FileInput onChange={handleAvatarChange} />

						<EditInputGroupContainer>
							<span>Email</span>
							<EditInputContainer $hasError={emailValidationError !== ""}>
								<EditInput
									$hasError={emailValidationError !== ""}
									placeholder={userData?.email}
									onChange={(event) => handleEmailValidation(event.target.value)}
								/>
							</EditInputContainer>
							<ErrorDiv $hasError={emailValidationError !== ""}>{emailValidationError}</ErrorDiv>
						</EditInputGroupContainer>

						<EditInputGroupContainer>
							<span>Full Name</span>
							<EditInputContainer $hasError={nameValidationError !== ""}>
								<EditInput
									$hasError={nameValidationError !== ""}
									placeholder={userData?.displayName}
									onChange={(event) => handleNameValidation(event.target.value)}
								/>
							</EditInputContainer>
							<ErrorDiv $hasError={nameValidationError !== ""}>{nameValidationError}</ErrorDiv>
						</EditInputGroupContainer>

						<EditButtonGroupContainer>
							<EditButton
								$type="save"
								disabled={emailValidationError !== "" || nameValidationError !== ""}
								onClick={handleUpdateProfileSubmit}
							>
								Save
							</EditButton>
							<EditButton $type="cancel" onClick={handleClose}>
								Cancel
							</EditButton>
						</EditButtonGroupContainer>
					</ModalContent>
				</MainContainer>
			)}
			{showModal && modalType === "transfer" && (
				<MainContainer id="main-modal-container">
					<ModalContent>
						<MdClose size={75} className="closeIcon" onClick={handleClose} />
						<span className="heading">Transfer</span>
						<EditInputGroupContainer>
							<EditInputContainer $hasError={destinationValidationError !== ""}>
								<EditInput
									type="number"
									$hasError={false}
									placeholder={"enter destination account number"}
									$isMoney={true}
									onChange={(event) => handleDestinationValidation(parseInt(event.target.value, 10))}
								/>
							</EditInputContainer>
							<ErrorDiv $hasError={destinationValidationError !== ""}>
								{destinationValidationError}
							</ErrorDiv>
						</EditInputGroupContainer>

						<EditInputGroupContainer>
							<EditInputContainer $hasError={amountValidationError !== ""} $isPadded={true}>
								<LeftElement $hasError={amountValidationError !== ""}>IDR</LeftElement>
								<EditInput
									type="number"
									$hasError={amountValidationError !== ""}
									placeholder={"enter amount here"}
									$isMoney={true}
									onChange={(event) => handleAmountValidation(parseInt(event.target.value, 10))}
								/>
							</EditInputContainer>
							<ErrorDiv $hasError={amountValidationError !== ""}>{amountValidationError}</ErrorDiv>
						</EditInputGroupContainer>

						<BalanceDiv>
							Remaining Balance: IDR {userData?.wallet?.balance?.toLocaleString("en-US")}
						</BalanceDiv>

						<EditInputGroupContainer>
							<EditInputContainer $hasError={false}>
								<EditInput
									$hasError={false}
									placeholder={"enter description"}
									$isMoney={true}
									onChange={(event) => setDescription(event.target.value)}
								/>
							</EditInputContainer>
						</EditInputGroupContainer>
						<EditButton $type="save" $isMoney={true} onClick={handleTransferSubmit}>
							Submit
						</EditButton>
					</ModalContent>
				</MainContainer>
			)}
			{showModal && modalType === "transfer-success" && (
				<MainContainer id="main-modal-container">
					<ModalContent>
						<SuccessICO />
						<span className="heading transfer">Transfer Success</span>
						<span className="amount">IDR {amount?.toLocaleString("en-US")}</span>
						<span className="date">{formatDate(Date.now())}</span>
						<EditButton $type="save" onClick={handleClose} $isMoney={true}>
							Close
						</EditButton>
					</ModalContent>
				</MainContainer>
			)}
			{showModal && modalType === "topup" && (
				<MainContainer id="main-modal-container">
					<ModalContent>
						<MdClose size={35} className="closeIconTopUp" onClick={handleClose} />
						<span className="heading">Top Up</span>

						<CustomSelect onClick={() => setIsSelectOpen(!isSelectOpen)}>
							{selectedTopUpSource.type === ""
								? "Choose source of funds"
								: selectedTopUpSource.type === "cash"
								? "Cash"
								: selectedTopUpSource.type === "transfer"
								? "Bank Transfer"
								: "Credit Card"}
							<OptionList $isOpen={isSelectOpen}>
								<Option onClick={() => handleTopUpSourceOptionSelect({ type: "cash" })}>Cash</Option>
								<Option onClick={() => handleTopUpSourceOptionSelect({ type: "transfer" })}>
									Bank Transfer
								</Option>
								<Option onClick={() => handleTopUpSourceOptionSelect({ type: "cc" })}>
									Credit Card
								</Option>
							</OptionList>
						</CustomSelect>

						<EditInputGroupContainer>
							<EditInputContainer $hasError={topUpAmountValidationError !== ""} $isPadded={true}>
								<LeftElement $hasError={topUpAmountValidationError !== ""}>IDR</LeftElement>
								<EditInput
									type="number"
									$hasError={topUpAmountValidationError !== ""}
									placeholder={"enter amount here"}
									$isMoney={true}
									onChange={(event) => handleTopUpAmountValidation(parseInt(event.target.value, 10))}
								/>
							</EditInputContainer>
							<ErrorDiv $hasError={topUpAmountValidationError !== ""} $isForTopUp={true}>
								{topUpAmountValidationError}
							</ErrorDiv>
						</EditInputGroupContainer>

						<EditButton $type="save" $isMoney={true} onClick={handleTopUpSubmit}>
							Submit
						</EditButton>
					</ModalContent>
				</MainContainer>
			)}
			{showModal && modalType === "topup-success" && (
				<MainContainer id="main-modal-container">
					<ModalContent>
						<SuccessICO />
						<span className="heading transfer">Top Up Success</span>
						<span className="amount">IDR {topUpAmount?.toLocaleString("en-US")}</span>
						<span className="date">{formatDate(Date.now())}</span>
						<EditButton $type="save" onClick={handleClose} $isMoney={true}>
							Close
						</EditButton>
					</ModalContent>
				</MainContainer>
			)}
		</>
	);
};

export default Modal;
