/*
  Warnings:

  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Professional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Professional" DROP CONSTRAINT "Professional_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_user_id_fkey";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "Professional";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserAddress";

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone_number" TEXT,
    "address" TEXT,
    "birthdate" TIMESTAMP(3),
    "avatar" TEXT,
    "roles" TEXT[],
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_address" (
    "address_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "user_address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "department" (
    "department_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "department_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "professional" (
    "professional_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "cpf" TEXT,
    "role" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "department_id" INTEGER,

    CONSTRAINT "professional_pkey" PRIMARY KEY ("professional_id")
);

-- CreateTable
CREATE TABLE "register_info" (
    "register_info_id" SERIAL NOT NULL,
    "professional_id" INTEGER NOT NULL,
    "register_type" TEXT NOT NULL,
    "register_number" TEXT NOT NULL,
    "valid_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "register_info_pkey" PRIMARY KEY ("register_info_id")
);

-- CreateTable
CREATE TABLE "availability" (
    "availability_id" SERIAL NOT NULL,
    "professional_id" INTEGER,
    "department_id" INTEGER,
    "day_of_week" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "availability_pkey" PRIMARY KEY ("availability_id")
);

-- CreateTable
CREATE TABLE "procedure" (
    "procedure_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "base_price" DOUBLE PRECISION NOT NULL,
    "base_duration" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,

    CONSTRAINT "procedure_pkey" PRIMARY KEY ("procedure_id")
);

-- CreateTable
CREATE TABLE "professional_procedure" (
    "professional_procedure_id" SERIAL NOT NULL,
    "professional_id" INTEGER NOT NULL,
    "procedure_id" INTEGER NOT NULL,
    "custom_price" DOUBLE PRECISION,
    "custom_duration" INTEGER,

    CONSTRAINT "professional_procedure_pkey" PRIMARY KEY ("professional_procedure_id")
);

-- CreateTable
CREATE TABLE "rating" (
    "rating_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "professional_id" INTEGER,
    "department_id" INTEGER,
    "value" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("rating_id")
);

-- CreateTable
CREATE TABLE "schedule" (
    "schedule_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "professional_id" INTEGER,
    "department_id" INTEGER,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("schedule_id")
);

-- CreateTable
CREATE TABLE "session_detail" (
    "session_detail_id" SERIAL NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "content_type" TEXT NOT NULL,
    "content_text" TEXT,
    "content_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_detail_pkey" PRIMARY KEY ("session_detail_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "professional_email_key" ON "professional"("email");

-- CreateIndex
CREATE UNIQUE INDEX "professional_cpf_key" ON "professional"("cpf");

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professional" ADD CONSTRAINT "professional_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "register_info" ADD CONSTRAINT "register_info_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professional"("professional_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availability" ADD CONSTRAINT "availability_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professional"("professional_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availability" ADD CONSTRAINT "availability_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("department_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedure" ADD CONSTRAINT "procedure_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("department_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professional_procedure" ADD CONSTRAINT "professional_procedure_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professional"("professional_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professional_procedure" ADD CONSTRAINT "professional_procedure_procedure_id_fkey" FOREIGN KEY ("procedure_id") REFERENCES "procedure"("procedure_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professional"("professional_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("department_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professional"("professional_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("department_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_detail" ADD CONSTRAINT "session_detail_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("schedule_id") ON DELETE CASCADE ON UPDATE CASCADE;
