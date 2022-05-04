import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  HabitResolvers,
} from 'types/graphql'

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

export const Habit: HabitResolvers = {
  user: (_obj, { root }) =>
    db.habit.findUnique({ where: { id: root.id } }).user(),
}
