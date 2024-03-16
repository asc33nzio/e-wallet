import React from "react";
import { useModal } from "./ModalContext";
import { MainContainer } from "./Modal.styles";

const Modal = ():React.ReactElement => {
	const { showModal, modalType, setModal } = useModal();
	return (
		<MainContainer>
            ASD
        </MainContainer>
	);
};

export default Modal;
