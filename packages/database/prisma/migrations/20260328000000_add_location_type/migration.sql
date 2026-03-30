-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('PHARMACY', 'TESTING_CENTER');

-- AlterTable
ALTER TABLE "Pharmacy" ADD COLUMN "locationType" "LocationType" NOT NULL DEFAULT 'PHARMACY';
