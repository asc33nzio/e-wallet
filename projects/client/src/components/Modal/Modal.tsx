import Axios from "axios";
import Toast from "../Toast/Toast";
import React, { useEffect, useState } from "react";
import FileInput from "./ModalIcons";
import { useModal } from "./ModalContext";
import {
	EditButton,
	EditButtonGroupContainer,
	EditInput,
	EditInputContainer,
	EditInputGroupContainer,
	ErrorDiv,
	MainContainer,
	ModalContent,
} from "./Modal.styles";
import { useSelector } from "react-redux";
import { useToast } from "../Toast/ToastContext";

const Modal = (): React.ReactElement => {
	const userAuthToken = localStorage.getItem("token");
	const userData = useSelector((state: any) => state?.user?.value);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { showModal, modalType, openModal, closeModal } = useModal();
	const { showToast, toastMessage, toastType, setToast, forModal } = useToast();
	const [emailValidationError, setEmailValidationError] = useState<string>("");
	const [nameValidationError, setNameValidationError] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [displayName, setDisplayName] = useState<string>("");
	const [currentAvatar, setCurrentAvatar] = useState(
		`${process.env.REACT_APP_API_BASE_URL}/avatars/${userData?.avatar ? userData?.avatar : "default_ava.png"}`,
	);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const [avatar, setAvatar] = useState<File | null>(null);

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

	const handleSubmit = async () => {
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

	const handleClose = () => {
		setAvatar(null);
		setAvatarPreview(null);
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
			{showModal && (
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
								onClick={handleSubmit}
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
		</>
	);
};

export default Modal;
