/*
  Warnings:

  - A unique constraint covering the columns `[childrenId,tgl]` on the table `absensi_children` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "absensi_children_childrenId_tgl_key" ON "public"."absensi_children"("childrenId", "tgl");
