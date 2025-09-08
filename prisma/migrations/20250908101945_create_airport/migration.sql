-- CreateTable
CREATE TABLE "public"."airports" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "address" TEXT,
    "city_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "airports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "airports_name_key" ON "public"."airports"("name");

-- CreateIndex
CREATE UNIQUE INDEX "airports_code_key" ON "public"."airports"("code");

-- AddForeignKey
ALTER TABLE "public"."airports" ADD CONSTRAINT "airports_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
