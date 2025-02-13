-- CreateTable
CREATE TABLE "periode" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tgl" DATE NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "periode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "periode" ADD CONSTRAINT "periode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
