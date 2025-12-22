-- CreateTable
CREATE TABLE "liked_post" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "liked_post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "liked_post_post_id_user_id_key" ON "liked_post"("post_id", "user_id");

-- AddForeignKey
ALTER TABLE "liked_post" ADD CONSTRAINT "liked_post_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked_post" ADD CONSTRAINT "liked_post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
