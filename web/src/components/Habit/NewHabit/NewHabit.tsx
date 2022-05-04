import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import HabitForm from 'src/components/Habit/HabitForm'

const CREATE_HABIT_MUTATION = gql`
  mutation CreateHabitMutation($input: CreateHabitInput!) {
    createHabit(input: $input) {
      id
    }
  }
`

const NewHabit = () => {
  const [createHabit, { loading, error }] = useMutation(CREATE_HABIT_MUTATION, {
    onCompleted: () => {
      toast.success('Habit created')
      navigate(routes.habits())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createHabit({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Habit</h2>
      </header>
      <div className="rw-segment-main">
        <HabitForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewHabit
