import type { EditHabitById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import HabitForm from 'src/components/Habit/HabitForm'

export const QUERY = gql`
  query EditHabitById($id: String!) {
    habit: habit(id: $id) {
      id
      name
      minimumCompletionRequirement
      achieveCount
      userId
    }
  }
`
const UPDATE_HABIT_MUTATION = gql`
  mutation UpdateHabitMutation($id: String!, $input: UpdateHabitInput!) {
    updateHabit(id: $id, input: $input) {
      id
      name
      minimumCompletionRequirement
      achieveCount
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ habit }: CellSuccessProps<EditHabitById>) => {
  const [updateHabit, { loading, error }] = useMutation(UPDATE_HABIT_MUTATION, {
    onCompleted: () => {
      toast.success('Habit updated')
      navigate(routes.list())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateHabit({ variables: { id, input } })
  }

  return (
    <div className="rw-main">
      {/* <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Habit {habit.id}
        </h2>
      </header> */}
      <h1>Edit Habit</h1>
      <HabitForm
        habit={habit}
        onSave={onSave}
        error={error}
        loading={loading}
      />
    </div>
  )
}
