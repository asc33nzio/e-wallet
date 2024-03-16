import React, { createContext, useContext, useState } from "react";
import { ModalType } from "../../types/Modal";

interface ModalContextProps {
	showModal: boolean;
	modalType: ModalType;
	setModal: (showModal: boolean, modalType: ModalType) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [modal, setModal] = useState({
		showModal: false,
		modalType: "" as ModalType,
	});

	const value = {
		showModal: modal.showModal,
		modalType: modal.modalType,
		setModal: (showModal: boolean, modalType: ModalType) => setModal({ showModal, modalType }),
	};

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export const useModal = (): ModalContextProps => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("Modal context missing!");
	}

	return context;
};
