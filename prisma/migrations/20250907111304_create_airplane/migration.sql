-- CreateTable
CREATE TABLE "public"."airplanes" (
    "id" SERIAL NOT NULL,
    "model_number" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "airplanes_pkey" PRIMARY KEY ("id")
);
