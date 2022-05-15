-- CreateTable
CREATE TABLE "HabitAchieveLog" (
    "id" TEXT NOT NULL,
    "habitId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HabitAchieveLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HabitAchieveLog" ADD CONSTRAINT "HabitAchieveLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitAchieveLog" ADD CONSTRAINT "HabitAchieveLog_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
