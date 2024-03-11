type wallet = {
	WalletNumber: string;
};

type user = {
	displayName: string;
	wallet: wallet;
};

export type Transaction = {
	id: number;
	senderId: number;
	recipientId: number;
	amount: number;
	sourceOfFunds: string;
	description: string;
	txTime: string;
	sender: user;
	recipient: user;
};

export type AcceptableTransactionType = "credit" | "debit";
