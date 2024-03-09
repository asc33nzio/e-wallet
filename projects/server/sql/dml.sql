-- seed users
-- all password are Asd123! in plaintext
INSERT INTO users (email, displayName, password)
VALUES
    ('user1@domain.com', 'userFullName1', '$2a$05$v5wvtuu6MCjnepjz2nwlR.2gZcVK4xOr.xjC/gjRTLUwjgyOSZVTm'),
    ('user2@domain.com', 'userFullName2', '$2a$05$v5wvtuu6MCjnepjz2nwlR.2gZcVK4xOr.xjC/gjRTLUwjgyOSZVTm'),
    ('user3@domain.com', 'userFullName3', '$2a$05$v5wvtuu6MCjnepjz2nwlR.2gZcVK4xOr.xjC/gjRTLUwjgyOSZVTm'),
    ('user4@domain.com', 'userFullName4', '$2a$05$v5wvtuu6MCjnepjz2nwlR.2gZcVK4xOr.xjC/gjRTLUwjgyOSZVTm'),
    ('user5@domain.com', 'userFullName5', '$2a$05$v5wvtuu6MCjnepjz2nwlR.2gZcVK4xOr.xjC/gjRTLUwjgyOSZVTm');
   
INSERT INTO wallets (userId, balance)
VALUES
	(1, 100000),
	(2, 100000),
	(3, 100000),
	(4, 100000),
	(5, 100000);

-- seed mock transactions (wallet balance of users are not checked)
INSERT INTO transactions (senderId, recipientId, amount, sourceOfFunds, description)
SELECT
    sender.id AS senderId,
    recipient.id AS recipientId,
    ROUND(CAST(RANDOM() * 950000 + 50000 AS NUMERIC), -5) AS amount,
    'wallet' AS sourceOfFunds,
    'Seeded User Transfers' AS description
FROM
    generate_series(1, 20) AS t
CROSS JOIN LATERAL (
    SELECT
        CEIL(RANDOM() * 1)::INT AS sender_id,
        CEIL(RANDOM() * 5)::INT AS recipient_id
) AS send_receive
JOIN
    users sender ON sender.id = send_receive.sender_id
JOIN
    users recipient ON recipient.id = send_receive.recipient_id;

-- seed reward boxes
INSERT INTO gacha_boxes (amount)
VALUES
    (50000),
    (100000),
    (150000),
    (200000),
    (250000),
    (300000),
    (350000),
    (400000),
    (450000);