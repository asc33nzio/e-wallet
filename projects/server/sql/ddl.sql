CREATE DATABASE e_wallet;

CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(64) UNIQUE NOT NULL,
    displayName VARCHAR(32) NOT NULL,
    password BYTEA NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    deletedAt TIMESTAMP
);

CREATE SEQUENCE wallet_identifier_seq START 7770000000001;
CREATE TABLE wallets(
    id BIGSERIAL PRIMARY KEY,
    userId BIGINT NOT NULL,
    walletNumber CHAR(13) UNIQUE NOT NULL DEFAULT NEXTVAL('wallet_identifier_seq'),
    balance DECIMAL NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    deletedAt TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE reset_tokens(
    id BIGSERIAL PRIMARY KEY,
    userId BIGINT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expiredAt TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '10 minutes',
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    deletedAt TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TYPE source_of_funds_enum AS ENUM ('cash', 'wallet', 'transfer', 'cc', 'paylater', 'gacha');
CREATE TABLE transactions(
	id BIGSERIAL PRIMARY KEY,
	senderId BIGINT NOT NULL,
	recipientId BIGINT NOT NULL,
	amount DECIMAL NOT NULL,
	sourceOfFunds source_of_funds_enum NOT NULL,
	description VARCHAR(64) NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    deletedAt TIMESTAMP,
    FOREIGN KEY(senderId) REFERENCES users(id),
    FOREIGN KEY(recipientId) REFERENCES users(id)
);

CREATE TABLE gacha_boxes(
	id BIGSERIAL PRIMARY KEY,
	amount DECIMAL NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    deletedAt TIMESTAMP
);

CREATE TABLE user_attempts(
	id BIGSERIAL PRIMARY KEY,
	userId BIGINT UNIQUE NOT NULL,
	remaining INTEGER NOT NULL,
	FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE user_gacha_history(
	id BIGSERIAL PRIMARY KEY,
	walletId BIGINT NOT NULL,
	boxId BIGINT NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    deletedAt TIMESTAMP,
    FOREIGN KEY(walletId) REFERENCES wallets(id),
    FOREIGN KEY(boxId) REFERENCES gacha_boxes(id)
);