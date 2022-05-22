import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import HabitForm from 'src/components/Habit/HabitForm'
import userStore from 'src/stores/user.store'

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
      navigate(routes.list())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createHabit({
      variables: {
        input: {
          ...input,
          achieveCount: 0,
          userId: userStore.userInfo.id,
        },
      },
    })
  }

  return (
    <div className="rw-segment">
      <div className="rw-segment-main">
        <h1>Add Mini Habit</h1>
        <HabitForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewHabit
