import { jwtDecode } from "jwt-decode";

type JwtPayload = {
	exp?: number;
	iat?: number;
	iss?: string;
	uid?: string;
};

export const decodeJWT = (token: string | null): JwtPayload | null => {
	try {
		if (token) {
			const payload = jwtDecode(token);
			return payload;
		}

		return null;
	} catch (error: any) {
		console.error("Error decoding JWT:", error.message);
		return null;
	}
};
