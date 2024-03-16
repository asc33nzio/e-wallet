import "./index.css";
import React from "react";
import App from "./App";
import Router from "./routes/Router";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ReduxStore } from "./redux";
import { ToastProvider } from "./components/Toast/ToastContext";
import { ModalProvider } from "./components/Modal/ModalContext";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={ReduxStore}>
			<ModalProvider>
				<ToastProvider>
					<RouterProvider router={Router} />
					<App />
				</ToastProvider>
			</ModalProvider>
		</Provider>
	</React.StrictMode>,
);
