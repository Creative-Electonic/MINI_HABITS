import type { FindHabitById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Habit from 'src/components/Habit/Habit'

export const QUERY = gql`
  query FindHabitById($id: String!) {
    habit: habit(id: $id) {
      id
      name
      minimumCompletionRequirement
      achieveCount
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Habit not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ habit }: CellSuccessProps<FindHabitById>) => {
  return <Habit habit={habit} />
}
