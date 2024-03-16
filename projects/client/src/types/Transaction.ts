type wallet = {
	walletNumber: string;
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

export type PaginationInfo = {
	currentPage: number;
	entryPerPage: number;
	totalEntries: number;
	totalPages: number;
};

export type TxType = {
	type: "all" | "transfer" | "topup";
};

export type TxSortType = {
	sort: "amountAsc" | "amountDesc" | "dateAsc" | "dateDesc";
};

export type AcceptableTransactionType = "credit" | "debit";
