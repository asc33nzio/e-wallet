export type AcceptableOverviewCardType = "overview" | "credit" | "debit";

export interface UserData {
	createdAt: string;
	deletedAt: string | null;
	displayName: string;
	email: string;
	id: number;
	updatedAt: string;
	wallet: {
		balance: number;
		createdAt: string;
		deletedAt: string | null;
		id: number;
		updatedAt: string;
		walletNumber: string;
	};
}
