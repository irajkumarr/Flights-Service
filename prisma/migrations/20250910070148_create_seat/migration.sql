-- CreateEnum
CREATE TYPE "public"."SeatType" AS ENUM ('BUSINESS', 'ECONOMY', 'PREMIUM_ECONOMY', 'FIRST_CLASS');

-- CreateTable
CREATE TABLE "public"."Seat" (
    "id" SERIAL NOT NULL,
    "airport_id" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "col" TEXT NOT NULL,
    "type" "public"."SeatType" NOT NULL DEFAULT 'ECONOMY',

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);
