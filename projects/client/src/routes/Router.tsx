import React from "react";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Transactions from "../pages/Transactions/Transactions";
import ProtectedRoute from "./ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/home",
		element: <ProtectedRoute />,
		children: [
			{
				path: "/home/dashboard",
				element: <Dashboard />,
			},
			{
				path: "/home/transactions",
				element: <Transactions />,
			},
		],
	},
	{
		path: "*",
		element: <h1>404</h1>,
	},
]);

export default Router;
