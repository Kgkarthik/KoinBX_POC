CREATE SCHEMA "KoinBx_POC" AUTHORIZATION postgres;

CREATE TYPE "KoinBx_POC".currency_symbol AS ENUM ('BTC', 'ETH');

CREATE TYPE "KoinBx_POC".status AS ENUM ('OPEN', 'CLOSED', 'CANCELLED');

CREATE TYPE "KoinBx_POC".order_type AS ENUM ('BUY', 'SELL');

CREATE TABLE "KoinBx_POC".orders (
	id uuid DEFAULT "KoinBx_POC".uuid_generate_v4() NOT NULL,
	user_id text NOT NULL,
	"order_type" "KoinBx_POC"."order_type" NOT NULL,
	"currency_symbol" "KoinBx_POC"."currency_symbol" NOT NULL,
	price numeric NOT NULL,
	quantity numeric NOT NULL,
	"status" "KoinBx_POC"."status" NOT NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	updated_at timestamp NULL,
	CONSTRAINT orders_pk PRIMARY KEY (id)
);

CREATE TABLE "KoinBx_POC".balances (
	id uuid DEFAULT "KoinBx_POC".uuid_generate_v4() NOT NULL,
	user_id text NOT NULL,
	"currency_symbol" "KoinBx_POC"."currency_symbol" NOT NULL,
	balance numeric NOT NULL,
	CONSTRAINT balances_pk PRIMARY KEY (id),
	CONSTRAINT balances_unique UNIQUE (user_id, currency_symbol)
);
