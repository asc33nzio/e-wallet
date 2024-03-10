import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/index";
import { Provider } from "react-redux";
import { ReduxStore } from "./redux";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={ReduxStore}>
			<BrowserRouter>
				<AppRouter />
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
