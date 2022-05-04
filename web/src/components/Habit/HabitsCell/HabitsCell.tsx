import type { FindHabits } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Habits from 'src/components/Habit/Habits'

export const QUERY = gql`
  query FindHabits {
    habits {
      id
      name
      minimumCompletionRequirement
      achieveCount
      userId
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

export const Success = ({ habits }: CellSuccessProps<FindHabits>) => {
  return <Habits habits={habits} />
}
