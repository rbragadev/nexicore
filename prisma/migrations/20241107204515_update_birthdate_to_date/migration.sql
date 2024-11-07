/*
  Warnings:

  - You are about to drop the column `address` on the `user` table. All the data in the column will be lost.
  - Made the column `birthdate` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "address",
ALTER COLUMN "birthdate" SET NOT NULL,
ALTER COLUMN "birthdate" SET DATA TYPE DATE;
