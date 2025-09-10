-- CreateEnum
CREATE TYPE "public"."SeatType" AS ENUM ('BUSINESS', 'ECONOMY', 'PREMIUM_ECONOMY', 'FIRST_CLASS');

-- CreateTable
CREATE TABLE "public"."Seat" (
    "id" SERIAL NOT NULL,
    "airplane_id" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "col" TEXT NOT NULL,
    "type" "public"."SeatType" NOT NULL DEFAULT 'ECONOMY',

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Seat" ADD CONSTRAINT "Seat_airplane_id_fkey" FOREIGN KEY ("airplane_id") REFERENCES "public"."airplanes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
