import axios from "axios";
import React, { useEffect, useState } from "react";
import { useModal } from "./ModalContext";
import { EditInput, EditInputContainer, MainContainer, ModalContent } from "./Modal.styles";
import { useSelector } from "react-redux";
import { EditICO } from "./ModalIcons";

const Modal = (): React.ReactElement => {
	const userData = useSelector((state: any) => state?.user?.value);
	const { showModal, modalType, openModal, closeModal } = useModal();
	const [avatar, setAvatar] = useState(
		`${process.env.REACT_APP_API_BASE_URL}/avatars/${userData?.avatar ? userData?.avatar : "default_ava.png"}`,
	);

	useEffect(() => {
		setAvatar(
			`${process.env.REACT_APP_API_BASE_URL}/avatars/${userData?.avatar ? userData?.avatar : "default_ava.png"}`,
		);
	}, [userData]);

	return (
		<>
			{showModal && (
				<MainContainer id="main-modal-container">
					<ModalContent>
						<img alt="avatar" src={avatar} />
						<EditICO />

						<div>
							<span>Email</span>
							<EditInputContainer $hasError={false}>
								<EditInput $hasError={false} placeholder={userData?.email} />
							</EditInputContainer>
						</div>

						<div>
							<span>Full Name</span>
							<EditInputContainer $hasError={false}>
								<EditInput $hasError={false} placeholder={userData?.displayName} />
							</EditInputContainer>
						</div>
					</ModalContent>
				</MainContainer>
			)}
		</>
	);
};

export default Modal;
