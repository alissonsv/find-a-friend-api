/*
  Warnings:

  - You are about to drop the `pet_requirements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `requirements` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `requirements` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pet_requirements" DROP CONSTRAINT "pet_requirements_pet_id_fkey";

-- DropForeignKey
ALTER TABLE "pet_requirements" DROP CONSTRAINT "pet_requirements_requirement_id_fkey";

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "requirements" JSONB NOT NULL;

-- DropTable
DROP TABLE "pet_requirements";

-- DropTable
DROP TABLE "requirements";
