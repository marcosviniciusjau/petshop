-- DropForeignKey
ALTER TABLE "schedulings" DROP CONSTRAINT "schedulings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_time_intervals" DROP CONSTRAINT "user_time_intervals_user_id_fkey";

-- AddForeignKey
ALTER TABLE "user_time_intervals" ADD CONSTRAINT "user_time_intervals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedulings" ADD CONSTRAINT "schedulings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
