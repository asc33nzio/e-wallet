import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = (): React.ReactElement => {
	const userAuthToken = localStorage.getItem("token");

	return userAuthToken ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
