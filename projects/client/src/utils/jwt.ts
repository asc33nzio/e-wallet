import { jwtDecode } from "jwt-decode";

type JwtPayload = {
	exp?: number;
	iat?: number;
	iss?: string;
	uid?: string;
};

export const decodeJWT = (token: string): JwtPayload | null => {
	try {
		const payload = jwtDecode(token);
		return payload;
	} catch (error: any) {
		console.error("Error decoding JWT:", error.message);
		return null;
	}
};
