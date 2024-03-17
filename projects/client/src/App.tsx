import "./index.css";
import Axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/userSlice";
import { decodeJWT } from "./utils/DecodeJWT";
import { useModal } from "./components/Modal/ModalContext";

const App = (): null => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	//! Token storing logic to be changed later (rehydrate store)
	const reduxUserAuthToken = useSelector((state: any) => state?.token?.value);
	const userAuthToken = localStorage.getItem("token");

	const keepLogin = async () => {
		try {
			const payload = decodeJWT(userAuthToken);
			const uid = payload?.uid;

			const response = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${uid}`, {
				headers: {
					Authorization: `Bearer ${userAuthToken}`,
				},
			});

			const userData = response?.data?.data;
			dispatch(setUserData(userData));
		} catch (error: any) {
			console.error(error?.response);
		}
	};

	useEffect(() => {
		keepLogin();
	}, [dispatch, userAuthToken, reduxUserAuthToken, closeModal]);

	return null;
};

export default App;
