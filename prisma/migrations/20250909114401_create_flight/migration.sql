-- CreateTable
CREATE TABLE "public"."flights" (
    "id" SERIAL NOT NULL,
    "flight_number" VARCHAR(20) NOT NULL,
    "airplane_id" INTEGER NOT NULL,
    "departure_airport_id" TEXT NOT NULL,
    "arrival_airport_id" TEXT NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,
    "boarding_gate" TEXT,
    "total_seats" INTEGER NOT NULL,

    CONSTRAINT "flights_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."flights" ADD CONSTRAINT "flights_airplane_id_fkey" FOREIGN KEY ("airplane_id") REFERENCES "public"."airplanes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."flights" ADD CONSTRAINT "flights_departure_airport_id_fkey" FOREIGN KEY ("departure_airport_id") REFERENCES "public"."airports"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."flights" ADD CONSTRAINT "flights_arrival_airport_id_fkey" FOREIGN KEY ("arrival_airport_id") REFERENCES "public"."airports"("code") ON DELETE CASCADE ON UPDATE CASCADE;
