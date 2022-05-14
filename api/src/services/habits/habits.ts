import dayjs from 'dayjs'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import type {
  QueryResolvers,
  MutationResolvers,
  HabitResolvers,
} from 'types/graphql'

export const todayHabits: QueryResolvers['todayHabits'] = async () => {
  const result = await db.habit.findMany({
    where: {
      // user
    },
    orderBy: {
      updatedAt: 'asc',
    },
  })

  return result.map((habit) => {
    return {
      ...habit,
      isCompletedToday:
        habit.updatedAt.getTime() >= dayjs().startOf('day').toDate().getTime(),
    }
  })
}

export const habits: QueryResolvers['habits'] = () => {
  return db.habit.findMany()
}

export const habit: QueryResolvers['habit'] = ({ id }) => {
  return db.habit.findUnique({
    where: { id },
  })
}

export const createHabit: MutationResolvers['createHabit'] = ({ input }) => {
  return db.habit.create({
    data: input,
  })
}

export const updateHabit: MutationResolvers['updateHabit'] = ({
  id,
  input,
}) => {
  return db.habit.update({
    data: input,
    where: { id },
  })
}

export const deleteHabit: MutationResolvers['deleteHabit'] = ({ id }) => {
  return db.habit.delete({
    where: { id },
  })
}

export const achieveHabit: MutationResolvers['achieveHabit'] = async ({
  id,
}) => {
  const targetHabit = await db.habit.findUnique({
    where: { id },
  })

  return db.habit.update({
    data: {
      achieveCount: targetHabit.achieveCount + 1,
    },
    where: { id },
  })
}

export const Habit: HabitResolvers = {
  user: (_obj, { root }) =>
    db.habit.findUnique({ where: { id: root.id } }).user(),
}
