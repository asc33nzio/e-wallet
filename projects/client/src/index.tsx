import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/index";
import { Provider } from "react-redux";
import { ReduxStore } from "./redux";
import { ToastProvider } from "./components/Toast/ToastContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={ReduxStore}>
			<ToastProvider>
				<BrowserRouter>
					<AppRouter />
					<App />
				</BrowserRouter>
			</ToastProvider>
		</Provider>
	</React.StrictMode>,
);
