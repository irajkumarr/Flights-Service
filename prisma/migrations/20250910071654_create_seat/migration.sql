/*
  Warnings:

  - You are about to drop the `Seat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Seat" DROP CONSTRAINT "Seat_airplane_id_fkey";

-- DropTable
DROP TABLE "public"."Seat";

-- CreateTable
CREATE TABLE "public"."seats" (
    "id" SERIAL NOT NULL,
    "airplane_id" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "col" TEXT NOT NULL,
    "type" "public"."SeatType" NOT NULL DEFAULT 'ECONOMY',

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."seats" ADD CONSTRAINT "seats_airplane_id_fkey" FOREIGN KEY ("airplane_id") REFERENCES "public"."airplanes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
