/*
  Warnings:

  - You are about to drop the column `petName` on the `users` table. All the data in the column will be lost.
  - Added the required column `petName` to the `schedulings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedulings" ADD COLUMN     "petName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "petName";
