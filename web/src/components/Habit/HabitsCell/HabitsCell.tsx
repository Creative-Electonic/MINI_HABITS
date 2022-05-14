import type { FindTodayHabits } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Habits from 'src/components/Habit/Habits'

export const QUERY = gql`
  query FindTodayHabits {
    todayHabits {
      id
      name
      minimumCompletionRequirement
      achieveCount
      userId
      isCompletedToday
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">empty</div>
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ todayHabits }: CellSuccessProps<FindTodayHabits>) => {
  return <Habits habits={todayHabits} />
}
