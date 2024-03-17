import React, { createContext, useContext, useState, useEffect } from "react";

interface ToastContextProps {
	showToast: boolean;
	toastMessage: string;
	toastType: string;
	forModal?: boolean;
	setToast: (showToast: boolean, toastMessage: string, toastType: string, forModal?: boolean) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [toast, setToast] = useState({
		showToast: false,
		toastMessage: "",
		toastType: "",
		forModal: false,
	});

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		if (toast.showToast) {
			timeoutId = setTimeout(() => {
				setToast({ showToast: false, toastMessage: "", toastType: "", forModal: false });
			}, 3000);
		}

		return () => clearTimeout(timeoutId);
	}, [toast]);

	const value = {
		showToast: toast.showToast,
		toastMessage: toast.toastMessage,
		toastType: toast.toastType,
		forModal: toast.forModal,
		setToast: (showToast: boolean, toastMessage: string, toastType: string, forModal = false) =>
			setToast({ showToast, toastMessage, toastType, forModal }),
	};

	return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = (): ToastContextProps => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("Toast context missing!");
	}

	return context;
};
