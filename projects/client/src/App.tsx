import Axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/userSlice";
import { decodeJWT } from "./utils/jwt";

const App = (): null => {
	const dispatch = useDispatch();
	const userAuthToken = useSelector((state: any) => state?.token?.value);    

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
		if (userAuthToken && userAuthToken !== undefined) {
			keepLogin();
		}
	}, [dispatch, userAuthToken]);

	return null;
};

export default App;