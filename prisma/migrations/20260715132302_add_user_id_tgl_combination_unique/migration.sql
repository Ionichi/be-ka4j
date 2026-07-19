/*
  Warnings:

  - A unique constraint covering the columns `[userId,tgl]` on the table `absensi_mentor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "absensi_mentor_userId_tgl_key" ON "public"."absensi_mentor"("userId", "tgl");
