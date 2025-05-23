/*
  Warnings:

  - Added the required column `status` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransferStatus" AS ENUM ('Success', 'pending', 'Failure');

-- AlterTable
ALTER TABLE "Transfer" ADD COLUMN     "status" "TransferStatus" NOT NULL;

-- DropEnum
DROP TYPE "OnRampStatus";
