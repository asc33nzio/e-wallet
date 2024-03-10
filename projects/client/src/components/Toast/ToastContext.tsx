import React, { createContext, useContext, useState } from "react";

interface ToastContextProps {
	showToast: boolean;
	toastMessage: string;
	toastType: string;
	setToast: (showToast: boolean, toastMessage: string, toastType: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [toast, setToast] = useState({
		showToast: false,
		toastMessage: "",
		toastType: "",
	});

	const value = {
		showToast: toast.showToast,
		toastMessage: toast.toastMessage,
		toastType: toast.toastType,
		setToast: (showToast: boolean, toastMessage: string, toastType: string) =>
			setToast({ showToast, toastMessage, toastType }),
	};

	return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = (): ToastContextProps => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}

	return context;
};
