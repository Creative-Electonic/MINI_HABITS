import type { FindHabitById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Habit from 'src/components/Habit/Habit'
import { DotLoading } from 'antd-mobile'

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

export const Loading = () => (
  <div
    style={{
      height: '100vh',
      fontSize: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <DotLoading />
  </div>
)

export const Empty = () => <div>Habit not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ habit }: CellSuccessProps<FindHabitById>) => {
  return <Habit habit={habit} />
}
